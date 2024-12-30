<?php
namespace MBB;

class Normalizer {
	/**
	 * Add missing keys from the data
	 **/
	public static function normalize( array $data ) {
		// id
		if ( ! isset( $data['id'] ) ) {
			$data['id'] = ! empty( $data['title'] ) ? sanitize_title( $data['title'] ) : uniqid();
		}

		// title
		if ( ! isset( $data['title'] ) ) {
			$data['title'] = ucwords( str_replace( '_', ' ', $data['id'] ) );
		}

		// version
		if ( ! isset( $data['version'] ) ) {
			$data['version'] = 'v0';
		}

		if ( !isset($data['settings']) || ! is_array( $data['settings'] ) ) {
			$data['settings'] = [];
		}

        return $data;
	}
}
