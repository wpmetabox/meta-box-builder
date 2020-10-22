<?php
namespace MBB\Api;

class Component {
	public function __callStatic( $name, $arguments ) {
		// Convert title_case to TitleCase.
		$component = str_replace( ' ', '', ucwords( str_replace( '_', ' ', $name ) ) );

		$props = $arguments[0];
		$default = isset( $arguments[1] ) ? $arguments[1] : null;

		// Allow to pass only label (string) or an array of props.
		if ( is_string( $props ) ) {
			$props = [ 'label' => $props ];
		}

		return compact( 'component', 'props', 'default' );
	}
}