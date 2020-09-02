<?php
namespace MBBParser\Encoders;

use MBBParser\SettingsTrait;
use Riimu\Kit\PHPEncoder\PHPEncoder;

class MetaBox {
	use SettingsTrait;

	private $text_domain;
	private $prefix;
	private $function_name = 'your_prefix_register_meta_boxes';

	public function __construct( $settings ) {
		$this->text_domain = $settings['text_domain'] ?? 'text-domain';
		$this->prefix      = $settings['prefix'] ?? '';

		unset( $settings['text_domain'], $settings['prefix'] );
		$this->settings = $settings;
	}

	public function get_encoded_string() {
		return $this->encoded_string;
	}

	public function encode() {
		$this->make_translatable( 'title' );

		if ( isset( $this->settings['fields'] ) && is_array( $this->settings['fields'] ) ) {
			$this->encode_fields( $this->settings['fields'] );
		}

		$encoder = new PHPEncoder();
		$this->encoded_string = $encoder->encode( $this->settings, [
			'array.base'  => 4,
			'array.align' => true,
		] );

		$this->replace_get_text_function()
			->replace_field_id_prefix()
			->wrap_function_call();
	}

	private function encode_fields( &$fields ) {
		array_walk( $fields, array( $this, 'encode_field' ) );
		$fields = array_filter( $fields ); // Make sure to remove empty (such as empty groups) or "tab" fields.
	}

	private function encode_field( &$field ) {
		$encoder = new Field( $field, $this->text_domain, $this->prefix );
		$encoder->encode();
		$field = $encoder->get_settings();

		if ( isset( $field['fields'] ) ) {
			$this->encode_fields( $field['fields'] );
		}
	}

	private function make_translatable( $name ) {
		if ( ! empty( $this->{$name} ) ) {
			$this->{$name} = sprintf( '###%s###', $this->{$name} );
		}
	}

	private function replace_get_text_function() {
		$find    = "/'###(.*)###'/";
		$replace = "esc_html__( '$1', '" . $this->text_domain . "' )";

		$this->encoded_string = preg_replace( $find, $replace, $this->encoded_string );
		return $this;
	}

	private function replace_field_id_prefix() {
		$this->encoded_string = str_replace( '\'{{ prefix }}', '$prefix . \'', $this->encoded_string );
		return $this;
	}

	private function wrap_function_call() {
		$this->encoded_string = sprintf(
			'<?php
add_filter( \'rwmb_meta_boxes\', \'%1$s\' );

function %1$s( $meta_boxes ) {
    $prefix = \'%3$s\';

    $meta_boxes[] = %2$s;

    return $meta_boxes;
}',
			$this->function_name,
			$this->encoded_string,
			$this->prefix
		);
		return $this;
	}
}
