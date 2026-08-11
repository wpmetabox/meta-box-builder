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

		$post_name = sanitize_title( empty( $settings['slug'] ) ? $post_title : $settings['slug'] );

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

		$result = wp_update_post( $update_args );

		if ( is_wp_error( $result ) ) {
			return [
				'success' => false,
				'message' => $result->get_error_message(),
			];
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

		return [
			'success' => true,
			'message' => __( 'Custom model is updated.', 'meta-box-builder' ),
		];
	}
}
