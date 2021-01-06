<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;
use MBB\Helpers\Arr;

class Columns {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-columns' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_controls' ] );
		add_filter( 'mbb_parsed_field', [ $this, 'parse_field' ] );
	}

	public function add_controls( $fields ) {
		foreach ( $fields as &$controls ) {
			$controls['general']['columns'] = Control::Select( [
				'label'      => '<a href="https://metabox.io/plugins/meta-box-columns/" target="_blank" rel="nofollow noopenner">' . __( 'Columns', 'meta-box-builder' ) . '</a>',
				'tooltip'    => __( 'Select number of columns for this field in a 12-column grid', 'meta-box-builder' ),
				'options'    => array_combine( range( 1, 12 ), range( 1, 12 ) ),
			], 12 );
		}

		return $fields;
	}

	public function parse_field( $settings ) {
		if ( 12 == Arr::get( $settings, 'columns', 12 ) ) {
			unset( $settings['columns'] );
		}
		return $settings;
	}
}