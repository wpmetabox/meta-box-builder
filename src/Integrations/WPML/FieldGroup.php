<?php
namespace MBB\Integrations\WPML;

use WP_Post;

class FieldGroup {
	public function __construct() {
		add_action( 'save_post_meta-box', [ $this, 'register_package' ], 20, 2 );
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

		$this->use_fields_translations( $meta_box['fields'], $post );

		return $meta_box;
	}

	private function use_fields_translations( array &$fields, WP_Post $post, string $base_id = '' ): void {
		$package = $this->get_package( $post );

		foreach ( $fields as &$field ) {
			$this->use_field_translations( $field, $post, $package, $base_id );
		}
	}

	private function use_field_translations( array &$field, WP_Post $post, array $package, string $base_id = '' ): void {
		$id = $base_id ? $base_id . '_' . $field['id'] : $field['id'];

		if ( ! empty( $field['name'] ) ) {
			$field['name'] = apply_filters( 'wpml_translate_string', $field['name'], $id . '_name', $package );
		}
		if ( ! empty( $field['desc'] ) ) {
			$field['desc'] = apply_filters( 'wpml_translate_string', $field['desc'], $id . '_desc', $package );
		}
		if ( ! empty( $field['label_description'] ) ) {
			$field['label_description'] = apply_filters( 'wpml_translate_string', $field['label_description'], $id . '_label_description', $package );
		}
		if ( ! empty( $field['placeholder'] ) ) {
			$field['placeholder'] = apply_filters( 'wpml_translate_string', $field['placeholder'], $id . '_placeholder', $package );
		}
		if ( ! empty( $field['add_button'] ) ) {
			$field['add_button'] = apply_filters( 'wpml_translate_string', $field['add_button'], $id . '_add_button', $package );
		}

		if ( ! empty( $field['clone'] ) && ! empty( $field['add_button'] ) ) {
			$field['add_button'] = apply_filters( 'wpml_translate_string', $field['add_button'], $id . '_add_button', $package );
		}

		if ( in_array( $field['type'], [ 'select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete' ], true ) ) {
			$options = $field['options'] ?? [];
			foreach ( $options as $key => $option ) {
				$options[$key] = apply_filters( 'wpml_translate_string', $option, $id . '_option_' . $key, $package );
			}
			$field['options'] = $options;
		}

		if ( isset( $field['tooltip'] ) ) {
			$tooltip = '';
			if ( is_string( $field['tooltip'] ) ) {
				$tooltip = $field['tooltip'];
			} elseif ( isset( $field['tooltip']['content'] ) ) {
				$tooltip = $field['tooltip']['content'];
			}
			if ( ! empty( $tooltip ) ) {
				$field['tooltip'] = apply_filters( 'wpml_translate_string', $tooltip, $id . '_tooltip', $package );
			}
		}

		if ( 'group' === $field['type'] ) {
			if ( ! empty( $field['group_title'] ) ) {
				$field['group_title'] = apply_filters( 'wpml_translate_string', $field['group_title'], $id . '_group_title', $package );
			}
			$this->use_fields_translations( $field['fields'], $post, $id );
		}
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

		$this->register_fields_strings( $meta_box['fields'], $post );
	}

	private function register_fields_strings( array $fields, WP_Post $post, string $base_id = '' ): void {
		foreach ( $fields as $field ) {
			$this->register_field_strings( $field, $post, $base_id );
		}
	}

	private function register_field_strings( array $field, WP_Post $post, string $base_id = '' ): void {
		$package = $this->get_package( $post );

		$id = $base_id ? $base_id . '_' . $field['id'] : $field['id'];

		do_action(
			'wpml_register_string',
			$field['name'] ?? '',
			$id . '_name',
			$package,
			// translators: %s is the field name.
			sprintf( __( '%s: Label', 'meta-box-builder' ), $field['name'] ),
			LINE
		);
		do_action(
			'wpml_register_string',
			$field['desc'] ?? '',
			$id . '_desc',
			$package,
			// translators: %s is the field name.
			sprintf( __( '%s: Description', 'meta-box-builder' ), $field['name'] ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$field['label_description'] ?? '',
			$id . '_label_description',
			$package,
			// translators: %s is the field name.
			sprintf( __( '%s: Label description', 'meta-box-builder' ), $field['name'] ),
			LINE
		);

		do_action(
			'wpml_register_string',
			$field['placeholder'] ?? '',
			$id . '_placeholder',
			$package,
			// translators: %s is the field name.
			sprintf( __( '%s: Placeholder', 'meta-box-builder' ), $field['name'] ),
			LINE
		);

		if ( ! empty( $field['clone'] ) ) {
			do_action(
				'wpml_register_string',
				$field['add_button'] ?? '',
				$id . '_add_button',
				$package,
				// translators: %s is the field name.
				sprintf( __( '%s: Add more text', 'meta-box-builder' ), $field['name'] ),
				LINE
			);
		}

		if ( in_array( $field['type'], [ 'select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete' ], true ) ) {
			$options = $field['options'] ?? [];
			foreach ( $options as $key => $option ) {
				if ( is_string( $option ) ) {
					do_action(
						'wpml_register_string',
						$option,
						$id . '_option_' . $key,
						$package,
						// translators: %1$s is the field name, %2$s is the option label.
						sprintf( __( '%1$s: Option %2$s', 'meta-box-builder' ), $field['name'], $option ),
						LINE
					);
				}
			}
		}

		if ( isset( $field['tooltip'] ) ) {
			$tooltip = '';
			if ( is_string( $field['tooltip'] ) ) {
				$tooltip = $field['tooltip'];
			} elseif ( isset( $field['tooltip']['content'] ) ) {
				$tooltip = $field['tooltip']['content'];
			}

			do_action(
				'wpml_register_string',
				$tooltip,
				$id . '_tooltip',
				$package,
				// translators: %s is the field name.
				sprintf( __( '%s: Tooltip', 'meta-box-builder' ), $field['name'] ),
				LINE
			);
		}

		if ( 'group' === $field['type'] ) {
			if ( ! empty( $field['collapsible'] ) ) {
				do_action(
					'wpml_register_string',
					$field['group_title'] ?? '',
					$id . '_group_title',
					$package,
					// translators: %s is the field name.
					sprintf( __( '%s: Group title', 'meta-box-builder' ), $field['name'] ),
					LINE
				);
			}

			$this->register_fields_strings( $field['fields'], $post, $id );
		}
	}

	/**
	 * Delete the WPML string package when a field group is deleted.
	 */
	public function delete_package( int $post_id, WP_Post $post ) {
		$package = $this->get_package( $post );
		do_action( 'wpml_delete_package', $package['name'], $package['kind'] );
	}
}