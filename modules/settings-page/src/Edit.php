<?php
namespace MBB\SettingsPage;

use MBB\Helpers\Data;

class Edit {
	public function __construct() {
		add_action( 'edit_form_after_title', [ $this, 'render' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'save_post_mb-settings-page', [ $this, 'save' ] );

		add_action( 'add_meta_boxes_mb-settings-page', [ $this, 'remove_slug_meta_box'] );
		add_filter( 'rwmb_meta_boxes', [ $this, 'add_meta_boxes' ] );
		add_filter( 'rwmb_post_name_field_meta', [ $this, 'get_post_name' ] );
		add_filter( 'rwmb_post_name_value', '__return_empty_string' );
	}

	public function render() {
		if ( $this->is_screen() ) {
			echo '<div id="root" class="mb-spui og"></div>';
		}
	}

	public function enqueue() {
		if ( ! $this->is_screen() ) {
			return;
		}

		$url = MBB_URL . 'modules/settings-page/assets';

		wp_enqueue_style( 'mb-settings-page-ui', "$url/settings-page.css", ['wp-components'], MBB_VER );
		wp_enqueue_script( 'mb-settings-page-ui', "$url/settings-page.js", ['wp-element', 'wp-components', 'wp-i18n'], MBB_VER, true );

		global $post;
		$data                   = [
			'settings'       => json_decode( $post->post_content, true ),
			'icons'          => Data::get_dashicons(),
			'capabilities'   => $this->get_capabilities(),
			'menu_positions' => $this->get_menu_positions(),
			'parents'        => $this->get_parents(),
		];

		wp_localize_script( 'mb-settings-page-ui', 'MBSPUI', $data );
	}

	private function get_capabilities() {
		$caps = [];
		$roles = wp_roles();
		foreach ( $roles->roles as $role ) {
			$caps = array_merge( $caps, $role[ 'capabilities' ] );
		}

		$caps = array_unique( $caps );
		sort( $caps );

		return array_combine( $caps, $caps );
	}

	private function get_menu_positions() {
		global $menu;
		$positions = [];
		foreach ( $menu as $position => $params ) {
			if ( ! empty( $params[0] ) ) {
				$positions[ $position ] = $this->strip_span( $params[0] );
			}
		}
		return $positions;
	}

	private function get_parents() {
		global $menu;
		$options = [
			'none'  => __( 'None', 'meta-box-builder' ),
		];
		foreach ( $menu as $params ) {
			if ( ! empty( $params[0] ) && ! empty( $params[2] ) ) {
				$options[ $params[2] ] = $this->strip_span( $params[0] );
			}
		}
		return $options;
	}

	private function strip_span( $html ) {
		return preg_replace( '@<span .*>.*</span>@si', '', $html );
	}

	public function save( $post_id ) {
		$parent = wp_is_post_revision( $post_id );
		if ( $parent ) {
			$post_id = $parent;
		}
	}

	private function is_screen() {
		return 'mb-settings-page' === get_current_screen()->id;
	}

	public function remove_slug_meta_box() {
		remove_meta_box( 'slugdiv', null, 'normal' );
	}

	public function add_meta_boxes( $meta_boxes ) {
		$meta_boxes[] = [
			'title'      => esc_html__( 'Settings Page ID', 'meta-box-builder' ),
			'id'         => 'settings-page-id',
			'post_types' => ['mb-settings-page'],
			'context'    => 'side',
			'priority'   => 'low',
			'fields'     => [
				[
					'type' => 'text',
					'id'   => 'post_name',
				],
			],
		];
		return $meta_boxes;
	}

	public function get_post_name() {
		return get_post_field( 'post_name' );
	}
}