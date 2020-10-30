<?php
namespace MBB\Api;

use WP_REST_Request;

class IncludeExclude extends Base {
	public function include_exclude( WP_REST_Request $request ) {
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
		$data = wp_cache_get( $cache_key, 'mbb-include-exclude' );
		if ( false === $data ) {
			$data = $this->$method( $s, $name );
			wp_cache_set( $cache_key, $data, 'mbb-include-exclude' );
		}

		return $data;
	}

	private function get_method( $name ) {
		$methods = [
			'ID'               => 'get_posts',
			'parent'           => 'get_posts',
			'template'         => 'get_templates',
			'user_role'        => 'get_user_roles',
			'user_id'          => 'get_users',
			'edited_user_role' => 'get_user_roles',
			'edited_user_id'   => 'get_users',
		];
		$method = isset( $methods[ $name ] ) ? $methods[ $name ] : 'get_terms';
		return $method;
	}
}