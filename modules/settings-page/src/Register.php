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
			'labels'       => $labels,
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => 'meta-box',
			'rewrite'      => false,
			'supports'     => [ 'title' ],
		];

		register_post_type( 'mb-settings-page', $args );
		// Font Awesome.
		add_action( 'admin_init', [ $this, 'enqueue_font_awesome' ] );
		add_action( 'admin_menu', [ $this, 'filter_class_font_awesome' ] );
		add_action( 'adminmenu', [ $this, 'remove_filter_class_font_awesome' ] );
	}

	public function enqueue_font_awesome() {
		wp_enqueue_style( 'font-awesome', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/all.min.css', '', ' 6.2.1' );
		wp_add_inline_style(
			'font-awesome',
			'.fa:before, fas, .fa-solid:before, .fab:before, .fa-brand:before, .far:before, .fa-regular:before {
				font-size: 16px;
				font-family: inherit;
				font-weight: inherit;
			}'
		);
	}

	public function filter_class_font_awesome() {
		add_filter( 'sanitize_html_class', [ $this, 'sanitize_html_class_font_awesome' ], 10, 2 );
	}

	public function remove_filter_class_font_awesome() {
		remove_filter( 'sanitize_html_class', [ $this, 'sanitize_html_class_font_awesome' ] );
	}

	public function sanitize_html_class_font_awesome( $sanitized, $class ) {
		$strpos = [ 'fa', 'fas', 'fa-solid', 'fab', 'fa-brand', 'far', 'fa-regular' ];
		foreach ( $strpos as $value ) {
			if ( strpos( $class, $value ) !== false ) {
				return str_replace( 'dashicons-', '', $class );
			}
		}
		return $sanitized;
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
