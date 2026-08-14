<?php
namespace MBB\Helpers;

class TableSchema {
	/**
	 * Sanitize a table or column name and optionally prepend $wpdb->prefix.
	 */
	public static function apply_prefix( string $name, $use_prefix = false ): string {
		$name = self::sanitize_name( $name );
		if ( '' === $name || ! $use_prefix ) {
			return $name;
		}

		global $wpdb;
		return $wpdb->prefix . $name;
	}

	/**
	 * Resolve a model table name from field-group settings.
	 *
	 * Prefers the live Factory model, then falls back to stored custom_table.name.
	 *
	 * @param array<string, mixed> $settings Field group settings.
	 */
	public static function resolve_model_table( array $settings ): string {
		$models = array_filter( (array) ( $settings['models'] ?? [] ) );
		$first  = reset( $models );

		if ( $first && class_exists( \MetaBox\CustomTable\Model\Factory::class ) ) {
			$model = \MetaBox\CustomTable\Model\Factory::get( $first );
			if ( $model && ! empty( $model->table ) ) {
				return self::sanitize_name( (string) $model->table );
			}
		}

		return self::resolve_custom_table( (array) ( $settings['custom_table'] ?? [] ) );
	}

	/**
	 * Resolve a field group custom table name (not model location).
	 */
	public static function resolve_custom_table( array $custom_table ): string {
		return self::apply_prefix(
			(string) ( $custom_table['name'] ?? '' ),
			! empty( $custom_table['prefix'] )
		);
	}

	/**
	 * Resolve the database table for a Builder custom model from stored settings.
	 */
	public static function resolve_model_table_from_settings( array $settings ): string {
		return self::apply_prefix(
			(string) ( $settings['table'] ?? '' ),
			! empty( $settings['prefix'] )
		);
	}

	/**
	 * Parse editor column items into SQL column definitions and index keys.
	 *
	 * @param array $column_items List or map of { name, type, custom_type, index }.
	 * @return array{columns: array<string, string>, keys: string[]}
	 */
	public static function parse_columns( array $column_items ): array {
		$columns = [];
		$keys    = [];

		foreach ( $column_items as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}

			$name = self::sanitize_name( (string) ( $item['name'] ?? '' ) );
			if ( ! $name || 'id' === $name ) {
				continue;
			}

			$type = (string) ( $item['type'] ?? 'TEXT' );
			if ( 'custom' === $type ) {
				$type = trim( (string) ( $item['custom_type'] ?? '' ) );
			}
			$type = self::sanitize_column_type( $type ) ?: 'TEXT';

			$columns[ $name ] = $type;

			if ( ! empty( $item['index'] ) && self::is_indexable( $type ) ) {
				$keys[] = $name;
			}
		}

		return [
			'columns' => $columns,
			'keys'    => array_values( array_unique( $keys ) ),
		];
	}

	public static function sanitize_name( string $name ): string {
		return str_replace( '-', '_', sanitize_key( $name ) );
	}

	public static function sanitize_column_type( string $type ): string {
		$type = preg_replace( '/[^a-zA-Z0-9_(),\s\']/', '', $type );
		return is_string( $type ) ? trim( $type ) : '';
	}

	public static function is_indexable( string $type ): bool {
		return ! str_contains( strtoupper( $type ), 'TEXT' );
	}
}
