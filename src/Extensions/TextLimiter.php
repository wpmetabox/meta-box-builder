<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class TextLimiter {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-text-limiter' ) ) {
			return;
		}

		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
	}

	public function add_field_controls( $controls, $type ) {
		if ( $type === 'tab' ) {
			return $controls;
		}

		$controls[] = Control::TextLimiter( 'text_limiter', [
			'label'   => '<a href="https://docs.metabox.io/extensions/meta-box-text-limiter/" target="_blank" rel="noreferrer noopenner">' . __( 'Text limit', 'meta-box-builder' ) . '</a>',
			'tooltip' => __( 'Limit the number of characters or words', 'meta-box-builder' ),
		], [], 'advanced' );

		return $controls;
	}
}