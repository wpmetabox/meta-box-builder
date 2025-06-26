<?php
namespace MBB\Extensions\SettingsPage;

use MBB\BaseEditPage;
use MetaBox\Support\Data;

class Edit extends BaseEditPage {
	/**
	 * Override the parent method to remove the meta box for ID (post_name) and option_name.
	 *
	 * @param array $meta_boxes
	 *
	 * @return array
	 */
	public function add_meta_boxes( $meta_boxes ) {
		return $meta_boxes;
	}

	public function enqueue() {
		wp_enqueue_style(
			'mb-settings-page-app',
			MBB_URL . 'src/Extensions/SettingsPage/css/settings-page.css',
			[ 'wp-components', 'code-editor' ],
			filemtime( MBB_DIR . 'src/Extensions/SettingsPage/css/settings-page.css' )
		);
		wp_enqueue_style( 'font-awesome', MBB_URL . 'assets/fontawesome/css/all.min.css', [], '6.6.0' );

		wp_enqueue_code_editor( [ 'type' => 'application/x-httpd-php' ] );

		$asset = require __DIR__ . "/build/settings-page.asset.php";

		// Add extra JS libs for copy code to clipboard & block color picker.
		$asset['dependencies'] = array_merge( $asset['dependencies'], [ 'jquery', 'clipboard', 'code-editor' ] );
		wp_enqueue_script(
			'mb-settings-page-app',
			MBB_URL . 'src/Extensions/SettingsPage/build/settings-page.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		$data = [
			'settings'       => get_post_meta( get_the_ID(), 'settings', true ),
			'icons'          => Data::get_dashicons(),

			'rest'           => untrailingslashit( rest_url() ),
			'nonce'          => wp_create_nonce( 'wp_rest' ),

			'menu_positions' => $this->get_menu_positions(),
			'menu_parents'   => $this->get_menu_parents(),
			'capabilities'   => $this->get_capabilities(),
		];

		wp_localize_script( 'mb-settings-page-app', 'MbbApp', $data );
	}

	public function save( $post_id, $post ) {
		// Set post title and slug in case they're auto-generated.
		$settings = array_merge( [
			'menu_title' => $post->post_title,
			'id'         => $post->post_name,
		], rwmb_request()->post( 'settings' ) );

		$parser = new Parser( $settings );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'settings_page', $parser->get_settings() );
	}

	private function get_menu_positions() {
		global $menu;
		$positions = [];
		foreach ( $menu as $position => $params ) {
			if ( ! empty( $params[0] ) ) {
				$positions[ $position ] = $this->strip_span( $params[0] );
			}
		}
		return $positions;
	}

	private function get_menu_parents() {
		global $menu;
		$options = [];
		foreach ( $menu as $params ) {
			if ( ! empty( $params[0] ) && ! empty( $params[2] ) ) {
				$options[ $params[2] ] = $this->strip_span( $params[0] );
			}
		}
		return $options;
	}

	private function strip_span( $html ) {
		return preg_replace( '@<span .*>.*</span>@si', '', $html );
	}

	private function get_capabilities() {
		$caps  = [];
		$roles = wp_roles();
		foreach ( $roles->roles as $role ) {
			$caps = array_merge( $caps, array_keys( $role['capabilities'] ) );
		}

		$caps = array_unique( $caps );
		sort( $caps );

		return array_combine( $caps, $caps );
	}
}
