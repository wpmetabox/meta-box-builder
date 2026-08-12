<?php
namespace MBB\Extensions\CustomModel;

use MetaBox\Support\Arr;

class TableColumns {
	/**
	 * List columns in the model table from the database.
	 *
	 * @return array{success: bool, message?: string, columns?: array<string, string>}
	 */
	public static function list_for_post( int $post_id ): array {
		$settings = self::get_settings( $post_id );
		$table    = self::resolve_table_name( $settings );

		if ( null === $table ) {
			return [
				'success' => false,
				'message' => __( 'Could not resolve the model table.', 'meta-box-builder' ),
			];
		}

		return [
			'success' => true,
			'columns' => self::filter_protected( self::fetch( $table ), $settings ),
		];
	}

	/**
	 * Drop a column from the model table.
	 *
	 * @return array{success: bool, message?: string, columns?: array<string, string>}
	 */
	public static function drop( int $post_id, string $column ): array {
		$column = str_replace( '-', '_', sanitize_key( $column ) );
		if ( '' === $column ) {
			return [
				'success' => false,
				'message' => __( 'Invalid column name.', 'meta-box-builder' ),
			];
		}

		$post = get_post( $post_id );
		if ( ! $post || 'mb-model' !== $post->post_type ) {
			return [
				'success' => false,
				'message' => __( 'The custom model might have been deleted. Please refresh the page and try again.', 'meta-box-builder' ),
			];
		}

		$settings = self::get_settings( $post_id );
		if ( self::is_protected( $column, $settings ) ) {
			return [
				'success' => false,
				'message' => __( 'This column cannot be dropped.', 'meta-box-builder' ),
			];
		}

		$table = self::resolve_table_name( $settings );
		if ( null === $table ) {
			return [
				'success' => false,
				'message' => __( 'Could not resolve the model table.', 'meta-box-builder' ),
			];
		}

		$db_columns = self::fetch( $table );
		if ( ! isset( $db_columns[ $column ] ) ) {
			return [
				'success' => false,
				'message' => __( 'This column does not exist in the database.', 'meta-box-builder' ),
			];
		}

		global $wpdb;

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- identifiers validated above.
		$result = $wpdb->query( "ALTER TABLE `{$table}` DROP COLUMN `{$column}`" );
		if ( false === $result ) {
			return [
				'success' => false,
				'message' => __( 'Could not drop the column from the database.', 'meta-box-builder' ),
			];
		}

		return [
			'success' => true,
			'message' => __( 'Column dropped from the database.', 'meta-box-builder' ),
			'columns' => self::filter_protected( self::fetch( $table ), $settings ),
		];
	}

	/**
	 * @return array<string, mixed>
	 */
	private static function get_settings( int $post_id ): array {
		$settings = get_post_meta( $post_id, 'settings', true );

		return is_array( $settings ) ? $settings : [];
	}

	private static function resolve_table_name( array $settings ): ?string {
		if ( empty( $settings['table'] ) ) {
			return null;
		}

		$parser = new Parser( $settings );
		$parser->parse();
		$table = (string) ( $parser->get_settings()['table'] ?? '' );

		return '' !== $table ? $table : null;
	}

	/**
	 * Read column definitions from the database table.
	 *
	 * @return array<string, string> Column name => SQL type.
	 */
	private static function fetch( string $table ): array {
		global $wpdb;

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name from parsed model settings.
		$exists = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) );
		if ( $exists !== $table ) {
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
			if ( '' === $name || '' === $type ) {
				continue;
			}
			$columns[ $name ] = strtoupper( $type );
		}

		return $columns;
	}

	private static function is_protected( string $column, array $settings ): bool {
		return in_array( $column, self::get_protected_columns( $settings ), true );
	}

	/**
	 * Remove protected columns from a column list.
	 *
	 * @param array<string, string> $columns  Column name => SQL type.
	 * @param array                 $settings Model settings.
	 *
	 * @return array<string, string>
	 */
	private static function filter_protected( array $columns, array $settings ): array {
		foreach ( self::get_protected_columns( $settings ) as $column ) {
			unset( $columns[ $column ] );
		}

		return $columns;
	}

	/**
	 * Get column names that cannot be dropped or listed.
	 *
	 * @param array $settings Model settings.
	 *
	 * @return string[]
	 */
	private static function get_protected_columns( array $settings ): array {
		$protected = [ 'ID' ];

		$supports = Arr::get( $settings, 'supports', [] );
		if ( ! is_array( $supports ) ) {
			$supports = [];
		}

		foreach ( [ 'author', 'published_date', 'modified_date' ] as $column ) {
			if ( in_array( $column, $supports, true ) ) {
				$protected[] = $column;
			}
		}

		return $protected;
	}
}
