<?php
namespace MBB\Helpers;

use MBB\RestApi\Fields;

/**
 * Provides native field setting keys per field type, used by mbb-parser to detect custom keys on import.
 */
class FieldKeys {

	/**
	 * @var array<string, string[]>|null Cache: [ type => [key, ...] ]
	 */
	private static ?array $keys_by_type = null;

	/**
	 * @var string[]|null Cache: union of all keys across every field type.
	 */
	private static ?array $all_keys = null;

	/**
	 * @var Fields|null
	 */
	private static ?Fields $fields_api = null;

	/**
	 * Inject the existing Fields instance.
	 */
	public static function init( Fields $fields_api ): void {
		self::$fields_api = $fields_api;
	}

	/**
	 * Get native keys for a specific field type (e.g. 'text', 'select').
	 */
	public static function get_native_keys( string $field_type ): array {
		self::maybe_build();
		return self::$keys_by_type[ $field_type ] ?? [];
	}

	/**
	 * Get the union of native keys across every registered field type.
	 */
	public static function get_all_native_keys(): array {
		self::maybe_build();

		if ( self::$all_keys !== null ) {
			return self::$all_keys;
		}

		self::$all_keys = array_values( array_unique( array_merge( ...array_values( self::$keys_by_type ) ) ) );
		return self::$all_keys;
	}

	/**
	 * Build the cache lazily.
	 */
	private static function maybe_build(): void {
		if ( self::$keys_by_type !== null ) {
			return;
		}
		self::$keys_by_type = self::build();
	}

	private static function build(): array {
		if ( self::$fields_api === null ) {
			return [];
		}

		$field_types  = self::$fields_api->get_field_types();
		$keys_by_type = [];

		foreach ( $field_types as $type => $field_type ) {
			$keys = [];

			foreach ( $field_type['controls'] ?? [] as $control ) {
				if ( ! is_array( $control ) || ! isset( $control['setting'] ) ) {
					continue;
				}

				$keys[] = $control['setting'];

				// Compound controls (InputGroup) expose actual JSON keys via props (e.g. min, max).
				$props = $control['props'] ?? [];
				if ( isset( $props['key1'] ) ) {
					$keys[] = $props['key1'];
				}
				if ( isset( $props['key2'] ) ) {
					$keys[] = $props['key2'];
				}
			}

			// Expand virtual control keys to their actual JSON sub-keys.
			$keys = self::expand_virtual_keys( $keys );

			$keys_by_type[ $type ] = array_unique( $keys );
		}

		return $keys_by_type;
	}

	/**
	 * Expand virtual control keys (e.g. clone_settings, text_limiter) to their actual JSON keys.
	 */
	private static function expand_virtual_keys( array $keys ): array {
		$virtual_map = [
			'clone_settings' => [
				'clone',
				'sort_clone',
				'clone_default',
				'clone_as_multiple',
				'min_clone',
				'max_clone',
				'add_button',
				'clone_empty_start',
			],
			'text_limiter'   => [ 'limit', 'limit_type' ],
		];

		$result = [];
		foreach ( $keys as $key ) {
			$result[] = $key;
			if ( isset( $virtual_map[ $key ] ) ) {
				foreach ( $virtual_map[ $key ] as $sub_key ) {
					$result[] = $sub_key;
				}
			}
		}

		return $result;
	}
}
