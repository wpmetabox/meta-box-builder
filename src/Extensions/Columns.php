<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Columns {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-columns' ) ) {
			return;
		}
		add_filter( 'mbb_fields', [ $this, 'add_settings' ] );
	}

	public function add_settings( $fields ) {
		foreach ( $fields as &$data ) {

			$data['general']['columns'] = Control::Select( [
				'label'      => '<a href="https://metabox.io/plugins/meta-box-columns/" target="_blank" rel="nofollow noopenner">' . __( 'Columns', 'meta-box-builder' ) . '</a>',
				'tooltip'    => __( 'Select number of columns for this field in a 12-column grid', 'meta-box-builder' ),
				'options'    => array_combine( range( 1, 12 ), range( 1, 12 ) ) ,
			], 12 );
		}

		return $fields;
	}
}