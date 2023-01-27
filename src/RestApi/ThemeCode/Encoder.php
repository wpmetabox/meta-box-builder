<?php
namespace MBB\RestApi\ThemeCode;

use RWMB_Helpers_String;
use Riimu\Kit\PHPEncoder\PHPEncoder;

class Encoder {
	private $text_domain;
	private $fields;
	private $encoded_string;
	public $settings;
	private $field_object_type;
	private $field_args;
	private $field_type;
	private $field_id;
	private $size_indent = 0;
	private $path_folder_code;

	public function __construct( $settings ) {
		$this->text_domain       = $settings['text_domain'] ?? 'meta-box-builder';
		$this->fields            = $settings['fields'] ?? [];
		$this->field_object_type = $settings['object_type'] ?? '';
		$this->field_args        = $settings['args'] ?? '';
		$this->path_folder_code  = MBB_DIR . '/views/theme-code';

		unset( $settings['text_domain'], $settings['fields'] );
		$this->settings = $settings;
	}

	public function get_encoded_string() {
		return $this->fields;
	}

	public function encode() {
		foreach ( $this->fields as $key => $field ) {
			$encoded_string = $this->get_theme_code( $field, $field['type'] );
			// Set theme code for view
			$this->fields[ $key ]['theme_code'] = $encoded_string;
		}
	}

	private function get_theme_code( $field, $field_type, $is_group = false ) : string {
		$field_type         = $field_type ?: $field['type'];
		$path_template_code = $this->get_path( $field_type );

		// Get content template
		ob_start();
		include $path_template_code;
		return ob_get_clean();
	}

	private function get_path( string $field_type ) : string {
		// Template Default
		if ( file_exists( $this->path_folder_code . '/' . $field_type . '.php' ) ) {
			return $this->path_folder_code . '/' . $field_type . '.php';
		}

		// Template Default for Field Type
		return $this->path_folder_code . '/default.php';
	}

	private function get_encoded_args( $args = [] ) {
		if ( ! empty( $args ) ) {
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

		return empty( $this->field_args ) ? '' : ', [ ' . implode( ', ', $this->field_args ) . ' ]';
	}

	private function get_encoded_object_type() {
		return ! empty( $this->field_object_type ) && $this->field_object_type !== 'post' ? ', \'' . $this->field_object_type . '\'' : '';
	}

	private function get_encoded_value( $field_id, $args = [], $arg_string = false ) {
		$arg_encode = $arg_string === false ? $this->get_encoded_args( $args ) : ', ' . (string) $args;
		return $field_id . "'" . $arg_encode . $this->get_encoded_object_type();
	}

	private function indent( $size = 1, $echo = false ) {
		$return = ! $size ? '' : esc_html( str_repeat( "\t", $size ) );
		if ( $echo === false ) {
			return $return;
		}
		echo $return;
	}

	private function break( $size = 1, $echo = true ) {
		$return = ! $size ? '' : esc_html( str_repeat( "\n", $size + $this->size_indent ) );
		if ( $echo === false ) {
			return $return;
		}
		echo $return;
	}

	private function out( $str, $indent = false, $break = true, $echo = true ) {
		if ( $echo === false ) {
			return esc_html( htmlspecialchars( $this->indent( $indent ) . $str . $this->break( $break, false ) ) );
		}
		echo esc_html( htmlspecialchars( $this->indent( $indent ) . $str . $this->break( $break, false ) ) );
	}

	private function format_variable( $vars = [] ) {
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

	private function format_args( $args = [] ) {
		$field_args = ! empty( $this->field_args ) ? eval( 'return [' . implode( ', ', $this->field_args ) . '];' ) : [];
		$args       = array_merge( $field_args, $args );
		return $this->format_variable( $args );
	}
}
