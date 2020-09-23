<?php
namespace MBB;

class Edit {
	public $meta = [];

	public function __construct() {
		add_action( 'add_meta_boxes_meta-box', [ $this, 'remove_meta_box' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'edit_form_after_title', [ $this, 'render' ] );

		// Removed hooks that modify post content, excerpt. Priority 20 to run after default WP hooks.
		add_action( 'init', [ $this, 'remove_content_hooks' ], 20 );
		add_filter( 'wp_insert_post_data', [ $this, 'update_meta_box' ], 10, 2 );
	}

	public function remove_meta_box() {
		remove_meta_box( 'submitdiv', 'meta-box', 'side' );
	}

	public function render() {
		if ( ! $this->is_screen() ) {
			return;
		}
		echo '<div id="root"></div>';
	}

	public function enqueue() {
		if ( ! $this->is_screen() ) {
			return;
		}
		wp_enqueue_style( 'mbb-app', MBB_URL . 'assets/css/style.css', ['wp-components'] );

		wp_enqueue_code_editor( ['type' => 'php'] );
		wp_enqueue_script( 'mbb-app', MBB_URL . 'app/build/bundle.min.js', ['wp-element', 'wp-components', 'clipboard'], MBB_VER, true );

		wp_localize_script( 'mbb-app', 'MbbApp', [
			'restUrl' => rest_url( 'mbb-parser/meta-box' ),
		] );

		wp_localize_script( 'mbb-app', 'post_types', mbb_get_post_types() );
		wp_localize_script( 'mbb-app', 'taxonomies', mbb_get_taxonomies() );
		wp_localize_script( 'mbb-app', 'settings_pages', mbb_get_setting_pages() );
		wp_localize_script( 'mbb-app', 'templates', mbb_get_templates() );
		wp_localize_script( 'mbb-app', 'icons', mbb_get_dashicons() );
		wp_localize_script( 'mbb-app', 'menu', mbb_get_builder_menu() );
		wp_localize_script( 'mbb-app', 'align', [
			'left'   => __( 'Left', 'meta-box-builder' ),
			'right'  => __( 'Right', 'meta-box-builder' ),
			'center' => __( 'Center', 'meta-box-builder' ),
			'wide'   => __( 'Wide', 'meta-box-builder' ),
			'full'   => __( 'Full', 'meta-box-builder' ),
		] );
	}

	/**
	 * Removed excerpt_save_pre filter for meta box, which adds rel="noopener"
	 * to <a target="_blank"> links, thus braking JSON validity.
	 *
	 * @see https://elightup.freshdesk.com/a/tickets/27894
	 */
	public function remove_content_hooks() {
		if ( ! is_admin() ) {
			return;
		}

		// Update meta box via method POST.
		$action    = filter_input( INPUT_POST, 'action' );
		$post_type = filter_input( INPUT_POST, 'post_type' );
		$is_post   = 'editpost' === $action && 'meta-box' === $post_type;

		// Trash or restore meta box via method GET.
		$is_get  = isset( $_GET['post_type'] ) && 'meta-box' === $_GET['post_type']; // Bulk removed.
		$post_id = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
		if ( $post_id ) {
			$post = get_post( $post_id );
			$is_get = 'meta-box' === $post->post_type;
		}

		if ( $is_post || $is_get ) {
			remove_all_filters( 'excerpt_save_pre' );
		}
	}

	/**
	 * Manually set post_content field, which is parsed from post_excerpt and serialize.
	 *
	 * @param  array $data Raw post data.
	 * @param  array $post Current post to save.
	 *
	 * @return array
	 */
	public function update_meta_box( $data, $post ) {
		if ( ! isset( $post['post_type'] ) || 'meta-box' !== $post['post_type'] || empty( $data['post_excerpt'] ) ) {
			return $data;
		}

		static $is_saved = false;
		if ( $is_saved ) {
			return $data;
		}

		$settings = json_decode( wp_unslash( $data['post_excerpt'] ), true );
		$parser = new \MBBParser\Parsers\MetaBox( $settings );
		$parser->parse();

		$meta_box = $parser->get_settings();
		$status   = empty( $meta_box['status'] ) ? 'publish' : $meta_box['status'];
		unset( $meta_box['status'] );

		// Only allow Trash or Publish status.
		$data['post_status']  = 'trash' === $data['post_status'] ? $data['post_status'] : $status;

		/*
		 * Encode the meta box settings in JSON.
		 * Use wp_json_encode() to handle non-UTF8 string.
		 * Must add slashes. WordPress will unslash later.
		 */
		$data['post_content'] = wp_slash( wp_json_encode( $meta_box, JSON_UNESCAPED_UNICODE ) );

		$is_saved = true;

		return $data;
	}

	private function is_screen() {
		$screen = get_current_screen();
		return 'post' === $screen->base && 'meta-box' === $screen->post_type;
	}
}
