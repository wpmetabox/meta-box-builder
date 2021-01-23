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

		$args = [
			'labels'        => $labels,
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => 'meta-box',
			'rewrite'       => false,
			'supports'      => ['title'],
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
			$settings_pages[] = get_post_meta( $post->ID, 'settings_page', true );
		}

		return $settings_pages;
	}
}