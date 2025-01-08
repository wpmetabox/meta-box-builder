<?php
namespace MBBParser\Unparsers;

use MBBParser\SettingsTrait;
use MetaBox\Support\Arr;

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

	public function unparse_boolean_values() {
		array_walk_recursive( $this->settings, [ $this, 'convert_boolean_to_string' ] );
		
		return $this;
	}

	protected function convert_boolean_to_string( &$value ) {
		if ( is_bool( $value ) ) {
			$value = $value ? 'true' : 'false';
		}
	}

	public function unparse_numeric_values() {
		array_walk_recursive( $this->settings, [ $this, 'convert_number_to_string' ] );
		return $this;
	}

	protected function convert_number_to_string( &$value ) {
		$value = (string) $value;
	}

	protected function unparse_array_attributes( $key ) {
		$value = $this->$key;

		if ( ! is_array( $value ) ) {
			return $this;
		}

		$tmp_array = [];
		foreach ( $value as $k => $v ) {
			$tmp_key               = uniqid();
			$tmp_array[ $tmp_key ] = [ 'id' => $tmp_key, 'key' => $k, 'value' => $v ];
		}

		$this->$key = $tmp_array;

		return $this;
	}

	protected function unparse_custom_settings() {
		if ( ! isset( $this->custom_settings ) ) {
			return $this;
		}

		$this->unparse_array_attributes( 'custom_settings' );

		foreach ( $this->custom_settings as $key => $value ) {
			$this->$key = $value;
		}

		unset( $this->custom_settings );

		return $this;
	}

	protected function unparse_conditional_logic() {
		if ( empty( $this->visible ) && empty( $this->hidden ) ) {
			return $this;
		}

		if ( ! class_exists( 'MB_Conditional_Logic' ) ) {
			return $this;
		}

		$conditional_logic = ( new \MB_Conditional_Logic() )->parse_conditions( $this->settings );

		$output = [];
		foreach ( $conditional_logic as $action => $condition ) {
			$output['type']     = $action;
			$output['relation'] = $condition['relation'];
			$output['when']     = [];

			foreach ( $condition['when'] as $criteria ) {
				$id = uniqid();

				$output['when'][ $id ] = [ 
					'id' => $id,
					'name' => $criteria[0],
					'operator' => $criteria[1],
					'value' => $criteria[2],
				];
			}
		}

		$this->conditional_logic = $output;
		
		return $this;
	}

	/**
	 * Inverse of remove_default.
	 * 
	 * @param mixed $key
	 * @param mixed $value
	 * @return static
	 */
	protected function add_default( $key, $value ) {
		if ( ! isset( $this->$key ) ) {
			$this->$key = $value;
		}
		
		return $this;
	}
}
