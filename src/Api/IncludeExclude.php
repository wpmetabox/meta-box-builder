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

	private function get_posts( $s ) {
		global $wpdb;

		$where = '';
		if ( $s ) {
			$where = ' AND LOWER( post_title ) LIKE %s';
		}
		$sql = $wpdb->prepare( "
			SELECT ID AS value, post_title AS label
			FROM $wpdb->posts
			WHERE
				post_status NOT IN ('trash', 'auto-draft', 'inherit')
				AND post_type NOT IN ('customize_changeset', 'custom_css', 'mb-post-type', 'mb-taxonomy', 'mb-views', 'meta-box', 'nav_menu_item', 'revision')
				AND post_title != ''
				$where
			ORDER BY post_title ASC
			LIMIT 10
		", '%' . $wpdb->esc_like( $s ) . '%' );
		$data = $wpdb->get_results( $sql );

		return $data;
	}

	private function get_terms( $s, $taxonomy ) {
		$items = get_terms( [
			'taxonomy'               => $taxonomy,
			'name__like'             => $s,
			'orderby'                => 'name',
			'number'                 => 10,
			'fields'                 => 'id=>name',
			'hide_empty'             => false,
			'count'                  => false,
			'update_term_meta_cache' => false,
		] );
		$data = [];
		foreach ( $items as $id => $name ) {
			$data[] = [
				'value' => $id,
				'label' => $name,
			];
		}
		return $data;
	}

	private function get_users( $s ) {
		$items = get_users( [
			'search'  => "*{$s}*",
			'number'  => 10,
			'orderby' => 'display_name',
			'order'   => 'ASC',
			'fields'  => ['ID', 'display_name'],
		] );
		return array_map( function( $item ) {
			return [
				'value' => $item->ID,
				'label' => $item->display_name,
			];
		}, $items );
	}

	private function get_templates( $s ) {
		$templates = mbb_get_templates();

		// Group templates by file, which eliminates duplicates templates for multiple post types.
		$items = [];
		foreach ( $templates as $template ) {
			if ( empty( $s ) || false !== strpos( strtolower( $template['name'] ), $s ) ) {
				$items[ $template['file'] ] = $template['name'];
			}
		}

		$data = [];
		foreach ( $items as $id => $name ) {
			$data[] = [
				'value' => $id,
				'label' => $name,
			];
		}
		return $data;
	}

	private function get_user_roles( $s ) {
		global $wp_roles;

		$roles = $wp_roles->roles;
		$data  = [];
		foreach ( $roles as $key => $role ) {
			if ( empty( $s ) || false !== strpos( $role['name'], $s ) ) {
				$data[] = [
					'value' => $key,
					'label' => $role['name'],
				];
			}
		}
		return $data;
	}
}