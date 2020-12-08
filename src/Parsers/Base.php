<?php
namespace MBB\Parsers;

use MBB\Arr;
use MBB\SettingsTrait;

class Base {
	use SettingsTrait;

	protected $ignore_empty_keys = [];

	public function __construct( $settings ) {
		$this->settings = (array) $settings;
	}

	protected function parse_boolean_values() {
		array_walk_recursive( $this->settings, array( $this, 'convert_string_to_boolean' ) );
		return $this;
	}

	protected function convert_string_to_boolean( &$value ) {
		if ( in_array( $value, array( 'true', 'false' ), true ) ) {
			$value = filter_var( $value, FILTER_VALIDATE_BOOLEAN );
		}
	}

	protected function parse_numeric_values() {
		array_walk_recursive( $this->settings, array( $this, 'convert_string_to_number' ) );
		return $this;
	}

	protected function convert_string_to_number( &$value ) {
		if ( is_numeric( $value ) ) {
			$value = 0 + $value;
		}
	}

	protected function remove_angular_keys() {
		unset( $this->settings['$$hashKey'] );
		return $this;
	}

	protected function remove_empty_values() {
		foreach ( $this->settings as $key => $value ) {
			if ( empty( $value ) && ! in_array( $key, $this->ignore_empty_keys, true ) ) {
				unset( $this->settings[ $key ] );
			}
		}
		return $this;
	}

	protected function parse_array_attributes( $key ) {
		// Make sure we're processing 2-dimentional array [[key, value], [key, value]].
		$value = $this->{$key};
		if ( ! is_array( $value ) ) {
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

	protected function parse_custom_attributes() {
		if ( isset( $this->attributes ) ) {
			$param = 'attributes';
		} elseif ( isset( $this->attrs ) ) {
			$param = 'attrs';
		} else {
			return $this;
		}

		$this->parse_array_attributes( $param );
		foreach ( $this->{$param} as $key => $value ) {
			$this->{$key} = $value;
		}

		unset( $this->{$param} );
		return $this;
	}

	protected function parse_conditional_logic() {
		if ( empty( $this->logic ) ) {
			return $this;
		}

		$logic = $this->logic;

		$visibility = 'visible' === $logic['visibility'] ? 'visible' : 'hidden';
		$relation   = 'and' === $logic['relation'] ? 'and' : 'or';

		foreach ( $logic['when'] as $index => $condition ) {
			if ( empty( $condition[0] ) ) {
				unset( $logic['when'][ $index ] );
			}

			if ( ! isset( $condition[2] ) || is_null( $condition[2] ) ) {
				$condition[2] = '';
			}

			if ( strpos( $condition[2], ',' ) !== false ) {
				$logic['when'][ $index ][2] = array_map( 'trim', explode( ',', $condition[2] ) );
			}
		}

		if ( ! empty( $logic['when'] ) ) {
			$this->{$visibility} = array(
				'when'     => $logic['when'],
				'relation' => $relation,
			);
		}

		unset( $this->logic );

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
}
