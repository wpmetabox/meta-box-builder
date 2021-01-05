<?php
namespace MBB;

use MBBParser\Parsers\MetaBox as Parser;

class Edit {
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'edit_form_after_title', [ $this, 'render' ] );
		add_action( 'save_post_meta-box', [ $this, 'save' ] );

		add_action( 'add_meta_boxes_meta-box', [ $this, 'remove_slug_meta_box'] );
		add_filter( 'rwmb_meta_boxes', [ $this, 'add_meta_boxes' ] );
		add_filter( 'rwmb_post_name_field_meta', [ $this, 'get_post_name' ] );
		add_filter( 'rwmb_post_name_value', '__return_empty_string' );
	}

	public function render() {
		if ( $this->is_screen() ) {
			echo '<div id="root" class="og"></div>';
		}
	}

	public function enqueue() {
		if ( ! $this->is_screen() ) {
			return;
		}
		wp_enqueue_style( 'mbb-app', MBB_URL . 'assets/css/style.css', ['wp-components'] );

		wp_enqueue_code_editor( ['type' => 'application/x-httpd-php'] );
		wp_enqueue_script( 'mbb-app', MBB_URL . 'assets/js/app.js', ['wp-element', 'wp-components', 'clipboard', 'wp-color-picker'], MBB_VER, true );

		$data = [
			'rest'          => untrailingslashit( rest_url() ),
			'nonce'         => wp_create_nonce( 'wp_rest' ),
			'settings'      => get_post_meta( get_the_ID(), 'settings', true ),
			'fields'        => get_post_meta( get_the_ID(), 'fields', true ),
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

		wp_localize_script( 'mbb-app', 'MbbApp', $data );
	}

	public function save( $post_id ) {
		$parent = wp_is_post_revision( $post_id );
		if ( $parent ) {
			$post_id = $parent;
		}

		// Save data for JavaScript (serialized arrays).
		$request = rwmb_request();
		update_post_meta( $post_id, 'settings', $request->post( 'settings' ) );
		update_post_meta( $post_id, 'fields', $request->post( 'fields' ) );

		// Save parsed data for PHP (serialized array).
		$parser = new Parser( $_POST );
		$parser->parse();
		$meta_box = $parser->get_settings();
		update_post_meta( $post_id, 'meta_box', $meta_box );
	}

	private function is_screen() {
		return 'meta-box' === get_current_screen()->id;
	}

	public function remove_slug_meta_box() {
		remove_meta_box( 'slugdiv', null, 'normal' );
	}

	public function add_meta_boxes( $meta_boxes ) {
		$meta_boxes[] = [
			'title'      => esc_html__( 'Field Group ID', 'meta-box-builder' ),
			'id'         => 'field-group-id',
			'post_types' => ['meta-box'],
			'context'    => 'side',
			'priority'   => 'low',
			'fields'     => [
				[
					'type' => 'text',
					'id'   => 'post_name',
				],
			],
		];
		return $meta_boxes;
	}

	public function get_post_name() {
		return get_post_field( 'post_name' );
	}
}
