<?php
namespace MBB\RestApi\ThemeCode;

use Riimu\Kit\PHPEncoder\PHPEncoder;

class Encoder {
	private $text_domain;
	private $fields;
	private $encoded_string;
	public $settings;
	private $object_type;
	private $field_args;
	private $field_type;
	private $field_id;
	private $size_indent = 0;
	private $views_dir;

	public function __construct( $settings ) {
		$this->text_domain = $settings['text_domain'] ?? 'meta-box-builder';
		$this->fields      = $settings['fields'] ?? [];
		$this->object_type = $settings['object_type'] ?? '';
		$this->field_args  = $settings['args'] ?? '';
		$this->views_dir   = MBB_DIR . '/views/theme-code';

		unset( $settings['text_domain'], $settings['fields'] );
		$this->settings = $settings;
	}

	public function get_encoded_string() {
		return $this->fields;
	}

	public function encode() {
		foreach ( $this->fields as $key => $field ) {
			$encoded_string = $this->get_theme_code( $field );
			// Set theme code for view
			$this->fields[ $key ]['theme_code'] = $encoded_string;
		}
	}

	private function get_theme_code( $field, bool $is_group = false ) : string {
		$view_file = $this->get_view_file( $field['type'] );

		ob_start();
		include $view_file;
		return ob_get_clean();
	}

	private function get_view_file( string $field_type ) : string {
		if ( file_exists( $this->views_dir . '/' . $field_type . '.php' ) ) {
			return $this->views_dir . '/' . $field_type . '.php';
		}
		return $this->views_dir . '/default.php';
	}

	private function get_encoded_args( array $args = [] ) : string {
		$return = (array) $this->field_args;
		foreach ( $args as $key => $value ) {
			// value is numeric
			if ( is_numeric( $value ) ) {
				$return[] = "'$key' => $value";
				continue;
			}
			// value is boolean
			if ( is_bool( $value ) ) {
				$return[] = $value === true ? "'$key' => true" : "'$key' => false";
				continue;
			}
			// value is string
			$return[] = "'$key' => '$value'";
		}
		return empty( $return ) ? '' : ', [ ' . implode( ', ', $return ) . ' ]';
	}

	private function get_encoded_object_type() : string {
		return ! empty( $this->object_type ) && $this->object_type !== 'post' ? ', \'' . $this->object_type . '\'' : '';
	}

	private function get_encoded_value( string $field_id, array $args = [], bool $arg_string = false ) : string {
		$arg_encode = $arg_string === false ? $this->get_encoded_args( $args ) : ', ' . (string) $args;
		return $field_id . "'" . $arg_encode . $this->get_encoded_object_type();
	}

	private function indent( int $size = 1, bool $echo = false ) : string {
		$output = $size ? str_repeat( "\t", $size ) : '';
		if ( $echo === false ) {
			return esc_html( $output );
		}
		echo esc_html( $output );
	}

	private function break( int $size = 1, bool $echo = true ) : string {
		$output = $size ? str_repeat( "\n", $size + $this->size_indent ) : '';
		if ( $echo === false ) {
			return esc_html( $output );
		}
		echo esc_html( $output );
	}

	private function out( string $str, int $indent = 1, int $break = 1, bool $echo = true ) : string {
		$output = $this->indent( $indent ) . $str . $this->break( $break, false );
		if ( $echo === false ) {
			return esc_html( $output );
		}
		echo esc_html( $output );
	}

	private function format_variable( array $vars = [] ) : string {
		if ( empty( $vars ) ) {
			return '[]';
		}

		$encoder = new PHPEncoder;
		return $encoder->encode( $vars, [
			'array.base'    => 4,
			'array.align'   => true,
			'string.escape' => false,
		] );
	}

	private function format_args( array $args = [] ) : string {
		$field_args = ! empty( $this->field_args ) ? eval( 'return [' . implode( ', ', $this->field_args ) . '];' ) : [];
		$args       = array_merge( $field_args, $args );
		return $this->format_variable( $args );
	}
}
