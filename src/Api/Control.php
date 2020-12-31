<?php
namespace MBB\Api;

class Control {
	public static function __callStatic( $name, $arguments ) {
		// Convert title_case to TitleCase.
		$control = str_replace( ' ', '', ucwords( str_replace( '_', ' ', $name ) ) );

		$props = $arguments[0];
		$default = isset( $arguments[1] ) ? $arguments[1] : self::get_default_value( $control );

		// Allow to pass only label (string) or an array of props.
		if ( is_string( $props ) ) {
			$props = [ 'label' => $props ];
		}

		return compact( 'control', 'props', 'default' );
	}

	private static function get_default_value( $control ) {
		$defaults = [
			'Checkbox'    => false,
			'ReactSelect' => [],
			'Input'       => '',
			'KeyValue'    => [],
			'Name'        => '',
			'Select'      => '',
			'Textarea'    => '',
		];
		return isset( $defaults[ $control ] ) ? $defaults[ $control ] : null;
	}
}