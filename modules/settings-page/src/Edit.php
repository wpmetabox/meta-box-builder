<?php
namespace MBB\SettingsPage;

use MBB\BaseEditPage;
use MBB\Helpers\Data;

class Edit extends BaseEditPage {
	public function enqueue() {
		$url = MBB_URL . 'modules/settings-page/assets';

		wp_enqueue_style( 'mb-settings-page-ui', "$url/settings-page.css", ['wp-components'], MBB_VER );
		wp_enqueue_script( 'mb-settings-page-ui', "$url/settings-page.js", ['wp-element', 'wp-components', 'wp-i18n'], MBB_VER, true );

		$data                   = [
			'settings'       => get_post_meta( get_the_ID(), 'settings', true ),
			'icons'          => Data::get_dashicons(),
			'capabilities'   => $this->get_capabilities(),
			'menu_positions' => $this->get_menu_positions(),
			'parents'        => $this->get_parents(),
		];

		wp_localize_script( 'mb-settings-page-ui', 'MBSPUI', $data );
	}

	private function get_capabilities() {
		$caps = [];
		$roles = wp_roles();
		foreach ( $roles->roles as $role ) {
			$caps = array_merge( $caps, $role[ 'capabilities' ] );
		}

		$caps = array_unique( $caps );
		sort( $caps );

		return array_combine( $caps, $caps );
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

	private function get_parents() {
		global $menu;
		$options = [
			'none'  => __( 'None', 'meta-box-builder' ),
		];
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

	public function save( $post_id ) {
		$parser = new Parser( rwmb_request()->post( 'settings' ) );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'page', $parser->get_settings() );
	}
}