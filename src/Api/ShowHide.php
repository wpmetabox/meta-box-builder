<?php
namespace MBB\Api;

use WP_REST_Request;

class ShowHide extends Base {
	public function show_hide( WP_REST_Request $request ) {
		$name = $request->get_param( 'name' );
		$s    = strtolower( $request->get_param( 's' ) );

		return $this->cache( $name, $s );
	}

	private function cache( $name, $s ) {
		$method = $this->get_method( $name );

		$cache_key = sprintf(
			'%s:%s:%s',
			str_replace( 'get_', '', $method ),
			$s,
			wp_cache_get_last_changed( 'posts' )
		);
		$data = wp_cache_get( $cache_key, 'mbb-show-hide' );
		if ( false === $data ) {
			$data = $this->$method( $s, $name );
			wp_cache_set( $cache_key, $data, 'mbb-show-hide' );
		}

		return $data;
	}

	private function get_method( $name ) {
		$methods = [
			'template' => 'get_templates',
			'format'   => 'get_formats',
		];
		$method = isset( $methods[ $name ] ) ? $methods[ $name ] : 'get_terms';
		return $method;
	}
}