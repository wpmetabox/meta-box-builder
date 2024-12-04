<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;
use MetaBox\Support\Arr;

class Columns {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-columns' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
		add_filter( 'mbb_field_settings', [ $this, 'parse_field_settings' ] );
	}

	public function add_field_controls( array $controls, string $type ): array {
		if ( in_array( $type, [ 'tab' ] ) ) {
			return $controls;
		}

		$control = Control::Range( 'columns', [
			'label'       => __( 'Columns', 'meta-box-builder' ),
			'description' => __( 'Select number of columns for this field in a 12-column grid.', 'meta-box-builder' ),
		], 12, 'appearance' );

		return Control::insert_before( $controls, 'class', $control );
	}

	public function parse_field_settings( $settings ) {
		if ( 12 == Arr::get( $settings, 'columns', 12 ) ) {
			unset( $settings['columns'] );
		}
		return $settings;
	}
}
