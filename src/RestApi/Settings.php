<?php
namespace MBB\RestApi;

class Settings extends Base {
	public function get_settings_controls() {
		// Use big numeric index for extensions to add at specific places.
		$controls = [];

		$controls = apply_filters( 'mbb_settings_controls', $controls );

		ksort( $controls, SORT_NUMERIC );

		return array_values( $controls );
	}
}
