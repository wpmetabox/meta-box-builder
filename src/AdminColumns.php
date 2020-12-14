<?php
namespace MBB;

class AdminColumns {
	public function __construct() {
		add_action( 'admin_print_styles-edit.php', [ $this, 'enqueue' ] );
		add_filter( 'manage_meta-box_posts_columns', [ $this, 'add_columns' ] );
		add_action( 'manage_meta-box_posts_custom_column', [ $this, 'show_column' ] );
	}

	public function enqueue() {
		if ( 'edit-meta-box' !== get_current_screen()->id ) {
			return;
		}

		wp_enqueue_style( 'mbb-list', MBB_URL . 'assets/css/list.css', [], MBB_VER );
		wp_enqueue_script( 'mbb-list', MBB_URL . 'assets/js/list.js', [ 'jquery' ], MBB_VER );
		wp_localize_script( 'mbb-list', 'MBB', [
			'export' => esc_html__( 'Export', 'meta-box-builder' ),
			'import' => esc_html__( 'Import', 'meta-box-builder' ),
		] );

		wp_register_script( 'popper', MBB_URL . 'assets/js/popper.min.js', [], '1.15.0', true );
		wp_enqueue_script( 'tippy', MBB_URL . 'assets/js/tippy.min.js', ['popper'], '4.3.1', true );
		wp_add_inline_script( 'tippy', 'tippy( document.body, {target: ".mbb-tooltip", placement: "top-start", arrow: true, animation: "fade"} );' );
	}

	public function add_columns( $columns ) {
		$new_columns = array(
			'for'      => __( 'Show For', 'meta-box-builder' ),
			'location' => __( 'Location', 'meta-box-builder' ),
		);
		if ( mbb_is_extension_active( 'mb-frontend-submission' ) ) {
			$new_columns['shortcode'] = __( 'Shortcode', 'meta-box-builder' ) . mbb_tooltip( __( 'Embed the field group in the front end for users to submit posts.', 'meta-box-builder' ) );
		}
		$columns = array_slice( $columns, 0, 2, true ) + $new_columns + array_slice( $columns, 2, null, true );
		return $columns;
	}

	public function show_column( $name ) {
		global $post;
		if ( ! in_array( $name, array( 'for', 'location', 'shortcode' ) ) ) {
			return;
		}
		$data = json_decode( $post->post_excerpt );
		$saved_data = get_post_meta( get_the_ID(), 'raw', true );
		$data = $saved_data ? json_decode( $saved_data, true ) : [];
		$this->{"show_$name"}( $data );
	}

	private function show_for( $data ) {
		$object_type = Arr::get( $data, 'object_type', 'post' );
		switch ( $object_type ) {
			case 'user':
				esc_html_e( 'Users', 'meta-box-builder' );
				break;
			case 'comment':
				esc_html_e( 'Comments', 'meta-box-builder' );
				break;
			case 'setting':
				esc_html_e( 'Settings Pages', 'meta-box-builder' );
				break;
			case 'post':
				esc_html_e( 'Posts', 'meta-box-builder' );
				break;
			case 'term':
				esc_html_e( 'Taxonomies', 'meta-box-builder' );
			case 'block':
				esc_html_e( 'Blocks', 'meta-box-builder' );
		}
	}

	private function show_location( $data ) {
		$object_type = Arr::get( $data, 'object_type', 'post' );
		switch ( $object_type ) {
			case 'user':
				esc_html_e( 'All Users', 'meta-box-builder' );
				break;
			case 'comment':
				esc_html_e( 'All Comments', 'meta-box-builder' );
				break;
			case 'setting':
				$settings_pages = mbb_get_setting_pages();
				$settings_pages = wp_list_pluck( $settings_pages, 'title', 'id' );
				$ids            = Arr::get( $data, 'settings_pages', [] );
				$saved          = array_intersect_key( $settings_pages, array_flip( $ids ) );
				echo implode( '<br>', $saved );
				break;
			case 'post':
				echo implode( '<br>', array_filter( array_map( function( $post_type ) {
					$post_type_object = get_post_type_object( $post_type );
					return $post_type_object ? $post_type_object->labels->singular_name : '';
				}, Arr::get( $data, 'post_types', ['post'] ) ) ) );
				break;
			case 'term':
				echo implode( '<br>', array_filter( array_map( function( $taxonomy ) {
					$taxonomy_object = get_taxonomy( $taxonomy );
					return $taxonomy_object ? $taxonomy_object->labels->singular_name : '';
				}, Arr::get( $data, 'taxonomies', [] ) ) ) );
		}
	}

	private function show_shortcode() {
		global $post;
		$shortcode = "[mb_frontend_form id='{$post->post_name}' post_fields='title,content']";
		echo '<input type="text" readonly value="' . esc_attr( $shortcode ) . '" onclick="this.select()">';
	}
}
