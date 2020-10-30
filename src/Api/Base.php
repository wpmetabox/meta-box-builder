<?php
namespace MBB\Api;

use WP_REST_Server;
use ReflectionMethod;

class Base {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$methods = $this->get_public_methods();
		$methods = array_diff( $methods, [ '__construct', 'register_routes', 'has_permission' ] );
		array_walk( $methods, [ $this, 'register_route' ] );
	}

	private function register_route( $method ) {
		$route = str_replace( ['get_', '_'], ['', '-'], $method );
		register_rest_route( 'mbb', $route, [
			'method'              => WP_REST_Server::READABLE,
			'callback'            => [ $this, $method ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	private function get_public_methods() {
		$methods = get_class_methods( $this );
		return array_filter( $methods, function( $method ) {
			$reflect = new ReflectionMethod( $this, $method );
			return $reflect->isPublic();
		} );
	}

	protected function get_posts( $s ) {
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

	protected function get_terms( $s, $taxonomy ) {
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

	protected function get_users( $s ) {
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

	protected function get_user_roles( $s ) {
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

	protected function get_templates( $s ) {
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

	protected function get_formats( $s ) {
		$items = mbb_get_post_formats();
		$data = [];
		foreach ( $items as $name ) {
			if ( empty( $s ) || false !== strpos( $name, $s ) ) {
				$data[] = [
					'value' => $name,
					'label' => ucfirst( $name ),
				];
			}
		}
		return $data;
	}
}