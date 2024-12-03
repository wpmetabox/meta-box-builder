<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class FrontendSubmission {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-frontend-submission' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
	}

	public function add_field_controls( array $controls, string $type ): array {
		if ( in_array( $type, [ 'tab' ] ) ) {
			return $controls;
		}

		$controls[] = Control::Toggle( 'hide_from_front', [
			'name'  => 'hide_from_front',
			'label' => __( 'Hide from front end?', 'meta-box-builder' ),
		] );

		return $controls;
	}
}
