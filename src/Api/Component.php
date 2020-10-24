<?php
namespace MBB\Api;

class Component {
	public function __callStatic( $name, $arguments ) {
		// Convert title_case to TitleCase.
		$component = str_replace( ' ', '', ucwords( str_replace( '_', ' ', $name ) ) );

		$props = $arguments[0];
		$default = isset( $arguments[1] ) ? $arguments[1] : $this->get_default_value( $component );

		// Allow to pass only label (string) or an array of props.
		if ( is_string( $props ) ) {
			$props = [ 'label' => $props ];
		}

		return compact( 'component', 'props', 'default' );
	}

	private function get_default_value( $component ) {
		$defaults = [
			'Checkbox'     => false,
			'CheckboxList' => [],
			'Input'        => '',
			'KeyValue'     => [],
			'Name'         => '',
			'Select'       => '',
			'Textarea'     => '',
		];
		return isset( $defaults[ $component ] ) ? $defaults[ $component ] : null;
	}
}