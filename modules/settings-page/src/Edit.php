<?php
namespace MBB\SettingsPage;

use MBB\BaseEditPage;
use MBB\Helpers\Data;

class Edit extends BaseEditPage {
	public function enqueue() {
		$url = MBB_URL . 'modules/settings-page/assets';

		wp_enqueue_style( 'mb-settings-page-ui', "$url/settings-page.css", ['wp-components'], MBB_VER );
		wp_enqueue_script( 'mb-settings-page-ui', "$url/settings-page.js", ['wp-element', 'wp-components', 'wp-i18n'], MBB_VER, true );

		$data = [
			'settings' => get_post_meta( get_the_ID(), 'settings', true ),
			'icons'    => Data::get_dashicons(),

			'rest'  => untrailingslashit( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		];

		wp_localize_script( 'mb-settings-page-ui', 'MbbApp', $data );
	}

	public function save( $post_id ) {
		$parser = new Parser( rwmb_request()->post( 'settings' ) );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'page', $parser->get_settings() );
	}
}