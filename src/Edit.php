<?php
namespace MBB;

class Edit {
	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'edit_form_after_title', [ $this, 'render' ] );
		add_action( 'save_post_meta-box', [ $this, 'save' ] );
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

		$saved_data = get_post_meta( get_the_ID(), 'data', true );
		$saved_data = $saved_data ? json_decode( $saved_data, true ) : [];

		$data = [
			'rest'          => untrailingslashit( rest_url() ),
			'nonce'         => wp_create_nonce( 'wp_rest' ),
			'settings'      => $saved_data,
			'postTypes'     => mbb_get_post_types(),
			'taxonomies'    => mbb_get_taxonomies(),
			'settingsPages' => mbb_get_setting_pages(),
			'templates'     => mbb_get_templates(),
			'icons'         => mbb_get_dashicons(),

			// Extensions check.
			'extensions' => [
				'blocks'             => mbb_is_extension_active( 'mb-blocks' ),
				'columns'            => mbb_is_extension_active( 'meta-box-columns' ),
				'commentMeta'        => mbb_is_extension_active( 'mb-comment-meta' ),
				'conditionalLogic'   => mbb_is_extension_active( 'meta-box-conditional-logic' ),
				'customTable'        => mbb_is_extension_active( 'mb-custom-table' ),
				'frontendSubmission' => mbb_is_extension_active( 'mb-frontend-submission' ),
				'group'              => mbb_is_extension_active( 'meta-box-group' ),
				'includeExclude'     => mbb_is_extension_active( 'meta-box-include-exclude' ),
				'settingsPage'       => mbb_is_extension_active( 'mb-settings-page' ),
				'showHide'           => mbb_is_extension_active( 'meta-box-show-hide' ),
				'tabs'               => mbb_is_extension_active( 'meta-box-tabs' ),
				'termMeta'           => mbb_is_extension_active( 'mb-term-meta' ),
				'userMeta'           => mbb_is_extension_active( 'mb-user-meta' ),
			]
		];

		wp_localize_script( 'mbb-app', 'MbbApp', $data );
	}

	public function save( $post_id ) {
		$parent = wp_is_post_revision( $post_id );
		if ( $parent ) {
			$post_id = $parent;
		}

		// Save JSON data for JavaScript.
		$request = rwmb_request();
		$data = $request->post( 'data' );
		$raw = $request->post( 'raw' );
		update_post_meta( $post_id, 'data', $data );
		update_post_meta( $post_id, 'raw', $raw );
	}

	private function is_screen() {
		return 'meta-box' === get_current_screen()->id;
	}
}
