<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class ConditionalLogic {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-conditional-logic' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ] );
	}

	public function add_field_controls( $controls ) {
		$controls[] = Control::ConditionalLogic( 'conditional_logic', [
			'link' => 'https://docs.metabox.io/extensions/meta-box-conditional-logic/',
			'label' => __( 'Conditional logic', 'meta-box-builder' ),
			'tooltip' => __( 'Toogle the field visibility by other fields\' values', 'meta-box-builder' ),
		], [], 'advanced' );

		return $controls;
	}
}
