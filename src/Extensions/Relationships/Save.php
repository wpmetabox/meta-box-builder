<?php
namespace MBB\Extensions\Relationships;

use WP_REST_Request;
use WP_REST_Server;
use WP_Error;

class Save {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		register_rest_route( 'mbb', 'relationships/save', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'save' ],
			'permission_callback' => [ $this, 'has_permission' ],
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
							return new WP_Error( 'rest_invalid_param', __( 'Please enter the relationship title', 'meta-box-builder' ), [ 'status' => 400 ] );
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
		$post_id    = $request->get_param( 'post_id' );
		$post_title = $request->get_param( 'post_title' );
		$settings   = $request->get_param( 'settings' );

		$post_name = sanitize_title( empty( $settings['id'] ) ? $post_title : $settings['id'] );

		wp_update_post( [
			'ID'         => $post_id,
			'post_title' => $post_title,
			'post_name'  => $post_name,
		] );

		$settings['id'] = $post_name;

		$parser = new Parsers\Relationship( $settings );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'relationship', $parser->get_settings() );

		return [
			'success' => true,
			'message' => __( 'Data saved successfully', 'meta-box-builder' ),
		];
	}
}
