<?php
namespace MBB\Extensions\CustomModel;

use MBB\Helpers\TableSchema;
use MetaBox\CustomTable\Model\Factory;
use MetaBox\Support\Arr;

class TableColumns {
	/**
	 * List columns for a registered model.
	 *
	 * @return array{success: bool, message?: string, columns?: array<string, string>, keys?: string[]}
	 */
	public static function list_for_model( string $model_name, string $table = '' ): array {
		$supports = [];

		if ( $model_name ) {
			$model = Factory::get( $model_name );
			if ( $model ) {
				if ( ! $table && ! empty( $model->table ) ) {
					$table = (string) $model->table;
				}
				if ( isset( $model->supports ) && is_array( $model->supports ) ) {
					$supports = $model->supports;
				}
			}
		}

		$table = TableSchema::sanitize_name( $table );
		if ( ! $table ) {
			return [
				'success' => false,
				'message' => __( 'Could not resolve the model table.', 'meta-box-builder' ),
			];
		}

		$inspected = self::inspect( $table, $supports );

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
		$settings = [ 'supports' => $supports ];

		return [
			'columns' => self::filter_protected( self::fetch( $table ), $settings ),
			'keys'    => self::fetch_keys( $table ),
		];
	}

	/**
	 * Drop a column from a Builder-managed model table.
	 *
	 * @return array{success: bool, message?: string, columns?: array<string, string>}
	 */
	public static function drop( int $post_id, string $column ): array {
		$post = get_post( $post_id );
		if ( ! $post || 'mb-model' !== $post->post_type ) {
			return [
				'success' => false,
				'message' => __( 'The custom model might have been deleted. Please refresh the page and try again.', 'meta-box-builder' ),
			];
		}

		$settings = self::get_settings( $post_id );
		$table    = self::resolve_table_name( $settings );
		if ( ! $table ) {
			return [
				'success' => false,
				'message' => __( 'Could not resolve the model table.', 'meta-box-builder' ),
			];
		}

		return self::drop_table_column( $table, $column, self::get_protected_columns( $settings ) );
	}

	/**
	 * Drop a column from a database table.
	 *
	 * @param string   $table             Table name.
	 * @param string   $column            Column name.
	 * @param string[] $protected_columns Column names that cannot be dropped.
	 * @return array{success: bool, message?: string, columns?: array<string, string>}
	 */
	public static function drop_table_column( string $table, string $column, array $protected_columns = [ 'ID' ] ): array {
		$column = TableSchema::sanitize_name( $column );
		$table  = TableSchema::sanitize_name( $table );

		if ( ! $column ) {
			return [
				'success' => false,
				'message' => __( 'Invalid column name.', 'meta-box-builder' ),
			];
		}

		if ( ! $table ) {
			return [
				'success' => false,
				'message' => __( 'Could not resolve the model table.', 'meta-box-builder' ),
			];
		}

		if ( in_array( $column, $protected_columns, true ) ) {
			return [
				'success' => false,
				'message' => __( 'This column cannot be dropped.', 'meta-box-builder' ),
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
			'columns' => array_diff_key( self::fetch( $table ), array_flip( $protected_columns ) ),
		];
	}

	/**
	 * Get raw model settings for a Builder-managed model post.
	 *
	 * @return array<string, mixed>
	 */
	private static function get_settings( int $post_id ): array {
		$settings = get_post_meta( $post_id, 'settings', true );

		return is_array( $settings ) ? $settings : [];
	}

	private static function resolve_table_name( array $settings ): string {
		if ( empty( $settings['table'] ) ) {
			return '';
		}

		$parser = new Parser( $settings );
		$parser->parse();

		return (string) ( $parser->get_settings()['table'] ?? '' );
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

	private static function table_exists( string $table ): bool {
		global $wpdb;

		$like = $wpdb->esc_like( $table );

		return $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $like ) ) === $table;
	}

	private static function filter_protected( array $columns, array $settings ): array {
		return array_diff_key( $columns, array_flip( self::get_protected_columns( $settings ) ) );
	}

	/**
	 * Get column names that cannot be dropped or listed.
	 *
	 * @return string[]
	 */
	private static function get_protected_columns( array $settings ): array {
		$supports = Arr::get( $settings, 'supports', [] );
		if ( ! is_array( $supports ) ) {
			$supports = [];
		}

		return array_merge(
			[ 'ID' ],
			array_values( array_intersect( [ 'author', 'published_date', 'modified_date' ], $supports ) )
		);
	}
}
