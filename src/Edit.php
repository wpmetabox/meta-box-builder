<?php
namespace MBB;

use MBBParser\Parsers\Base as BaseParser;
use MBBParser\Parsers\MetaBox as Parser;

class Edit extends BaseEditPage {
	public function enqueue() {
		wp_enqueue_style( 'mbb-app', MBB_URL . 'assets/css/style.css', ['wp-components'] );

		wp_enqueue_code_editor( ['type' => 'application/x-httpd-php'] );
		wp_enqueue_script( 'mbb-app', MBB_URL . 'assets/js/app.js', ['wp-element', 'wp-components', 'clipboard', 'wp-color-picker'], MBB_VER, true );

		$data = [
			'fields'        => get_post_meta( get_the_ID(), 'fields', true ),
			'settings'      => get_post_meta( get_the_ID(), 'settings', true ),
			'data'          => get_post_meta( get_the_ID(), 'data', true ),

			'rest'          => untrailingslashit( rest_url() ),
			'nonce'         => wp_create_nonce( 'wp_rest' ),

			'postTypes'     => Helpers\Data::get_post_types(),
			'taxonomies'    => Helpers\Data::get_taxonomies(),
			'settingsPages' => Helpers\Data::get_setting_pages(),
			'templates'     => Helpers\Data::get_templates(),
			'icons'         => Helpers\Data::get_dashicons(),

			// Extensions check.
			'extensions' => [
				'blocks'             => Helpers\Data::is_extension_active( 'mb-blocks' ),
				'columns'            => Helpers\Data::is_extension_active( 'meta-box-columns' ),
				'commentMeta'        => Helpers\Data::is_extension_active( 'mb-comment-meta' ),
				'conditionalLogic'   => Helpers\Data::is_extension_active( 'meta-box-conditional-logic' ),
				'customTable'        => Helpers\Data::is_extension_active( 'mb-custom-table' ),
				'frontendSubmission' => Helpers\Data::is_extension_active( 'mb-frontend-submission' ),
				'group'              => Helpers\Data::is_extension_active( 'meta-box-group' ),
				'includeExclude'     => Helpers\Data::is_extension_active( 'meta-box-include-exclude' ),
				'settingsPage'       => Helpers\Data::is_extension_active( 'mb-settings-page' ),
				'showHide'           => Helpers\Data::is_extension_active( 'meta-box-show-hide' ),
				'tabs'               => Helpers\Data::is_extension_active( 'meta-box-tabs' ),
				'termMeta'           => Helpers\Data::is_extension_active( 'mb-term-meta' ),
				'userMeta'           => Helpers\Data::is_extension_active( 'mb-user-meta' ),
			]
		];

		$data = apply_filters( 'mbb_app_data', $data );

		wp_localize_script( 'mbb-app', 'MbbApp', $data );
	}

	public function save( $post_id ) {
		// Save data for JavaScript (serialized arrays).
		$request = rwmb_request();
		$base_parser = new BaseParser;

		$base_parser->set_settings( $request->post( 'settings' ) )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $base_parser->get_settings() );

		$base_parser->set_settings( $request->post( 'fields' ) )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'fields', $base_parser->get_settings() );

		$base_parser->set_settings( $request->post( 'data' ) )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'data', $base_parser->get_settings() );

		// Save parsed data for PHP (serialized array).
		$parser = new Parser( $_POST );
		$parser->parse();
		update_post_meta( $post_id, 'meta_box', $parser->get_settings() );
	}
}
