<?php
namespace MBB\RestApi;

use MBB\Control;

class Settings extends Base {
	public function get_settings_controls() {
		// Use big numeric index for extensions to add at specific places.
		$controls = [
			10 => Control::Post( 'post' ),
		];

		$controls = apply_filters( 'mbb_settings_controls', $controls );

		ksort( $controls, SORT_NUMERIC );

		return array_values( $controls );
	}
}
