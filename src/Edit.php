<?php
namespace MBB;

use MBBParser\Parsers\Base as BaseParser;
use MBBParser\Parsers\MetaBox as Parser;
use MetaBox\Support\Data as DataHelper;
use MBB\Helpers\Data;

class Edit extends BaseEditPage {
	public function enqueue() {
		$this->enqueue_meta_box_assets();

		wp_enqueue_code_editor( [ 'type' => 'application/x-httpd-php' ] );
		wp_enqueue_style( 'wp-edit-post' );

		wp_enqueue_style( 'rwmb-modal', RWMB_CSS_URL . 'modal.css', [], RWMB_VER );
		wp_style_add_data( 'rwmb-modal', 'path', RWMB_CSS_DIR . 'modal.css' );
		wp_enqueue_script( 'rwmb-modal', RWMB_JS_URL . 'modal.js', [ 'jquery' ], RWMB_VER, true );

		wp_enqueue_style( 'mbb-app', MBB_URL . 'assets/css/style.css', [ 'wp-components', 'code-editor' ], filemtime( MBB_DIR . 'assets/css/style.css' ) );

		$asset = require MBB_DIR . "/assets/js/build/app.asset.php";

		// Add extra JS libs for copy code to clipboard & block color picker.
		$asset['dependencies'] = array_merge( $asset['dependencies'], [ 'jquery', 'clipboard', 'wp-color-picker', 'code-editor' ] );

		wp_enqueue_script( 'mbb-app', MBB_URL . 'assets/js/build/app.js', $asset['dependencies'], $asset['version'], true );

		$fields = get_post_meta( get_the_ID(), 'fields', true ) ?: [];
		$fields = array_values( $fields );

		// All other fields are false by default, but save_field need to be true by default.
		$fields = array_map( function ( $field ) {
			$field['save_field'] = $field['save_field'] ?? true;
			return $field;
		}, $fields );

		$post = get_post();

		$data = [
			'url'           => admin_url( 'edit.php?post_type=' . get_current_screen()->id ),
			'status'        => $post->post_status,
			'title'         => $post->post_title,
			'slug'          => $post->post_name,
			'author'        => get_the_author_meta( 'display_name', (int) $post->post_author ),
			'trash'         => get_delete_post_link(),
			'published'     => get_the_date( 'F d, Y' ) . ' ' . get_the_time( 'g:i a' ),
			'modified'      => get_post_modified_time( 'F d, Y g:i a', true, null, true ),
			'saving'        => __( 'Saving...', 'meta-box-builder' ),

			'fields'        => $fields,
			'settings'      => get_post_meta( get_the_ID(), 'settings', true ),
			'data'          => get_post_meta( get_the_ID(), 'data', true ),

			'rest'          => untrailingslashit( rest_url() ),
			'nonce'         => wp_create_nonce( 'wp_rest' ),
			'nonce_save'    => wp_create_nonce( 'mbb-save' ),

			'postTypes'     => Data::get_post_types(),
			'taxonomies'    => Data::get_taxonomies(),
			'settingsPages' => Data::get_setting_pages(),
			'templates'     => Data::get_templates(),
			'icons'         => DataHelper::get_dashicons(),

			// Extensions check.
			'extensions'    => [
				'blocks'             => Data::is_extension_active( 'mb-blocks' ),
				'columns'            => Data::is_extension_active( 'meta-box-columns' ),
				'commentMeta'        => Data::is_extension_active( 'mb-comment-meta' ),
				'conditionalLogic'   => Data::is_extension_active( 'meta-box-conditional-logic' ),
				'customTable'        => Data::is_extension_active( 'mb-custom-table' ),
				'frontendSubmission' => Data::is_extension_active( 'mb-frontend-submission' ),
				'group'              => Data::is_extension_active( 'meta-box-group' ),
				'includeExclude'     => Data::is_extension_active( 'meta-box-include-exclude' ),
				'settingsPage'       => Data::is_extension_active( 'mb-settings-page' ),
				'showHide'           => Data::is_extension_active( 'meta-box-show-hide' ),
				'tabs'               => Data::is_extension_active( 'meta-box-tabs' ),
				'termMeta'           => Data::is_extension_active( 'mb-term-meta' ),
				'userMeta'           => Data::is_extension_active( 'mb-user-meta' ),
				'revision'           => Data::is_extension_active( 'mb-revision' ),
				'views'              => Data::is_extension_active( 'mb-views' ),
			],
		];

		$data = apply_filters( 'mbb_app_data', $data );

		wp_localize_script( 'mbb-app', 'MbbApp', $data );
	}

	private function enqueue_meta_box_assets(): void {
		wp_enqueue_style( 'rwmb', RWMB_CSS_URL . 'style.css', [], RWMB_VER );
		wp_style_add_data( 'rwmb', 'path', RWMB_CSS_DIR . 'style.css' );
		if ( is_rtl() ) {
			wp_enqueue_style( 'rwmb-rtl', RWMB_CSS_URL . 'style-rtl.css', [], RWMB_VER );
			wp_style_add_data( 'rwmb-rtl', 'path', RWMB_CSS_DIR . 'style-rtl.css' );
		}

		wp_enqueue_style( 'rwmb-input', RWMB_CSS_URL . 'input.css', [], RWMB_VER );
		wp_style_add_data( 'rwmb-input', 'path', RWMB_CSS_DIR . 'input.css' );
	}

	public function save( $post_id, $post ) {
		// Save data for JavaScript (serialized arrays).
		$request     = rwmb_request();
		$base_parser = new BaseParser();
		$settings    = apply_filters( 'mbb_save_settings', $request->post( 'settings' ), $request );
		$fields      = apply_filters( 'mbb_save_fields', $request->post( 'fields' ), $request );
		$data        = apply_filters( 'mbb_save_data', $request->post( 'data' ), $request );

		$base_parser->set_settings( $settings )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $base_parser->get_settings() );

		$base_parser->set_settings( $fields )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'fields', $base_parser->get_settings() );

		$base_parser->set_settings( $data )->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'data', $base_parser->get_settings() );

		// Save parsed data for PHP (serialized array).
		$submitted_data = compact( 'fields', 'settings' );
		$submitted_data = apply_filters( 'mbb_save_submitted_data', $submitted_data, $request );

		// Set post title and slug in case they're auto-generated.
		$submitted_data['post_title'] = $post->post_title;
		$submitted_data['post_name']  = $post->post_name;

		$parser = new Parser( $submitted_data );
		$parser->parse();

		update_post_meta( $post_id, 'meta_box', $parser->get_settings() );

		// Allow developers to add actions after saving the meta box.
		do_action( 'mbb_after_save', $parser, $post_id, $submitted_data );
	}
}
