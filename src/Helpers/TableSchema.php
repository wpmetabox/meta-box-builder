<?php
namespace MBB\Helpers;

class TableSchema {
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
