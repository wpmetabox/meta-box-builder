<?php
namespace MBB\Integrations\Polylang;

use MBB\Control;
use RW_Meta_Box;

class FieldGroupValues {
	// Define test field IDs as constants
	const TEST_FIELD_IDS = [
		'text_field',
		'textarea_field',
		'wysiwyg_field'
	];

	const MODES = [ 'translate', 'copy', 'ignore', 'advanced' ];

	public function __construct() {
		add_filter( 'mbb_settings_controls', [ $this, 'add_translation_control' ] );

		// Add filter to handle field value translations
		// add_filter( 'rwmb_field_meta', [ $this, 'translate_field_value' ], 10, 4 );

		// Tell Polylang whether to translate or copy a field
		add_filter( 'pll_copy_post_metas', [ $this, 'copy_post_metas' ], 10, 3 );
	}

	public function add_translation_control( array $controls ): array {
		// Add the control after the custom settings control (index 40)
		$controls[50] = Control::Select( 'translation', [
			'label'   => __( 'Translation', 'meta-box-builder' ),
			'tooltip' => __( 'Choose how to handle field translations in this field group', 'meta-box-builder' ),
			'options' => [
				'ignore'    => __( 'Do not translate any fields in this field group', 'meta-box-builder' ),
				'translate' => __( 'Translate all fields in this field group', 'meta-box-builder' ),
				'copy'      => __( 'Synchronize values accross languages', 'meta-box-builder' ),
				'advanced'  => __( 'Set translation mode per field', 'meta-box-builder' ),
			],
		], 'ignore' );

		return $controls;
	}

	public function copy_post_metas( $keys, $sync, $from ): array {
		$fields = $this->get_translatable_fields( $from );

		if ( $sync ) {
			return array_merge( $keys, $fields['copy'] );
		} else {
			return array_merge( $keys, $fields['copy'], $fields['translate'] );
		}
	}

	private function get_translatable_fields( $post_id ): array {
		$meta_boxes = rwmb_get_registry( 'meta_box' )->get_by( [ 'object_type' => 'post' ] );
		array_walk( $meta_boxes, 'rwmb_check_meta_box_supports', [ 'post', $post_id ] );
		$meta_boxes = array_filter( $meta_boxes );

		$fields = [
			'copy'      => [],
			'translate' => [],
			'ignore'    => [],
		];
		foreach ( $meta_boxes as $meta_box ) {
			foreach ( $meta_box->fields as $field ) {
				if ( empty( $field['id'] ) ) {
					continue;
				}

				$mode = $meta_box->translation ?: 'ignore';
				if ( $mode === 'advanced' ) {
					$mode = $field['translation'] ?? 'ignore';
				}

				$fields[ $mode ][] = $field['id'];
			}
		}

		return $fields;
	}

	/**
	 * Translate field value based on the translation mode.
	 *
	 * @param mixed  $meta   Field meta value.
	 * @param array  $args   Additional arguments for getting meta value.
	 * @param array  $field  Field parameters.
	 * @param object $object Current object being processed.
	 * @return mixed Translated meta value.
	 */
	public function translate_field_value( $meta, $args, $field, $object ) {
		// For testing, only process our test fields
		if ( ! in_array( $field['id'], self::TEST_FIELD_IDS ) ) {
			return $meta;
		}

		// Get current language and post language
		$current_language = pll_current_language();
		$post_language = isset( $object->ID ) ? pll_get_post_language( $object->ID ) : '';

		// If languages match, no translation needed
		if ( $current_language === $post_language || empty( $current_language ) || empty( $post_language ) ) {
			return $meta;
		}

		// Get field group settings
		$field_group_id = $field['field_group'] ?? 0;
		if ( ! $field_group_id ) {
			return $meta;
		}

		// Get translation mode from field group settings
		$translation_mode = $this->get_field_group_translation_mode( $field_group_id );

		// Handle based on translation mode
		switch ( $translation_mode ) {
			case 'translate':
				// Get translated value from the translated post
				$translated_post_id = $this->get_translated_post_id( $object->ID, $current_language );
				if ( $translated_post_id ) {
					$translated_meta = get_post_meta( $translated_post_id, $field['id'], true );
					if ( ! empty( $translated_meta ) ) {
						return $translated_meta;
					}
				}
				break;

			case 'copy':
				// Keep the same value across languages
				return $meta;

			case 'advanced':
				// Get field-specific translation mode
				$field_translation = $this->get_field_translation_mode( $field_group_id, $field['id'] );
				if ( $field_translation === 'translate' ) {
					$translated_post_id = $this->get_translated_post_id( $object->ID, $current_language );
					if ( $translated_post_id ) {
						$translated_meta = get_post_meta( $translated_post_id, $field['id'], true );
						if ( ! empty( $translated_meta ) ) {
							return $translated_meta;
						}
					}
				}
				break;

			case 'ignore':
			default:
				// Do nothing, return original value
				break;
		}

		return $meta;
	}

	/**
	 * Get translated post ID.
	 *
	 * @param int    $post_id  Original post ID.
	 * @param string $language Target language.
	 * @return int|false Translated post ID or false.
	 */
	private function get_translated_post_id( $post_id, $language ) {
		return pll_get_post( $post_id, $language );
	}
}
