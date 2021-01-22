<?php
namespace MBB\Relationships;

class Register {
	public function __construct() {
		$this->register_post_type();

		add_filter( 'mb_relationships_init', [ $this, 'register_relationship' ] );
	}

	private function register_post_type() {
		$labels = [
			'name'               => _x( 'Relationships', 'Post Type General Name', 'meta-box-builder' ),
			'singular_name'      => _x( 'Relationship', 'Post Type Singular Name', 'meta-box-builder' ),
			'menu_name'          => __( 'Relationship', 'meta-box-builder' ),
			'name_admin_bar'     => __( 'Relationship', 'meta-box-builder' ),
			'parent_item_colon'  => __( 'Parent Relationship:', 'meta-box-builder' ),
			'all_items'          => __( 'Relationships', 'meta-box-builder' ),
			'add_new_item'       => __( 'Add New Relationship', 'meta-box-builder' ),
			'add_new'            => __( 'New Relationship', 'meta-box-builder' ),
			'new_item'           => __( 'New Relationship', 'meta-box-builder' ),
			'edit_item'          => __( 'Edit Relationship', 'meta-box-builder' ),
			'update_item'        => __( 'Update Relationship', 'meta-box-builder' ),
			'view_item'          => __( 'View Relationship', 'meta-box-builder' ),
			'search_items'       => __( 'Search Relationship', 'meta-box-builder' ),
			'not_found'          => __( 'Not found', 'meta-box-builder' ),
			'not_found_in_trash' => __( 'Not found in Trash', 'meta-box-builder' ),
		];

		$args   = [
			'label'         => __( 'Relationships', 'meta-box-builder' ),
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

		register_post_type( 'mb-relationship', $args );
	}

	public function register_relationship() {
		$query = new \WP_Query( [
			'posts_per_page'         => -1,
			'post_status'            => 'publish',
			'post_type'              => 'mb-relationship',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		] );

		foreach ( $query->posts as $post ) {
			$relationship = $this->get_relationship( $post );
			\MB_Relationships_API::register( $relationship );
		}
	}

	private function get_relationship( $post ) {
		$relationship = get_post_meta( $post->ID, 'relationship', true );
		$relationship['id'] = $post->post_name;

		return $relationship;
	}
}