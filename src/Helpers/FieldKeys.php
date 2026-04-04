<?php
namespace MBB\Helpers;

/**
 * Provides a registry of native field setting keys, extracted dynamically
 * from the Builder's field type definitions. Used by mbb-parser to detect
 * which JSON keys are "custom" (not native) during import.
 */
class FieldKeys {

	/**
	 * Cache: [ 'text' => ['id', 'name', 'std', ...], 'select' => [...], ... ]
	 *
	 * @var array<string, string[]>|null
	 */
	private static ?array $keys_by_type = null;

	/**
	 * Cache: union of all native keys across every field type.
	 *
	 * @var string[]|null
	 */
	private static ?array $all_keys = null;

	/**
	 * The already-instantiated Fields API instance, injected from bootstrap
	 * to avoid creating a duplicate instance (which would re-register REST routes).
	 *
	 * @var \MBB\RestApi\Fields|null
	 */
	private static ?\MBB\RestApi\Fields $fields_api = null;

	/**
	 * Inject the existing Fields REST API instance.
	 *
	 * Should be called once from bootstrap, right after the instance is created:
	 *   $fields = new RestApi\Fields( new Registry() );
	 *   Helpers\FieldKeys::init( $fields );
	 *
	 * @param \MBB\RestApi\Fields $fields_api
	 */
	public static function init( \MBB\RestApi\Fields $fields_api ): void {
		self::$fields_api = $fields_api;
	}

	/**
	 * Get native setting keys for a specific field type.
	 *
	 * @param string $field_type  E.g. 'text', 'select', 'email'.
	 * @return string[]
	 */
	public static function get_native_keys( string $field_type ): array {
		self::maybe_build();
		return self::$keys_by_type[ $field_type ] ?? [];
	}

	/**
	 * Get the union of all native setting keys across EVERY registered field type.
	 *
	 * Useful for building a global "known keys" list so that no native key
	 * from any field type ends up being classified as a custom setting.
	 *
	 * @return string[]
	 */
	public static function get_all_native_keys(): array {
		self::maybe_build();

		if ( self::$all_keys !== null ) {
			return self::$all_keys;
		}

		$merged = [];
		foreach ( self::$keys_by_type as $keys ) {
			$merged = array_merge( $merged, $keys );
		}

		self::$all_keys = array_values( array_unique( $merged ) );
		return self::$all_keys;
	}

	/**
	 * Build the cache lazily (only on first call).
	 */
	private static function maybe_build(): void {
		if ( self::$keys_by_type !== null ) {
			return;
		}
		self::$keys_by_type = self::build();
	}

	/**
	 * Extract all setting keys per field type from the Fields API.
	 *
	 * Uses the already-instantiated Fields API injected via init() to avoid
	 * creating a duplicate instance (which would re-register REST routes).
	 * Falls back to creating a fresh instance if init() was never called
	 * (e.g. in unit tests or standalone usage).
	 */
	private static function build(): array {
		if ( self::$fields_api !== null ) {
			$fields_api = self::$fields_api;
		} else {
			// Fallback: create a temporary instance (REST routes may be re-registered).
			$fields_api = new \MBB\RestApi\Fields( new \MBB\Registry() );
		}

		$field_types  = $fields_api->get_field_types();
		$keys_by_type = [];

		foreach ( $field_types as $type => $field_type ) {
			$keys = [];

			foreach ( $field_type['controls'] as $control ) {
				if ( ! is_array( $control ) || ! isset( $control['setting'] ) ) {
					continue;
				}

				// 1. The primary setting key mapped to JSON.
				$keys[] = $control['setting'];

				// 2. Compound controls (InputGroup) store actual JSON keys in props.
				//    e.g. minmax → min + max, prepend_append → prepend + append.
				$props = $control['props'] ?? [];
				if ( isset( $props['key1'] ) ) {
					$keys[] = $props['key1'];
				}
				if ( isset( $props['key2'] ) ) {
					$keys[] = $props['key2'];
				}
			}

			// 3. Expand special "virtual" controls whose setting key doesn't
			//    appear in JSON directly (only their sub-keys do).
			$keys = self::expand_virtual_keys( $keys );

			$keys_by_type[ $type ] = array_unique( $keys );
		}

		return $keys_by_type;
	}

	/**
	 * Some controls are "virtual" — their `setting` key in the Registry
	 * doesn't appear in JSON output. Expand them to the actual JSON keys.
	 *
	 * clone_settings → clone, sort_clone, clone_default, clone_as_multiple,
	 *                  min_clone, max_clone, add_button, clone_empty_start
	 * text_limiter   → limit, limit_type
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
