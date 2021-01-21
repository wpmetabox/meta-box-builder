<?php
namespace MBB\SettingsPage;

class Register {
	public function __construct() {
		$this->register_post_type();

		add_filter( 'mb_settings_pages', [ $this, 'register_settings_pages' ] );
	}

	private function register_post_type() {
		// Register main post type 'mb-settings-page'.
		$labels = [
			'name'               => _x( 'Settings Pages', 'Post Type General Name', 'mb-settings-page' ),
			'singular_name'      => _x( 'Settings Page', 'Post Type Singular Name', 'mb-settings-page' ),
			'menu_name'          => __( 'Settings Page', 'mb-settings-page' ),
			'name_admin_bar'     => __( 'Settings Page', 'mb-settings-page' ),
			'parent_item_colon'  => __( 'Parent Settings Page:', 'mb-settings-page' ),
			'all_items'          => __( 'Settings Pages', 'mb-settings-page' ),
			'add_new_item'       => __( 'Add New Settings Page', 'mb-settings-page' ),
			'add_new'            => __( 'New Settings Page', 'mb-settings-page' ),
			'new_item'           => __( 'New Settings Page', 'mb-settings-page' ),
			'edit_item'          => __( 'Edit Settings Page', 'mb-settings-page' ),
			'update_item'        => __( 'Update Settings Page', 'mb-settings-page' ),
			'view_item'          => __( 'View Settings Page', 'mb-settings-page' ),
			'search_items'       => __( 'Search Settings Page', 'mb-settings-page' ),
			'not_found'          => __( 'Not found', 'mb-settings-page' ),
			'not_found_in_trash' => __( 'Not found in Trash', 'mb-settings-page' ),
		];

		$args   = [
			'label'         => __( 'Settings Pages', 'mb-settings-page' ),
			'labels'        => $labels,
			'supports'      => ['title'],
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => 'meta-box',
			'can_export'    => true,
			'rewrite'       => false,
			'query_var'     => true,
			'menu_position' => 200,
		];

		register_post_type( 'mb-settings-page', $args );
	}

	public function register_settings_pages( $settings_pages ) {
		$query = new \WP_Query( [
			'posts_per_page'         => -1,
			'post_status'            => 'publish',
			'post_type'              => 'mb-settings-page',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		] );

		foreach ( $query->posts as $post ) {
			$settings_pages[] = $this->get_settings_page( $post );
		}

		return $settings_pages;
	}

	private function get_settings_page( $post ) {
		$settings_page = get_post_meta( $post->ID, 'page', true );
		$settings_page['menu_title'] = $post->post_title;
		$settings_page['page_title'] = $post->post_title;
		$settings_page['id'] = $post->post_name;

		return $settings_page;
	}
}