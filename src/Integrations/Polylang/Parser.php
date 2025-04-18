<?php
namespace MBB\Integrations\Polylang;

class Parser {
	const MODES = [ 'translate', 'copy', 'ignore' ];
	private $fields_translations = [];

	public function __construct() {
		add_filter( 'mbb_meta_box_settings', [ $this, 'parse_translation_settings' ] );
	}

	/**
	 * Parse translation settings for field groups and fields
	 *
	 * @param array $settings Meta box settings
	 * @return array Modified meta box settings
	 */
	public function parse_translation_settings( array $settings ): array {
		// Don't parse settings per field if the translation mode for the field group is not 'advanced'.
		if ( empty( $settings['translation'] ) || $settings['translation'] !== 'advanced' ) {
			return $settings;
		}

		// Store fields' translations for later parsing
		if ( ! empty( $settings['fields_translations'] ) && is_string( $settings['fields_translations'] ) ) {
			$this->fields_translations = json_decode( wp_unslash( $settings['fields_translations'] ), true );
			if ( json_last_error() !== JSON_ERROR_NONE ) {
				$this->fields_translations = [];
			}
			unset( $settings['fields_translations'] );
		}

		// Process fields to add translation settings
		if ( isset( $settings['fields'] ) && is_array( $settings['fields'] ) ) {
			$this->process_fields( $settings['fields'] );
		}

		return $settings;
	}

	/**
	 * Process fields to add translation settings
	 *
	 * @param array &$fields Fields to process
	 */
	private function process_fields( &$fields ) {
		foreach ( $fields as &$field ) {
			$this->process_field( $field );
		}
	}

	/**
	 * Process a single field to add translation settings
	 *
	 * @param array &$field Field to process
	 */
	private function process_field( &$field ) {
		// Add translation setting if it exists in fields_translations
		if ( isset( $field['id'] ) && isset( $this->fields_translations[ $field['id'] ] ) ) {
			$translation_mode = $this->fields_translations[ $field['id'] ];
			if ( in_array( $translation_mode, self::MODES, true ) ) {
				$field['translation'] = $translation_mode;
			}
		}

		// Process nested fields if they exist
		// if ( isset( $field['fields'] ) && is_array( $field['fields'] ) ) {
		// 	$this->process_fields( $field['fields'] );
		// }
	}
}