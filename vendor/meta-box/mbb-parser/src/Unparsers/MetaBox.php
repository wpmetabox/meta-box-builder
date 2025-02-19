<?php
namespace MBBParser\Unparsers;

use MetaBox\Support\Arr;

class MetaBox extends Base {
	protected $empty_keys = [ 'fields' ];
	
	private $settings_parser;

	private $validation = [ 
		'rules' => [],
		'messages' => [],
	];

	private function unparse_fields( &$fields ) {
		array_walk( $fields, [ $this, 'unparse_field' ] );
	}

	private function unparse_field( &$field ) {
		$parser = new Field( $field );
		$parser->unparse();
		$field = $parser->get_settings();

		if ( $this->settings_parser->prefix && isset( $field['id'] ) ) {
			$field['id'] = $this->settings_parser->prefix . $field['id'];
		}

		$this->unparse_field_validation( $field );

		if ( isset( $field['fields'] ) ) {
			$this->unparse_fields( $field['fields'] );
		}
	}

	/**
	 * Inverse of parse_field_validation.
	 * 
	 * Convert validation rules from meta box to field validation.
	 * 
	 * @param mixed $field
	 * @return void
	 */
	private function unparse_field_validation( &$field ) {
		if ( isset( $field['validation'] ) ) {
			return;
		}

		if ( ! isset( $this->validation ) || ! is_array( $this->validation ) || ! array_key_exists( 'rules', $this->validation ) ) {
			return;
		}

		$key = str_replace( $this->settings_parser->prefix, '', $field['id'] );

		$rules    = $this->validation['rules'][ $key ];
		$messages = $this->validation['messages'][ $key ];

		$field['validation'] = [];

		foreach ( $rules as $rule ) {
			$field['validation'][] = [ 
				'name' => $rule,
				'value' => $rules[ $rule ],
				'message' => $messages[ $rule ] ?? '',
			];
		}
	}
}
