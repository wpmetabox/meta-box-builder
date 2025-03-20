<?php
namespace MBB\Integrations\WPML;

use WP_Post;

class Relationship {
	public function __construct() {
		add_action( 'save_post_mb-relationship', [ $this, 'register_package' ], 20, 2 );
		add_filter( 'mbb_relationship', [ $this, 'use_translations' ], 10, 2 );
		add_action( 'deleted_post_mb-relationship', [ $this, 'delete_package' ], 10, 2 );
	}

	public function register_package( int $post_id, WP_Post $post ): void {
		$relationship = get_post_meta( $post_id, 'relationship', true );
		if ( empty( $relationship ) || ! is_array( $relationship ) ) {
			return;
		}

		$package = $this->get_package( $post );

		do_action( 'wpml_start_string_package_registration', $package );

		$this->register_strings( $relationship, $post );

		do_action( 'wpml_delete_unused_package_strings', $package );
	}

	private function register_strings( array $relationship, WP_Post $post ): void {
		$package = $this->get_package( $post );

		do_action(
			'wpml_register_string',
			$relationship['title'] ?? '',
			'title',
			$package,
			__( 'Title', 'meta-box-builder' ),
			LINE
		);

		$this->register_side_strings( 'from', $relationship['from'] ?? [], $package );
		$this->register_side_strings( 'to', $relationship['to'] ?? [], $package );
	}

	private function register_side_strings( string $side, array $data, array $package ): void {
		do_action(
			'wpml_register_string',
			$data['empty_message'] ?? '',
			$side . '_empty_message',
			$package,
			sprintf( __( '%s: Empty message', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['admin_column']['title'] ?? '',
			$side . '_admin_column_title',
			$package,
			sprintf( __( '%s: Admin column title', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['meta_box']['title'] ?? '',
			$side . '_meta_box_title',
			$package,
			sprintf( __( '%s: Meta box title', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['field']['name'] ?? '',
			$side . '_field_name',
			$package,
			sprintf( __( '%s: Field name', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['field']['desc'] ?? '',
			$side . '_field_desc',
			$package,
			sprintf( __( '%s: Field description', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['field']['label_description'] ?? '',
			$side . '_field_label_description',
			$package,
			sprintf( __( '%s: Field label description', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['field']['placeholder'] ?? '',
			$side . '_field_placeholder',
			$package,
			sprintf( __( '%s: Field placeholder', 'meta-box-builder' ), $side ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$data['field']['add_button'] ?? '',
			$side . '_field_add_button',
			$package,
			sprintf( __( '%s: Field add button', 'meta-box-builder' ), $side ),
			LINE
		);
	}

	public function use_translations( array $relationship, WP_Post $post ): array {
		$package = $this->get_package( $post );

		if ( ! empty( $relationship['title'] ) ) {
			$relationship['title'] = apply_filters( 'wpml_translate_string', $relationship['title'], 'title', $package );
		}

		$this->use_side_translations( 'from', $relationship['from'], $package );
		$this->use_side_translations( 'to', $relationship['to'], $package );

		return $relationship;
	}

	private function use_side_translations( string $side, array &$data, array $package ): void {
		if ( ! empty( $data['empty_message'] ) ) {
			$data['empty_message'] = apply_filters( 'wpml_translate_string', $data['empty_message'], $side . '_empty_message', $package );
		}
		if ( ! empty( $data['admin_column']['title'] ) ) {
			$data['admin_column']['title'] = apply_filters( 'wpml_translate_string', $data['admin_column']['title'], $side . '_admin_column_title', $package );
		}
		if ( ! empty( $data['meta_box']['title'] ) ) {
			$data['meta_box']['title'] = apply_filters( 'wpml_translate_string', $data['meta_box']['title'], $side . '_meta_box_title', $package );
		}
		if ( ! empty( $data['field']['name	'] ) ) {
			$data['field']['name'] = apply_filters( 'wpml_translate_string', $data['field']['name'], $side . '_field_name', $package );
		}
		if ( ! empty( $data['field']['desc'] ) ) {
			$data['field']['desc'] = apply_filters( 'wpml_translate_string', $data['field']['desc'], $side . '_field_desc', $package );
		}
		if ( ! empty( $data['field']['label_description'] ) ) {
			$data['field']['label_description'] = apply_filters( 'wpml_translate_string', $data['field']['label_description'], $side . '_field_label_description', $package );
		}
		if ( ! empty( $data['field']['placeholder'] ) ) {
			$data['field']['placeholder'] = apply_filters( 'wpml_translate_string', $data['field']['placeholder'], $side . '_field_placeholder', $package );
		}
		if ( ! empty( $data['field']['add_button'] ) ) {
			$data['field']['add_button'] = apply_filters( 'wpml_translate_string', $data['field']['add_button'], $side . '_field_add_button', $package );
		}
	}

	private function get_package( WP_Post $post ): array {
		return [
			'kind'      => 'Meta Box: Relationship',
			'name'      => $post->post_name,
			'title'     => $post->post_title,
			'edit_link' => get_edit_post_link( $post ),
		];
	}

	public function delete_package( int $post_id, WP_Post $post ) {
		$package = $this->get_package( $post );
		do_action( 'wpml_delete_package', $package['name'], $package['kind'] );
	}
}