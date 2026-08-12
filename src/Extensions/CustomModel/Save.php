<?php
namespace MBB\Extensions\CustomModel;

use WP_REST_Request;
use WP_REST_Server;
use WP_Error;
use MBB\RestApi\Save as SaveRestApi;

class Save {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		register_rest_route( 'mbb', 'custom-model/save', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'save' ],
			'permission_callback' => [ $this, 'has_permission' ],
			'show_in_index'       => false,
			'args'                => [
				'post_id'    => [
					'required'          => true,
					'validate_callback' => function ( $param ): bool {
						return is_numeric( $param );
					},
					'sanitize_callback' => 'absint',
				],
				'post_title' => [
					'validate_callback' => function ( $param ) {
						if ( empty( $param ) ) {
							return new WP_Error( 'rest_invalid_param', __( 'Please enter the custom model title', 'meta-box-builder' ), [ 'status' => 400 ] );
						}
						return true;
					},
					'sanitize_callback' => 'sanitize_text_field',
				],
			],
		] );

		register_rest_route( 'mbb', 'custom-model/columns', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'save_columns' ],
			'permission_callback' => [ $this, 'has_permission' ],
			'show_in_index'       => false,
			'args'                => [
				'post_id' => [
					'required'          => true,
					'validate_callback' => function ( $param ): bool {
						return is_numeric( $param );
					},
					'sanitize_callback' => 'absint',
				],
			],
		] );
	}

	public function has_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	public function save( WP_REST_Request $request ): array {
		$post_id    = (int) $request->get_param( 'post_id' );
		$post_title = (string) $request->get_param( 'post_title' );
		$settings   = $request->get_param( 'settings' );

		if ( ! is_array( $settings ) ) {
			$settings = [];
		}

		$post_name         = sanitize_title( empty( $settings['slug'] ) ? $post_title : $settings['slug'] );
		$settings['table'] = $this->sanitize_table_name( $settings['table'] ?? '' );

		$post = get_post( $post_id );
		if ( ! $post ) {
			return [
				'success' => false,
				'message' => __( 'The custom model might have been deleted. Please refresh the page and try again.', 'meta-box-builder' ),
			];
		}

		if ( empty( $settings['table'] ) ) {
			return [
				'success' => false,
				'message' => __( 'Please enter the custom table name.', 'meta-box-builder' ),
			];
		}

		// Create (publish) the post if it's auto-draft.
		$post_status = $post->post_status;
		if ( ! in_array( $post_status, [ 'publish', 'draft' ], true ) ) {
			$post_status = 'publish';
		}

		$update_args = [
			'ID'          => $post_id,
			'post_title'  => $post_title,
			'post_name'   => $post_name,
			'post_status' => $post_status,
			'post_date'   => $post->post_date,
		];
		$update_args = SaveRestApi::fix_post_date( $update_args );

		$needs_update = $post->post_title !== $post_title
			|| $post->post_name !== $post_name
			|| $post->post_status !== $post_status
			|| $update_args['post_date'] !== $post->post_date;

		if ( $needs_update ) {
			$result = wp_update_post( $update_args );

			if ( is_wp_error( $result ) ) {
				return [
					'success' => false,
					'message' => $result->get_error_message(),
				];
			}
		}

		$settings['slug'] = $post_name;
		if ( empty( $settings['labels']['name'] ) ) {
			$settings['labels']['name'] = $post_title;
		}
		if ( empty( $settings['labels']['singular_name'] ) ) {
			$settings['labels']['singular_name'] = $post_title;
		}
		if ( empty( $settings['labels']['menu_name'] ) ) {
			$settings['labels']['menu_name'] = $settings['labels']['name'];
		}

		return $this->persist_model( $post_id, $post_name, $settings );
	}

	/**
	 * Update only the columns schema for an existing model (used by field group modal).
	 */
	public function save_columns( WP_REST_Request $request ): array {
		$post_id  = (int) $request->get_param( 'post_id' );
		$columns  = $request->get_param( 'columns' );
		$post     = get_post( $post_id );

		if ( ! $post || 'mb-model' !== $post->post_type ) {
			return [
				'success' => false,
				'message' => __( 'The custom model might have been deleted. Please refresh the page and try again.', 'meta-box-builder' ),
			];
		}

		$settings = get_post_meta( $post_id, 'settings', true );
		if ( ! is_array( $settings ) ) {
			$settings = [];
		}

		$settings['columns'] = is_array( $columns ) ? $columns : [];
		$post_name           = $post->post_name ?: sanitize_title( $post->post_title );

		$result = $this->persist_model( $post_id, $post_name, $settings );
		if ( ! $result['success'] ) {
			return $result;
		}

		$model = get_post_meta( $post_id, 'model', true );
		return [
			'success' => true,
			'message' => __( 'Model table schema updated.', 'meta-box-builder' ),
			'model'   => [
				'name'    => $post_name,
				'label'   => $model['labels']['singular_name'] ?? $model['labels']['name'] ?? $post_name,
				'table'   => $model['table'] ?? '',
				'columns' => $model['columns'] ?? [],
				'keys'    => $model['keys'] ?? [],
				'post_id' => $post_id,
			],
		];
	}

	private function persist_model( int $post_id, string $post_name, array $settings ): array {
		// Store raw UI settings.
		$ui_parser = new Parser( $settings );
		$ui_parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $ui_parser->get_settings() );

		// Store parsed model args for registration.
		$parser = new Parser( $settings );
		$parser->parse();
		$model         = $parser->get_settings();
		$model['name'] = $post_name;
		update_post_meta( $post_id, 'model', $model );

		Register::clear_cache();

		$model['post_id'] = $post_id;
		Register::register_and_create( $post_name, $model );
		Register::rebuild_cache();

		return [
			'success' => true,
			'message' => __( 'Custom model is updated.', 'meta-box-builder' ),
		];
	}

	private function sanitize_table_name( $table ): string {
		return str_replace( '-', '_', sanitize_key( (string) $table ) );
	}
}
