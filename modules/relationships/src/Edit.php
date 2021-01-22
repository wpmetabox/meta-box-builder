<?php
namespace MBB\Relationships;

use MBB\BaseEditPage;

class Edit extends BaseEditPage {
	public function enqueue() {
		$url = MBB_URL . 'modules/relationships/assets';

		wp_enqueue_style( 'mb-relationships-ui', "$url/relationships.css", ['wp-components'], MBB_VER );
		wp_enqueue_script( 'mb-relationships-ui', "$url/relationships.js", ['wp-element', 'wp-components', 'wp-i18n'], MBB_VER, true );

		$data = [
			'settings' => get_post_meta( get_the_ID(), 'settings', true ),
			'rest'     => untrailingslashit( rest_url() ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		];

		wp_localize_script( 'mb-relationships-ui', 'MbbApp', $data );
	}

	public function save( $post_id ) {
		$parser = new Parsers\Relationship( rwmb_request()->post( 'settings' ) );
		$parser->parse_boolean_values()->parse_numeric_values();
		update_post_meta( $post_id, 'settings', $parser->get_settings() );

		$parser->parse();
		update_post_meta( $post_id, 'relationship', $parser->get_settings() );
	}
}