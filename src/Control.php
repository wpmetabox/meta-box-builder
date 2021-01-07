<?php
namespace MBB;

class Control {
	/**
	 * Get a control.
	 *
	 * @param string $name      Control name.
	 * @param array  $arguments Control parameters.
	 *
	 * 0 => Setting name
	 * 1 => Props (if array) or label (if string)
	 * 2 => Default value (optional)
	 * 3 => Tab ('general' - default or 'advanced', optional)
	 */
	public static function __callStatic( $name, $arguments ) {
		// Convert title_case to TitleCase.
		$name = str_replace( ' ', '', ucwords( str_replace( '_', ' ', $name ) ) );

		$setting = $arguments[0];

		// Allow to pass only label (string) or an array of props.
		$props = $arguments[1];
		if ( is_string( $props ) ) {
			$props = [ 'label' => $props ];
		}

		$defaultValue = isset( $arguments[2] ) ? $arguments[2] : self::get_default_value( $name );
		$tab          = isset( $arguments[3] ) ? $arguments[3] : 'general';

		return compact( 'name', 'setting', 'props', 'defaultValue', 'tab' );
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