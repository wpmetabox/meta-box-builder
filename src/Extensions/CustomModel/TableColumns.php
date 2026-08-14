<?php
namespace MBB\Extensions\CustomModel;

use MBB\Helpers\TableSchema;
use MetaBox\CustomTable\API;
use MetaBox\CustomTable\Model\Factory;
use MetaBox\CustomTable\Model\Model;

class TableColumns {
	/**
	 * Model features that add protected table columns (see mb-custom-table TableSchema).
	 */
	private const SUPPORT_FEATURES = [ 'author', 'published_date', 'modified_date' ];

	/**
	 * Create or update a database table from editor column items.
	 *
	 * @param string $table        Table name.
	 * @param array  $column_items Editor column items.
	 * @param string $model_name   Optional model name (for supports columns via TableSchema).
	 * @return array{success: bool, message?: string, columns?: array<string, string>, keys?: string[]}
	 */
	public static function create( string $table, array $column_items, string $model_name = '' ): array {
		$table = TableSchema::sanitize_name( $table );
		if ( ! $table ) {
			return self::table_error();
		}

		// Register first so TableSchema can add AUTO_INCREMENT + supports columns on create.
		if ( $model_name && ! Factory::get( $model_name ) ) {
			mb_register_model( $model_name, [ 'table' => $table ] );
		}

		$parsed = TableSchema::parse_columns( $column_items );
		API::create( $table, $parsed['columns'], $parsed['keys'] );

		$inspected = self::inspect( $table, self::supports_for( $model_name ) );

		return [
			'success' => true,
			'message' => __( 'Table schema updated.', 'meta-box-builder' ),
			'columns' => $inspected['columns'],
			'keys'    => $inspected['keys'],
		];
	}

	/**
	 * List columns for a registered model.
	 *
	 * @return array{success: bool, message?: string, columns?: array<string, string>, keys?: string[]}
	 */
	public static function list_for_model( string $model_name, string $table = '' ): array {
		if ( $model_name ) {
			$model = Factory::get( $model_name );
			if ( $model && ! $table && ! empty( $model->table ) ) {
				$table = (string) $model->table;
			}
		}

		$table = TableSchema::sanitize_name( $table );
		if ( ! $table ) {
			return self::table_error();
		}

		$inspected = self::inspect( $table, self::supports_for( $model_name ) );

		return [
			'success' => true,
			'columns' => $inspected['columns'],
			'keys'    => $inspected['keys'],
		];
	}

	/**
	 * Read columns and indexes from a database table.
	 *
	 * @param string   $table    Table name.
	 * @param string[] $supports Model supports used to skip protected columns.
	 * @return array{columns: array<string, string>, keys: string[]}
	 */
	public static function inspect( string $table, array $supports = [] ): array {
		$protected = self::get_protected_columns( $supports );

		return [
			'columns' => array_diff_key( self::fetch( $table ), array_flip( $protected ) ),
			'keys'    => self::fetch_keys( $table ),
		];
	}

	/**
	 * Drop a column from a database table.
	 *
	 * @param string   $table    Table name.
	 * @param string   $column   Column name.
	 * @param string[] $supports Model supports used to skip protected columns.
	 * @return array{success: bool, message?: string, columns?: array<string, string>}
	 */
	public static function drop_table_column( string $table, string $column, array $supports = [] ): array {
		$column = TableSchema::sanitize_name( $column );
		$table  = TableSchema::sanitize_name( $table );

		if ( ! $column ) {
			return self::fail( __( 'Invalid column name.', 'meta-box-builder' ) );
		}

		if ( ! $table ) {
			return self::table_error();
		}

		$protected = self::get_protected_columns( $supports );

		if ( in_array( $column, $protected, true ) ) {
			return self::fail( __( 'This column cannot be dropped.', 'meta-box-builder' ) );
		}

		$db_columns = self::fetch( $table );
		if ( ! isset( $db_columns[ $column ] ) ) {
			return self::fail( __( 'This column does not exist in the database.', 'meta-box-builder' ) );
		}

		global $wpdb;

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- identifiers validated above.
		$result = $wpdb->query( "ALTER TABLE `{$table}` DROP COLUMN `{$column}`" );
		if ( false === $result ) {
			return self::fail( __( 'Could not drop the column from the database.', 'meta-box-builder' ) );
		}

		return [
			'success' => true,
			'message' => __( 'Column dropped from the database.', 'meta-box-builder' ),
			'columns' => array_diff_key( self::fetch( $table ), array_flip( $protected ) ),
		];
	}

	/**
	 * Read column definitions from the database table.
	 *
	 * @return array<string, string> Column name => SQL type.
	 */
	private static function fetch( string $table ): array {
		global $wpdb;

		if ( ! self::table_exists( $table ) ) {
			return [];
		}

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name from parsed model settings.
		$rows = $wpdb->get_results( "SHOW COLUMNS FROM `{$table}`", ARRAY_A );
		if ( ! is_array( $rows ) ) {
			return [];
		}

		$columns = [];
		foreach ( $rows as $row ) {
			$name = (string) ( $row['Field'] ?? '' );
			$type = (string) ( $row['Type'] ?? '' );
			if ( ! $name || ! $type ) {
				continue;
			}
			$columns[ $name ] = strtoupper( $type );
		}

		return $columns;
	}

	/**
	 * Read non-primary index column names from the database table.
	 *
	 * @return string[]
	 */
	private static function fetch_keys( string $table ): array {
		global $wpdb;

		if ( ! self::table_exists( $table ) ) {
			return [];
		}

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name from parsed model settings.
		$rows = $wpdb->get_results( "SHOW INDEX FROM `{$table}`", ARRAY_A );
		if ( ! is_array( $rows ) ) {
			return [];
		}

		$rows = array_filter(
			$rows,
			static function ( array $row ): bool {
				return ! empty( $row['Column_name'] ) && 'PRIMARY' !== ( $row['Key_name'] ?? '' );
			}
		);

		return array_values( array_unique( array_column( $rows, 'Column_name' ) ) );
	}

	public static function table_exists( string $table ): bool {
		global $wpdb;

		$like = $wpdb->esc_like( $table );

		return $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $like ) ) === $table;
	}

	/**
	 * Get column names that cannot be dropped or listed.
	 *
	 * @param string[] $supports Model support features.
	 * @return string[]
	 */
	private static function get_protected_columns( array $supports = [] ): array {
		return array_merge(
			[ 'ID' ],
			array_values( array_intersect( self::SUPPORT_FEATURES, $supports ) )
		);
	}

	/**
	 * Resolve model supports from a registered model name.
	 *
	 * @param string $model_name Model slug.
	 * @return string[]
	 */
	public static function supports_for( string $model_name ): array {
		$model_name = trim( $model_name );
		if ( '' === $model_name ) {
			return [];
		}

		$model = Factory::get( $model_name );
		if ( ! $model instanceof Model ) {
			return [];
		}

		$features = [];
		foreach ( self::SUPPORT_FEATURES as $feature ) {
			if ( $model->supports( $feature ) ) {
				$features[] = $feature;
			}
		}

		return $features;
	}

	private static function table_error(): array {
		return self::fail( __( 'Could not resolve the model table.', 'meta-box-builder' ) );
	}

	private static function fail( string $message ): array {
		return [
			'success' => false,
			'message' => $message,
		];
	}
}
