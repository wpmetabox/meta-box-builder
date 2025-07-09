<?php
namespace MBB\Extensions;

use MBB\Control;
use MetaBox\Support\Arr;

class AdminColumns {
	public function __construct() {
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
		add_filter( 'mbb_field_settings', [ $this, 'parse_field_settings' ] );
	}

	public function add_field_controls( array $controls, string $type ): array {
		if ( in_array( $type, [ 'button', 'custom_html', 'divider', 'heading', 'hidden', 'tab' ] ) ) {
			return $controls;
		}

		$controls[] = Control::AdminColumns( 'admin_columns', '', [
			'enable'     => false,
			'position'   => [
				'type'   => 'after',
				'column' => '',
			],
			'title'      => '',
			'before'     => '',
			'after'      => '',
			'searchable' => false,
			'filterable' => false,
			'sort'       => 'false',
			'link'       => 'false',
		], 'admin_columns' );

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
		if ( is_array( $admin_columns['position'] ) ) {
			$admin_columns['position'] = trim( implode( ' ', $admin_columns['position'] ) );
		}
		$admin_columns = array_filter( $admin_columns );
		if ( empty( $admin_columns ) ) {
			$admin_columns = true;
		}
		if ( is_array( $admin_columns ) && 1 === count( $admin_columns ) && isset( $admin_columns['position'] ) ) {
			$admin_columns = $admin_columns['position'];
		}

		return $settings;
	}
}
