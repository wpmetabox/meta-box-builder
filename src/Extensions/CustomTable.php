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
		$is_model = ! empty( $settings['models'] ) || 'model' === ( $settings['object_type'] ?? '' );

		if ( $is_model ) {
			$this->create_for_model( $data, $settings );
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

		$this->create_table( $table, $settings, $data['fields'] ?? [] );
	}

	/**
	 * Create/update a code-model table from field-group settings when opted in.
	 * Builder-managed models own their schema — skip those here.
	 */
	private function create_for_model( array &$data, array $settings ): void {
		$custom_table = (array) ( $settings['custom_table'] ?? [] );
		if ( empty( $custom_table['enable'] ) || empty( $custom_table['create'] ) ) {
			return;
		}

		$models = array_filter( (array) ( $settings['models'] ?? [] ) );
		$first  = reset( $models );
		if ( $first && $this->is_builder_model( (string) $first ) ) {
			return;
		}

		$table = TableSchema::resolve_model_table( $settings );
		if ( '' === $table ) {
			return;
		}

		Arr::set( $data, 'meta_box.table', $table );

		$this->create_table( $table, $settings, $data['fields'] ?? [] );
	}

	/**
	 * Whether the model is managed by MB Builder (has an mb-model post).
	 */
	private function is_builder_model( string $name ): bool {
		$cache = get_option( 'mbb_models', [] );
		if ( ! is_array( $cache ) ) {
			return false;
		}

		return ! empty( $cache[ $name ]['post_id'] );
	}

	/**
	 * Build columns and create or update the database table.
	 *
	 * @param string               $table    Table name.
	 * @param array<string, mixed> $settings Field group settings.
	 * @param array                $fields   Field list.
	 */
	private function create_table( string $table, array $settings, array $fields ): void {
		if ( '' === $table ) {
			return;
		}

		$parsed  = TableSchema::parse_columns( (array) Arr::get( $settings, 'custom_table.columns', [] ) );
		$columns = $parsed['columns'];
		$keys    = $parsed['keys'];

		// Backward compatible: no configured schema → TEXT columns from field IDs.
		if ( empty( $columns ) ) {
			$id_prefix = Arr::get( $settings, 'prefix' );
			$fields    = array_filter( $fields, [ $this, 'has_value' ] );
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
