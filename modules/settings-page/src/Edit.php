<?php
namespace MBB\SettingsPage;

use MBB\BaseEditPage;
use MetaBox\Support\Data;

class Edit extends BaseEditPage {
	public function enqueue() {
		$url = MBB_URL . 'modules/settings-page/assets';

		wp_enqueue_style( 'mb-settings-page-ui', "$url/settings-page.css", ['wp-components'], MBB_VER );

		wp_enqueue_code_editor( ['type' => 'application/x-httpd-php'] );
		wp_enqueue_script( 'mb-settings-page-ui', "$url/settings-page.js", ['jquery', 'wp-element', 'wp-components', 'wp-i18n', 'clipboard'], MBB_VER, true );

		$data = [
			'settings' => get_post_meta( get_the_ID(), 'settings', true ),
			'icons'    => Data::get_dashicons(),

			'rest'  => untrailingslashit( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),

			'menu_positions' => $this->get_menu_positions(),
			'menu_parents'   => $this->get_menu_parents(),
		];

		wp_localize_script( 'mb-settings-page-ui', 'MbbApp', $data );
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
}