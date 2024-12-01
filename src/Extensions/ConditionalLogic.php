<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class ConditionalLogic {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-conditional-logic' ) ) {
			return;
		}

		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
	}

	public function add_field_controls( array $controls, string $type ): array {
		if ( $type === 'tab' ) {
			return $controls;
		}
		$controls[] = Control::ConditionalLogic( 'conditional_logic', [
			'label'   => '<a href="https://docs.metabox.io/extensions/meta-box-conditional-logic/" target="_blank" rel="noreferrer noopenner">' . __( 'Conditional logic', 'meta-box-builder' ) . '</a>',
			'tooltip' => __( 'Toggle the field visibility by other fields\' values', 'meta-box-builder' ),
		], [], 'advanced' );

		return $controls;
	}
}
