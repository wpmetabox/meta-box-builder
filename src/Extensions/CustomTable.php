<?php

namespace MBB\Extensions;

use MetaBox\Support\Arr;

class CustomTable {
	public function __construct() {
		add_filter( 'mbb_after_save', [ $this, 'create_custom_table' ], 10, 3 );
	}

	public function create_custom_table( $parser, $post_id, $raw_data ): void {
		global $wpdb;

		$settings = $raw_data['settings'];
		if ( ! Arr::get( $settings, 'custom_table.enable' ) || ! Arr::get( $settings, 'custom_table.create' ) ) {
			return;
		}

		$table = Arr::get( $settings, 'custom_table.name' );
		if ( Arr::get( $settings, 'custom_table.prefix' ) ) {
			$table = $wpdb->prefix . $table;
		}

		$columns = [];
		$fields  = array_filter( $raw_data['fields'], [ $this, 'has_value' ] );
		foreach ( $fields as $field ) {
			$columns[ $field['id'] ] = 'TEXT';
		}

		$data      = [
			'table'   => $table,
			'columns' => $columns,
		];
		$cache_key = 'mb_create_table_' . md5( wp_json_encode( $data ) );
		if ( get_transient( $cache_key ) !== false ) {
			return;
		}

		\MB_Custom_Table_API::create( $table, $columns );
		set_transient( $cache_key, 1, MONTH_IN_SECONDS );
	}

	private function has_value( $field ): bool {
		return ! empty( $field['id'] ) && ! in_array( $field['type'], [ 'heading', 'divider', 'button', 'custom_html', 'tab' ], true );
	}
}