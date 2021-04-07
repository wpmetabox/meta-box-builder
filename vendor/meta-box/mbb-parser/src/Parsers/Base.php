<?php
namespace MBBParser\Parsers;

use MBBParser\Arr;
use MBBParser\SettingsTrait;
use RWMB_Helpers_Array;

class Base {
	use SettingsTrait;

	protected $empty_keys = [];

	public function __construct( $settings = [] ) {
		$this->settings = (array) $settings;
	}

	public function set_settings( $settings ) {
		$this->settings = (array) $settings;
		return $this;
	}

	public function parse_boolean_values() {
		array_walk_recursive( $this->settings, array( $this, 'convert_string_to_boolean' ) );
		return $this;
	}

	protected function convert_string_to_boolean( &$value ) {
		if ( in_array( $value, array( 'true', 'false' ), true ) ) {
			$value = filter_var( $value, FILTER_VALIDATE_BOOLEAN );
		}
	}

	public function parse_numeric_values() {
		array_walk_recursive( $this->settings, array( $this, 'convert_string_to_number' ) );
		return $this;
	}

	/**
	 * Ignore scientific number (123e45, etc..)
	 */
	protected function convert_string_to_number( &$value ) {
		$value = (string) $value;
		if ( is_numeric( $value ) && false === strpos( $value, 'e' ) ) {
			$value = 0 + $value;
		}
	}

	protected function remove_empty_values() {
		foreach ( $this->settings as $key => $value ) {
			// Remove empty values in an array.
			$value = is_array( $value ) ? array_filter( $value ) : $value;

			// Don't remove allowed empty keys.
			if ( in_array( $key, $this->empty_keys ) ) {
				continue;
			}

			if ( empty( $value ) ) {
				unset( $this->settings[ $key ] );
			}
		}

		return $this;
	}

	protected function parse_array_attributes( $key ) {
		// Make sure we're processing 2-dimentional array [[key, value], [key, value]].
		$value = $this->$key;
		if ( ! is_array( $value ) ) {
			$this->$key = [];
			return $this;
		}
		$first = reset( $value );
		if ( ! is_array( $first ) ) {
			return $this;
		}

		// Options aren't affected with taxonomies.
		$tmp_array = array();
		$tmp_std   = array();

		foreach ( $value as $arr ) {
			$tmp_array[ $arr['key'] ] = $arr['value'];
			if ( isset( $arr['selected'] ) && $arr['selected'] ) {
				$tmp_std[] = $arr['key'];
			}

			// Push default value to std on Text List.
			if ( empty( $arr['default'] ) ) {
				continue;
			}
			if ( 'fieldset_text' === $this->type ) {
				$tmp_std[ $arr['value'] ] = $arr['default'];
			} else {
				$tmp_std[] = $arr['default'];
			}
		}

		// Parse JSON and dot notations.
		$this->{$key} = $this->parse_json_dot_notations( $tmp_array );

		if ( $tmp_std ) {
			$this->std = $tmp_std;
		}
		return $this;
	}

	protected function parse_custom_settings() {
		if ( ! isset( $this->custom_settings ) ) {
			return $this;
		}

		$this->parse_array_attributes( 'custom_settings' );
		foreach ( $this->custom_settings as $key => $value ) {
			$this->$key = $value;
		}

		unset( $this->custom_settings );
		return $this;
	}

	protected function parse_conditional_logic() {
		if ( empty( $this->conditional_logic ) ) {
			return $this;
		}

		$data = $this->conditional_logic;
		foreach ( $data['when'] as &$condition ) {
			// Allow to set array as CSV.
			if ( false !== strpos( $condition['value'], ',' ) ) {
				$condition['value'] = RWMB_Helpers_Array::from_csv( $condition['value'] );
			}
			$condition = [
				$condition['name'],
				$condition['operator'],
				$condition['value'],
			];
		}

		if ( ! empty( $data['when'] ) ) {
			$this->{$data['type']} = array(
				'when'     => array_values( $data['when'] ),
				'relation' => $data['relation'],
			);
		}

		unset( $this->conditional_logic );

		return $this;
	}

	protected function parse_json_dot_notations( $array ) {
		// Parse JSON notation.
		foreach ( $array as &$value ) {
			$json = json_decode( stripslashes( $value ), true );
			if ( is_array( $json ) ) {
				$value = $json;
			}
		}

		// Parse dot notation.
		return Arr::unflatten( $array );
	}

	protected function remove_default( $key, $value ) {
		if ( $this->$key === $value ) {
			unset( $this->$key );
		}
		return $this;
	}
}
