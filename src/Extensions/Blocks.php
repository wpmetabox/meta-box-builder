<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Blocks {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-blocks' ) ) {
			return;
		}
		add_filter( 'mbb_settings_controls', [ $this, 'add_settings_controls' ] );
	}

	public function add_settings_controls( $controls ) {
		$controls[12] = Control::Block( 'block' );

		return $controls;
	}
}