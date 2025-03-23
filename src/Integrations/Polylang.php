<?php
namespace MBB\Integrations;

use MBB\Control;

class Polylang {
	public function __construct() {
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 2 );
		add_filter( 'pll_copy_post_metas', [ $this, 'copy_fields' ], 10, 3 );
	}

	public function add_field_controls( array $controls, string $field_type ): array {
		if ( in_array( $field_type, [ 'divider' ], true ) ) {
			return $controls;
		}

		$controls[] = Control::Select('translations', [
			'label'   => __( 'Translations', 'meta-box-builder' ),
			'options' => [
				'ignore'      => __( 'Ignore', 'meta-box-builder' ),
				'translate'   => __( 'Translate', 'meta-box-builder' ),
				'copy_once'   => __( 'Copy Once', 'meta-box-builder' ),
				'synchronize' => __( 'Synchronize', 'meta-box-builder' ),
			],
		] );

		return $controls;
	}

	/**
	 * Add fields to be copied/synchronized by Polylang.
	 *
	 * @param string[]   $metas List of custom fields keys.
	 * @param bool       $sync  True if it is synchronization, false if it is a copy.
	 * @param string|int $from  Id of the object from which we copy information.
	 * @return string[]
	 */
	public function copy_fields( $metas, $sync, $from ): array {
		$fields = rwmb_get_object_fields( $from, 'post' );
		foreach ( $fields as $field ) {
			if ( empty( $field['translations'] ) ) {
				continue;
			}

			$mode = $field['translations'];

			if ( 'ignore' === $mode ) {
				$metas = array_diff( $metas, [ $field['id'] ] );
				continue;
			}

			if ( ! $sync ) {
				$metas[] = $field['id'];
				continue;
			}

			if ( 'synchronize' === $mode ) {
				$metas[] = $field['id'];
			} else {
				$metas = array_diff( $metas, [ $field['id'] ] );
			}
		}

		return $metas;
	}
}
