<?php
namespace MBB\Extensions\SettingsPage;

use WP_REST_Request;
use WP_REST_Server;

class Save {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		register_rest_route( 'mbb', 'settings-page/save', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'save' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}
	public function has_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	public function save( WP_REST_Request $request ): array {
		$post_id     = (int) $request->get_param( 'post_id' );
		$post_title  = sanitize_text_field( $request->get_param( 'post_title' ) );
		$post_status = sanitize_text_field( $request->get_param( 'post_status' ) );
		$settings    = $request->get_param( 'settings' );

		if ( ! $post_id || ! $post_title || ! $post_status ) {
			return [
				'success' => false,
				'message' => __( 'Invalid data', 'meta-box-builder' ),
			];
		}

		$post_name = $settings['id'] ?? sanitize_title( $post_title );

		wp_update_post( [
			'ID'          => $post_id,
			'post_title'  => $post_title,
			'post_name'   => $post_name,
			'post_status' => $post_status,
		] );

		// Set post title and slug in case they're auto-generated.
		$settings = array_merge( [
			'menu_title' => $post_title,
			'id'         => $post_name,
		], $settings );

		$parser = new Parser( $settings );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'settings_page', $parser->get_settings() );

		return [
			'success' => true,
			'message' => __( 'Data saved successfully', 'meta-box-builder' )
		];
	}
}
