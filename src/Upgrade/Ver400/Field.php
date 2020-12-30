<?php
namespace MBB\Upgrade\Ver400;

use RWMB_Helpers_Array;

/**
 * Update field settings from data for AngularJS to React.
 */
class Field extends Base {
	public function update( &$field ) {
		$new_field = [];

		$this->update_conditional_logic( $new_field, $field );

		$names = ['attrs', 'js_options', 'query_args', 'options'];
		foreach ( $field as $key => $value ) {
			if ( in_array( $key, $names ) ) {
				$value = $this->update_key_value( $value );
			}
			$new_field[ $key ] = $value;
		}

		RWMB_Helpers_Array::change_key( $new_field, 'attrs', 'custom_settings' );

		$field = $new_field;
		$field['_state'] = 'collapsed';
	}

	private function update_key_value( $value ) {
		if ( empty( $value ) || ! is_array( $value ) ) {
			return $value;
		}

		$new_value = [];
		foreach ( $value as $option ) {
			$id = uniqid();
			$new_value[ $id ] = array_merge( ['id' => $id], $option );
		}

		return $new_value;
	}
}