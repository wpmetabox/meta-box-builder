<?php
namespace MBB\Integrations\WPML;

use WP_Post;

class FieldGroup {
	public function __construct() {
		add_action( 'save_post_meta-box', [ $this, 'register_package' ], 10, 2 );
		add_filter( 'mbb_meta_box', [ $this, 'use_translations' ], 10, 2 );
		add_action( 'deleted_post_meta-box', [ $this, 'delete_package' ], 10, 2 );
	}

	public function register_package( int $post_id, WP_Post $post ): void {
		$meta_box = get_post_meta( $post_id, 'meta_box', true );
		if ( empty( $meta_box ) || ! is_array( $meta_box ) ) {
			return;
		}

		$package = $this->get_package( $post );

		do_action( 'wpml_start_string_package_registration', $package );

		$this->register_strings( $meta_box, $post );

		do_action( 'wpml_delete_unused_package_strings', $package );
	}

	public function use_translations( array $meta_box, WP_Post $post ): array {
		$package = $this->get_package( $post );

		if ( ! empty( $meta_box['title'] ) ) {
			$meta_box['title'] = apply_filters( 'wpml_translate_string', $meta_box['title'], 'title', $package );
		}

		return $meta_box;
	}

	private function get_package( WP_Post $post ): array {
		return [
			'kind'      => 'Meta Box: Field Group',
			'name'      => $post->post_name,
			'title'     => $post->post_title,
			'edit_link' => get_edit_post_link( $post ),
		];
	}

	private function register_strings( array $meta_box, WP_Post $post ): void {
		$package = $this->get_package( $post );

		do_action(
			'wpml_register_string',
			$meta_box['title'] ?? '',
			'title',
			$package,
			__( 'Title', 'meta-box-builder' ),
			LINE
		);
	}

	/**
	 * Delete the WPML string package when a field group is deleted.
	 */
	public function delete_package( int $post_id, WP_Post $post ) {
		$package = $this->get_package( $post );
		do_action( 'wpml_delete_package', $package['name'], $package['kind'] );
	}
}