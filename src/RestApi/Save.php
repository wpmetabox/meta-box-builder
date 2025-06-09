<?php
namespace MBB\RestApi;

use WP_REST_Server;
use WP_REST_Request;
use MBBParser\Parsers\Base as BaseParser;
use MBBParser\Parsers\MetaBox as MetaBoxParser;

class Save extends Base {
	public function register_routes(): void {
		register_rest_route( 'mbb', 'save', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'save_data' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function save_data( WP_REST_Request $request ): array {
		$post_id     = (int) $request->get_param( 'post_id' );
		$post_title  = sanitize_text_field( $request->get_param( 'post_title' ) );
		$post_name   = sanitize_text_field( $request->get_param( 'post_name' ) );
		$post_status = sanitize_text_field( $request->get_param( 'post_status' ) );
		$fields      = $request->get_param( 'fields' );
		$settings    = $request->get_param( 'settings' );

		if ( ! $post_id || ! $post_title || ! $post_name || ! $post_status ) {
			return [
				'success' => false,
				'message' => __( 'Invalid data', 'meta-box-builder' ),
			];
		}

		wp_update_post( [
			'ID'          => $post_id,
			'post_title'  => $post_title,
			'post_name'   => $post_name,
			'post_status' => $post_status,
		] );

		// Save fields, settings and data
		$base_parser = new BaseParser();

		$settings = apply_filters( 'mbb_save_settings', $settings, $request );
		$base_parser->set_settings( $settings )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $base_parser->get_settings() );

		$fields = apply_filters( 'mbb_save_fields', $fields, $request );
		$base_parser->set_settings( $fields )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'fields', $base_parser->get_settings() );

		// Save parsed data for PHP (serialized array)
		$submitted_data = compact( 'fields', 'settings' );
		$submitted_data = apply_filters( 'mbb_save_submitted_data', $submitted_data, $request );

		// Set post title and slug in case they're auto-generated
		$submitted_data['post_title'] = $post_title;
		$submitted_data['post_name']  = $post_name;

		$parser = new MetaBoxParser( $submitted_data );
		$parser->parse();

		update_post_meta( $post_id, 'meta_box', $parser->get_settings() );

		// Allow developers to add actions after saving the meta box
		do_action( 'mbb_after_save', $parser, $post_id, $submitted_data );

		return [
			'success' => true,
			'message' => __( 'Data saved successfully', 'meta-box-builder' )
		];
	}
}