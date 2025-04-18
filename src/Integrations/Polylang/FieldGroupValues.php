<?php
namespace MBB\Integrations\Polylang;

use MBB\Control;

class FieldGroupValues {
	// Define test field IDs as constants
	const TEST_FIELD_IDS = [
		'text_field',
		'textarea_field',
		'wysiwyg_field'
	];

	const MODES = ['translate', 'copy', 'ignore'];

	public function __construct() {
		add_filter( 'mbb_settings_controls', [ $this, 'add_translation_control' ] );

		// Add filter to handle field value translations
		add_filter( 'rwmb_field_meta', [ $this, 'translate_field_value' ], 10, 4 );
	}

	public function add_translation_control( $controls ) {
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

	private function get_field_group_translation_mode( int $field_group_id ): string {
		$settings = get_post_meta( $field_group_id, 'settings', true );
		$mode     = $settings['translation'] ?? 'ignore';

		return in_array( $mode, self::MODES, true ) ? $mode : 'ignore';
	}

	private function get_field_translation_mode( int $field_group_id, string $field_id ): string {
		$settings = get_post_meta( $field_group_id, 'settings', true );
		$mode     = $settings['translations'][$field_id] ?? 'ignore';

		return in_array( $mode, self::MODES, true ) ? $mode : 'ignore';
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
