<?php
namespace MBB;

use MetaBox\Updater\Option;

abstract class BaseEditPage {
	protected $post_type;
	protected $slug_meta_box_title;

	public function __construct( $post_type, $slug_meta_box_title ) {
		$this->post_type           = $post_type;
		$this->slug_meta_box_title = $slug_meta_box_title;

		add_action( 'edit_form_after_title', [ $this, 'render' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_wrapper' ] );
		add_action( "save_post_$post_type", [ $this, 'save_wrapper' ], 10, 2 );

		add_action( "add_meta_boxes_$post_type", [ $this, 'remove_meta_boxes' ] );
		add_filter( 'rwmb_meta_boxes', [ $this, 'add_meta_boxes' ] );
		add_filter( 'rwmb_post_name_field_meta', [ $this, 'get_post_name' ] );
		add_filter( 'rwmb_post_name_value', '__return_empty_string' );
	}

	public function render() {
		if ( $this->is_screen() ) {
			wp_nonce_field( 'mbb-save', 'mbb_nonce' );
			echo '<div id="root" class="og"></div>';
		}
	}

	public function enqueue_wrapper() {
		if ( ! $this->is_screen() ) {
			return;
		}

		$this->enqueue();
	}

	abstract public function enqueue();

	public function save_wrapper( $post_id, $post ) {
		$parent = wp_is_post_revision( $post_id );
		if ( $parent ) {
			$post_id = $parent;
		}

		if ( ! wp_verify_nonce( rwmb_request()->post( 'mbb_nonce' ), 'mbb-save' ) ) {
			return;
		}

		$this->save( $post_id, $post );
	}

	abstract public function save( $post_id, $post );

	private function is_screen() {
		return $this->post_type === get_current_screen()->id;
	}

	public function remove_meta_boxes() {
		if ( ! $this->is_license_active() ) {
			remove_meta_box( 'submitdiv', null, 'side' );
		}

		remove_meta_box( 'slugdiv', null, 'normal' );
	}

	public function add_meta_boxes( $meta_boxes ) {
		if ( ! $this->is_license_active() ) {
			$meta_boxes[] = [
				'title'      => '<span class="dashicons dashicons-warning"></span>' . __( 'License Warning', 'meta-box-builder' ),
				'id'         => 'mbb-license-warning',
				'post_types' => [ $this->post_type ],
				'context'    => 'side',
				'priority'   => 'high',
				'style'      => 'seamless',
				'fields'     => [
					[
						'type'     => 'custom_html',
						'callback' => [ $this, 'output_license_warning' ],
					],
				],
			];
		}

		$meta_boxes[] = [
			'title'      => $this->slug_meta_box_title,
			'post_types' => [ $this->post_type ],
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

	public function output_license_warning() {
		$settings_page = $this->get_updater()->is_network_activated() ? network_admin_url( 'settings.php?page=meta-box-updater' ) : admin_url( 'admin.php?page=meta-box-updater' );

		$status   = $this->get_updater()->get_license_status();
		$messages = [
			// Translators: %1$s - URL to the settings page, %2$s - URL to the pricing page.
			'no_key'  => __( 'You have not set your Meta Box license key yet. Please <a href="%1$s">enter your license key</a> to continue.', 'meta-box-builder' ),
			// Translators: %1$s - URL to the settings page, %2$s - URL to the pricing page.
			'invalid' => __( 'Your license key for Meta Box is <b>invalid</b>. Please <a href="%1$s">update your license key</a> to continue.', 'meta-box-builder' ),
			// Translators: %1$s - URL to the settings page, %2$s - URL to the pricing page.
			'error'   => __( 'Your license key for Meta Box is <b>invalid</b>. Please <a href="%1$s">update your license key</a> to continue.', 'meta-box-builder' ),
			// Translators: %3$s - URL to the My Account page.
			'expired' => __( 'Your license key for Meta Box is <b>expired</b>. Please <a href="%3$s" target="_blank">renew your license</a> to continue.', 'meta-box-builder' ),
		];

		return '<h2><span class="dashicons dashicons-warning"></span>' . __( 'License Warning', 'meta-box-builder' ) . '</h2>' . wp_kses_post( sprintf( $messages[ $status ], $settings_page, 'https://metabox.io/pricing/', 'https://metabox.io/my-account/' ) );
	}

	public function get_post_name() {
		return get_post_field( 'post_name' );
	}

	protected function is_license_active(): bool {
		return $this->get_updater()->get_license_status() === 'active';
	}

	private function get_updater(): Option {
		static $updater;

		if ( ! $updater ) {
			$updater = new Option();
		}

		return $updater;
	}
}
