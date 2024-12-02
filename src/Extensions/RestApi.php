<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class RestApi {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-rest-api' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ] );
	}

	public function add_field_controls( $controls ) {
		$controls[] = Control::Toggle( 'hide_from_rest', [
			'name'  => 'hide_from_rest',
			'label' => __( 'Hide from Rest API?', 'meta-box-builder' ),
		] );

		return $controls;
	}
}
