<?php
namespace MBB\Helpers;

use MBB\Extensions\CustomModel\Parser;
use MetaBox\Support\Arr;

class TableSchema {
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
				// Keep the model table name as registered (API only normalizes hyphens).
				return str_replace( '-', '_', (string) $model->table );
			}
		}

		$custom_table = (array) ( $settings['custom_table'] ?? [] );
		$name         = (string) ( $custom_table['name'] ?? '' );
		if ( '' === $name ) {
			return '';
		}

		if ( ! empty( $custom_table['prefix'] ) ) {
			global $wpdb;
			$name = $wpdb->prefix . $name;
		}

		return str_replace( '-', '_', $name );
	}

	/**
	 * Resolve the database table for a field group from its settings.
	 */
	public static function resolve_field_group_table( array $settings ): string {
		$object_type = (string) Arr::get( $settings, 'object_type', 'post' );
		if ( 'model' === $object_type || ! empty( $settings['models'] ) ) {
			return self::sanitize_name( self::resolve_model_table( $settings ) );
		}

		$custom_table = (array) Arr::get( $settings, 'custom_table', [] );
		if ( empty( $custom_table['enable'] ) ) {
			return '';
		}

		return self::resolve_custom_table( $custom_table );
	}

	/**
	 * Resolve a field group custom table name (not model location).
	 */
	public static function resolve_custom_table( array $custom_table ): string {
		$name = (string) ( $custom_table['name'] ?? '' );
		if ( '' === $name ) {
			return '';
		}

		if ( ! empty( $custom_table['prefix'] ) ) {
			global $wpdb;
			$name = $wpdb->prefix . $name;
		}

		return self::sanitize_name( $name );
	}

	/**
	 * Resolve the database table for a Builder custom model from stored settings.
	 */
	public static function resolve_model_table_from_settings( array $settings ): string {
		$parser = new Parser( $settings );
		$parser->parse();
		$model = $parser->get_settings();

		return self::sanitize_name( (string) ( $model['table'] ?? '' ) );
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
		$type = preg_replace( '/[^a-zA-Z0-9_(),\s]/', '', $type );
		return is_string( $type ) ? trim( $type ) : '';
	}

	public static function is_indexable( string $type ): bool {
		return ! str_contains( strtoupper( $type ), 'TEXT' );
	}
}
