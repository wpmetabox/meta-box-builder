<?php

namespace MBB\Extensions;

use MetaBox\CustomTable\API;
use MetaBox\Support\Arr;
use MBB\Helpers\TableSchema;
use MBB\LocalJson;

class CustomTable {
	public function __construct() {
		add_action( 'mbb_after_save', [ $this, 'create_custom_table_after_save' ], 10, 3 );

		if ( LocalJson::is_enabled() ) {
			add_action( 'mbb_before_register_meta_box', [ $this, 'create_custom_table' ] );
		}
	}

	public function create_custom_table_after_save( $parser, $post_id, $submitted_data ): void {
		$this->create_custom_table( $submitted_data );
	}

	/**
	 * Create custom table
	 *
	 * @param array $data Must be either full data for a field group, or full unparsed data for a local JSON file.
	 *                    This data must contains: `settings.custom_table` settings (enable, create, name, prefix) and `fields` array.
	 * @return void
	 */
	public function create_custom_table( array &$data ): void {
		$settings = $data['settings'] ?? [];

		// Models own the table schema — do not auto-create TEXT columns from field IDs.
		if ( ! empty( $settings['models'] ) || 'model' === ( $settings['object_type'] ?? '' ) ) {
			return;
		}

		if ( ! Arr::get( $settings, 'custom_table.enable' ) || ! Arr::get( $settings, 'custom_table.create' ) ) {
			return;
		}

		$table = Arr::get( $settings, 'custom_table.name' );
		if ( Arr::get( $settings, 'custom_table.prefix' ) ) {
			global $wpdb;
			$table = $wpdb->prefix . $table;
			Arr::set( $data, 'meta_box.table', $table );
		}

		$parsed  = TableSchema::parse_columns( (array) Arr::get( $settings, 'custom_table.columns', [] ) );
		$columns = $parsed['columns'];
		$keys    = $parsed['keys'];

		// Backward compatible: no configured schema → TEXT columns from field IDs.
		if ( empty( $columns ) ) {
			$id_prefix = Arr::get( $settings, 'prefix' );
			$fields    = array_filter( $data['fields'] ?? [], [ $this, 'has_value' ] );
			foreach ( $fields as $field ) {
				$columns[ $id_prefix . $field['id'] ] = 'TEXT';
			}
			$keys = [];
		}

		$cache_data = [
			'table'   => $table,
			'columns' => $columns,
			'keys'    => $keys,
		];
		$cache_key  = 'mb_create_table_' . md5( wp_json_encode( $cache_data ) );
		// Cache the table creation in production environment only.
		if ( get_transient( $cache_key ) !== false && wp_get_environment_type() === 'production' ) {
			return;
		}

		API::create( $table, $columns, $keys );
		set_transient( $cache_key, 1, MONTH_IN_SECONDS );
	}

	private function has_value( $field ): bool {
		return ! empty( $field['id'] ) && ! in_array( $field['type'], [ 'heading', 'divider', 'button', 'custom_html', 'tab' ], true );
	}
}
