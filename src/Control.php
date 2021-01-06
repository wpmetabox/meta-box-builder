<?php
namespace MBB;

class Control {
	public static function __callStatic( $name, $arguments ) {
		// Convert title_case to TitleCase.
		$name = str_replace( ' ', '', ucwords( str_replace( '_', ' ', $name ) ) );

		$props = $arguments[0];
		$default = isset( $arguments[1] ) ? $arguments[1] : self::get_default_value( $name );

		// Allow to pass only label (string) or an array of props.
		if ( is_string( $props ) ) {
			$props = [ 'label' => $props ];
		}

		return compact( 'name', 'props', 'default' );
	}

	private static function get_default_value( $name ) {
		$defaults = [
			'AddressField' => '',
			'Checkbox'     => false,
			'Icon'         => '',
			'Id'           => '',
			'Input'        => '',
			'KeyValue'     => [],
			'Name'         => '',
			'ReactSelect'  => [],
			'Select'       => '',
			'Textarea'     => '',
		];
		return isset( $defaults[ $name ] ) ? $defaults[ $name ] : null;
	}
}