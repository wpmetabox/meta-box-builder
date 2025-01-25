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

	public function parse() {
		$this->parse_settings();

		// Remove array keys.
		$this->fields = is_array( $this->fields ) ? $this->fields : [];
		$this->fields = array_values( $this->fields );

		$this->parse_boolean_values()
			->parse_numeric_values()
			->parse_fields( $this->settings['fields'] );

		$this->remove_empty_values();

		// Remove array keys again. Some methods like parse tabs change fields.
		$this->fields = array_values( $this->fields );

		$settings       = $this->settings_parser->get_settings();
		$this->settings = array_merge( $settings, [ 'fields' => $this->fields ] );
		if ( $this->validation['rules'] ) {
			if ( empty( $this->validation['messages'] ) ) {
				unset( $this->validation['messages'] );
			}
			$this->settings['validation'] = $this->validation;
		}

		$this->settings = apply_filters( 'mbb_meta_box_settings', $this->settings );
	}

	private function parse_settings() {
		$settings = [ 
			'title' => $this->post_title,
			'id' => $this->post_name,
		];

		if ( isset( $this->settings['settings'] ) ) {
			$settings = array_merge( $settings, $this->settings['settings'] );
		}

		$this->settings_parser = new Settings( $settings );
		$this->settings_parser->parse();
	}

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
