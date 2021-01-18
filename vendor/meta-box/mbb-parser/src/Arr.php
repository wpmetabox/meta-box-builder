<?php
namespace MBBParser;

class Arr {
	/**
	 * Convert flatten collection (with dot notation) to multiple dimmensionals array
	 *
	 * @param  collection $collection Collection to be flatten
	 * @return array
	 */
	public static function unflatten( $collection ) {
		$collection = (array) $collection;
		$output = [];

		foreach ( $collection as $key => $value ) {
			self::set( $output, $key, $value );

			if ( is_array( $value ) && ! strpos( $key, '.' ) ) {
				$nested = self::unflatten( $value );
				$output[ $key ] = $nested;
			}
		}

		return $output;
	}

	/**
	 * Set array element value with dot notation.
	 */
	public static function set( &$array, $key, $value ) {
		if ( is_null( $key ) ) {
			return $array = $value;
		}

		// Do not parse email value.
		if ( is_email( $key ) ) {
			$array[ $key ] = $value;
			return;
		}

		$keys = explode( '.', $key );

		while ( count( $keys ) > 1 ) {
			$key = array_shift( $keys );

			// If the key doesn't exist at this depth, we will just create an empty array
			// to hold the next value, allowing us to create the arrays to hold final
			// values at the correct depth. Then we'll keep digging into the array.
			if ( ! isset( $array[ $key ] ) || ! is_array( $array[ $key ] ) ) {
				$array[ $key ] = [];
			}

			$array =& $array[ $key ];
		}

		$array[ array_shift( $keys ) ] = $value;
	}

	/**
	 * Get array element value with dot notation.
	 */
	public static function get( $array, $key, $default = null ) {
		if ( is_null( $key ) ) {
			return $array;
		}

		$keys = explode( '.', $key );
		foreach ( $keys as $key ) {
			if ( isset( $array[ $key ] ) ) {
				$array = $array[ $key ];
			} else {
				return $default;
			}
		}

		return $array;
	}
}