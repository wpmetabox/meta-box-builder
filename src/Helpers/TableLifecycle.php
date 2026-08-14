<?php
namespace MBB\Helpers;

use MBB\Extensions\CustomModel\TableColumns;
use MetaBox\Support\Arr;
use WP_Post;

class TableLifecycle {
	public function __construct() {
		add_action( 'before_delete_post', [ $this, 'maybe_drop_table' ], 10, 1 );
	}

	public function maybe_drop_table( int $post_id ): void {
		$post = get_post( $post_id );
		if ( ! $post instanceof WP_Post ) {
			return;
		}

		if ( 'mb-model' === $post->post_type ) {
			$this->maybe_drop_model_table( $post_id );
			return;
		}

		if ( 'meta-box' === $post->post_type ) {
			$this->maybe_drop_field_group_table( $post_id );
		}
	}

	private function maybe_drop_model_table( int $post_id ): void {
		$settings = get_post_meta( $post_id, 'settings', true );
		if ( ! is_array( $settings ) || empty( $settings['drop_table_on_delete'] ) ) {
			return;
		}

		self::drop_table( TableSchema::resolve_model_table_from_settings( $settings ) );
	}

	private function maybe_drop_field_group_table( int $post_id ): void {
		$settings = get_post_meta( $post_id, 'settings', true );
		if ( ! is_array( $settings ) ) {
			return;
		}

		$custom_table = (array) Arr::get( $settings, 'custom_table', [] );
		if ( empty( $custom_table['drop_on_delete'] ) || empty( $custom_table['enable'] ) ) {
			return;
		}

		$object_type = (string) Arr::get( $settings, 'object_type', 'post' );
		if ( 'model' === $object_type ) {
			$models = array_filter( (array) Arr::get( $settings, 'models', [] ) );
			$first  = reset( $models );
			if ( $first && $this->is_builder_model( (string) $first ) ) {
				return;
			}
			$table = TableSchema::resolve_model_table( $settings );
		} else {
			if ( empty( $custom_table['create'] ) ) {
				return;
			}
			$table = TableSchema::resolve_custom_table( $custom_table );
		}

		self::drop_table( $table );
	}

	public static function drop_table( string $table ): bool {
		$table = TableSchema::sanitize_name( $table );
		if ( '' === $table || ! TableColumns::table_exists( $table ) ) {
			return false;
		}

		global $wpdb;

		// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- table name validated above.
		$result = $wpdb->query( "DROP TABLE IF EXISTS `{$table}`" );

		return false !== $result;
	}

	private function is_builder_model( string $name ): bool {
		$cache = get_option( 'mbb_models', [] );
		if ( ! is_array( $cache ) ) {
			return false;
		}

		return ! empty( $cache[ $name ]['post_id'] );
	}
}
