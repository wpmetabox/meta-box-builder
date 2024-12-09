<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;
use MetaBox\Support\Arr;

class AdminColumns {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-admin-columns' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
		add_filter( 'mbb_field_settings', [ $this, 'parse_field_settings' ] );
	}

	public function add_field_controls( array $controls, string $type ): array {
		if ( in_array( $type, [ 'button', 'custom_html', 'divider', 'heading', 'hidden', 'tab' ] ) ) {
			return $controls;
		}

		$controls[] = Control::Toggle( 'admin_columns_enable', [
			'name'    => 'admin_columns[enable]',
			'label'   => __( 'Show as an admin column', 'meta-box-builder' ),
			'tooltip' => __( 'Show this field as a column in the All posts/terms/users table list in the admin area', 'meta-box-builder' ),
		], false, 'admin_columns' );
		$controls[] = Control::AdminColumnsPosition( 'admin_columns_position', [
			'name'       => 'admin_columns[position]',
			'className'  => 'og-admin-columns-position',
			'label'      => __( 'Position', 'meta-box-builder' ),
			'tooltip'    => __( 'Where to show the column in the table', 'meta-box-builder' ),
			'dependency' => 'admin_columns_enable:true',
		], ['type' => 'after', 'column' => ''], 'admin_columns' );
		$controls[] = Control::Input( 'admin_columns_title', [
			'name'        => 'admin_columns[title]',
			'label'       => __( 'Title', 'meta-box-builder' ),
			'description' => __( 'Leave empty to use the field name.', 'meta-box-builder' ),
			'dependency'  => 'admin_columns_enable:true',
		], '', 'admin_columns' );
		$controls[] = Control::Input( 'admin_columns_before', [
			'name'        => 'admin_columns[before]',
			'label'       => __( 'Content before', 'meta-box-builder' ),
			'description' => __( 'Custom HTML outputted before the column content.', 'meta-box-builder' ),
			'dependency'  => 'admin_columns_enable:true',
		], '', 'admin_columns' );
		$controls[] = Control::Input( 'admin_columns_after', [
			'name'        => 'admin_columns[after]',
			'label'       => __( 'Content after', 'meta-box-builder' ),
			'description' => __( 'Custom HTML outputted after the column content.', 'meta-box-builder' ),
			'dependency'  => 'admin_columns_enable:true',
		], '', 'admin_columns' );
		$controls[] = Control::Toggle( 'admin_columns_searchable', [
			'name'       => 'admin_columns[searchable]',
			'label'      => __( 'Searchable', 'meta-box-builder' ),
			'tooltip'    => __( 'Allow to search posts by field values', 'meta-box-builder' ),
			'dependency' => 'admin_columns_enable:true',
		], false, 'admin_columns' );
		$controls[] = Control::Toggle( 'admin_columns_filterable', [
			'name'       => 'admin_columns[filterable]',
			'label'      => __( 'Filterable', 'meta-box-builder' ),
			'tooltip'    => __( 'Allow to filter posts by custom taxonomy, applied only if the field is a taxonomy field', 'meta-box-builder' ),
			'dependency' => 'admin_columns_enable:true',
		], false, 'admin_columns' );
		$controls[] = Control::ToggleGroup( 'admin_columns_sort', [
			'name'       => 'admin_columns[sort]',
			'label'      => __( 'Sortable', 'meta-box-builder' ),
			'tooltip'    => __( 'Whether to sort the column by field values', 'meta-box-builder' ),
			'options'    => [
				'true'    => __( 'Yes', 'meta-box-builder' ),
				'numeric' => __( 'Yes (as number)', 'meta-box-builder' ),
				'false'   => __( 'No', 'meta-box-builder' ),
			],
			'dependency' => 'admin_columns_enable:true',
		], 'false', 'admin_columns' );
		$controls[] = Control::ToggleGroup( 'admin_columns_link', [
			'name'       => 'admin_columns[link]',
			'label'      => __( 'Item link type', 'meta-box-builder' ),
			'tooltip'    => __( 'The link for the items displayed in the admin column.', 'meta-box-builder' ),
			'options'    => [
				'false' => __( 'No link', 'meta-box-builder' ),
				'view'  => __( 'View', 'meta-box-builder' ),
				'edit'  => __( 'Edit', 'meta-box-builder' ),
			],
			'dependency' => 'admin_columns_enable:true',
		], 'false', 'admin_columns' );

		return $controls;
	}

	public function parse_field_settings( $settings ) {
		$enable = Arr::get( $settings, 'admin_columns.enable', false );
		if ( ! $enable ) {
			unset( $settings['admin_columns'] );
			return $settings;
		}

		$admin_columns = &$settings['admin_columns'];
		unset( $admin_columns['enable'] );
		$admin_columns['position'] = trim( implode( ' ', $admin_columns['position'] ) );
		$admin_columns             = array_filter( $admin_columns );
		if ( empty( $admin_columns ) ) {
			$admin_columns = true;
		}
		if ( 1 === count( $admin_columns ) && isset( $admin_columns['position'] ) ) {
			$admin_columns = $admin_columns['position'];
		}

		return $settings;
	}
}
