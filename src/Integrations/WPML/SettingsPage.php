<?php
namespace MBB\Integrations\WPML;

use WP_Post;

class SettingsPage {
	public function __construct() {
		add_action( 'save_post_mb-settings-page', [ $this, 'register_package' ], 10, 2 );
		add_filter( 'mbb_settings_page', [ $this, 'use_translations' ], 10, 2 );
		add_action( 'deleted_post_mb-settings-page', [ $this, 'delete_package' ], 10, 2 );
	}

	public function register_package( int $post_id, WP_Post $post ): void {
		$settings_page = get_post_meta( $post_id, 'settings_page', true );
		if ( empty( $settings_page ) || ! is_array( $settings_page ) ) {
			return;
		}

		$package = $this->get_package( $post );

		do_action( 'wpml_start_string_package_registration', $package );

		$this->register_strings( $settings_page, $post );

		do_action( 'wpml_delete_unused_package_strings', $package );
	}

	public function use_translations( array $settings_page, WP_Post $post ): array {
		$package = $this->get_package( $post );

		if ( ! empty( $settings_page['menu_title'] ) ) {
			$settings_page['menu_title'] = apply_filters( 'wpml_translate_string', $settings_page['menu_title'], 'title', $package );
		}

		if ( ! empty( $settings_page['submit_button'] ) ) {
			$settings_page['submit_button'] = apply_filters( 'wpml_translate_string', $settings_page['submit_button'], 'submit_button', $package );
		}

		if ( ! empty( $settings_page['message'] ) ) {
			$settings_page['message'] = apply_filters( 'wpml_translate_string', $settings_page['message'], 'message', $package );
		}

		return $settings_page;
	}

	private function get_package( WP_Post $post ): array {
		return [
			'kind'      => 'MB Settings Page',
			'name'      => $post->post_name,
			'title'     => $post->post_title,
			'edit_link' => get_edit_post_link( $post ),
			'view_link' => admin_url( "admin.php?page={$post->post_name}" ),
		];
	}

	private function register_strings( array $settings_page, WP_Post $post ): void {
		$package = $this->get_package( $post );

		do_action(
			'wpml_register_string',
			$post->post_title,
			'title',
			$package,
			__( 'Title', 'meta-box-builder' ),
			LINE
		);
		do_action(
			'wpml_register_string',
			$settings_page['submit_button'] ?? '',
			'submit_button',
			$package,
			__( 'Submit button', 'meta-box-builder' ),
			LINE
		);
		do_action(
			'wpml_register_string',
			$settings_page['message'] ?? '',
			'message',
			$package,
			__( 'Custom message', 'meta-box-builder' ),
			LINE
		);
	}

	/**
	 * Delete the WPML string package when a settings page is deleted.
	 */
	public function delete_package( int $post_id, WP_Post $post ) {
		$package = $this->get_package( $post );
		do_action( 'wpml_delete_package', $package['name'], $package['kind'] );
	}
}