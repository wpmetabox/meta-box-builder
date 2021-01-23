<?php
namespace MBB\Relationships\Parsers;

use MBB\Helpers\Arr;
use MBBParser\Parsers\Base;

class Relationship extends Base {
	public function parse() {
		$this->parse_side( 'from' )->parse_side( 'to' );
	}

	private function parse_side( $side ) {
		$settings = &$this->settings[ $side ];

		$object_type = Arr::get( $settings, 'object_type', 'post' );
		if ( 'post' === $object_type ) {
			unset( $settings['taxonomy'] );
		}
		if ( 'term' === $object_type ) {
			unset( $settings['post_type'] );
		}

		if ( empty( $settings['empty_message'] ) ) {
			unset( $settings['empty_message'] );
		}

		// Meta box settings.
		$meta_box_parser = new MetaBox( $settings['meta_box'] );
		$meta_box_parser->parse();
		$settings['meta_box'] = $meta_box_parser->get_settings();
		if ( empty( $settings['meta_box'] ) ) {
			unset( $settings['meta_box'] );
		}

		// Field settings.
		$field_parser = new MetaBox( $settings['field'] );
		$field_parser->parse();
		$settings['field'] = $field_parser->get_settings();
		if ( empty( $settings['field'] ) ) {
			unset( $settings['field'] );
		}

		// Shorten the syntax if possible.
		if ( 2 === count( $settings ) && 'post' === $settings['object_type'] ) {
			$settings = $settings['post_type'];
		}

		return $this;
	}
}
