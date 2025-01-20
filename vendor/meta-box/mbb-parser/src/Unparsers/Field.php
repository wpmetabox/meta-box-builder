<?php
namespace MBBParser\Unparsers;

class Field extends Base {
	// Allow these settings to be empty.
	protected $empty_keys = [ 'save_field' ];

	private $choice_types = [ 'select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete' ];

	/**
	 * This is revert of parse method. While parse method converts to the minimal format, 
	 * this method converts back to the original format.
	 * 
	 * Used when importing JSON to the builder.
	 * 
	 * @return void
	 */
	public function unparse() {
		$this->_id = $this->_id ?? $this->id;

		$this
			->add_default( '_id', $this->id )
			->add_default( 'save_field', true )
			->unparse_boolean_values()
			->unparse_numeric_values()
			->unparse_datalist()
			->unparse_object_field()
			->unparse_choice_options()
			->unparse_choice_std()
			->unparse_array_attributes( 'options' )
			->unparse_array_attributes( 'js_options' )
			->unparse_array_attributes( 'query_args' )
			->unparse_array_attributes( 'attributes' )
			->unparse_text_limiter()
			->unparse_custom_settings()
			->unparse_conditional_logic();

		$func = "unparse_field_{$this->type}";
		if ( method_exists( $this, $func ) ) {
			$this->$func();
		}
	}

	private function unparse_datalist() {
		if ( empty( $this->datalist ) ) {
			return $this;
		}

		$this->settings['datalist_choices'] = implode( "\n", $this->datalist['options'] );

		return $this;
	}

	private function unparse_object_field() {
		if ( ! in_array( $this->type, [ 'taxonomy', 'taxonomy_advanced', 'post', 'user' ], true ) ) {
			return $this;
		}

		// @todo check set terms, inline, multiple, select_all_none
		return $this;
	}

	/**
	 * Inverse of parse_choice_options.
	 * 
	 * Convert options array to string.
	 * 
	 * @return static
	 */
	private function unparse_choice_options() {
		if ( ! in_array( $this->type, $this->choice_types ) ) {
			return $this;
		}

		if ( empty( $this->options ) || ! is_array( $this->options ) ) {
			return $this;
		}

		$options = [];
		foreach ( $this->options as $key => $value ) {
			$options[] = "{$key}:{$value}";
		}
		$options = implode( "\r\n", $options );

		$this->options = $options;

		return $this;
	}

	private function unparse_choice_std() {
		if ( ! in_array( $this->type, $this->choice_types ) ) {
			return $this;
		}

		$this->std = is_array( $this->std ) ? implode( "\r\n", $this->std ) : $this->std;

		return $this;
	}

	private function parse_field_key_value() {
		$placeholder = [];
		if ( $this->placeholder_key ) {
			$placeholder['key'] = $this->placeholder_key;
		}
		if ( $this->placeholder_value ) {
			$placeholder['value'] = $this->placeholder_value;
		}
		$placeholder = array_filter( $placeholder );
		if ( $placeholder ) {
			$this->placeholder = $placeholder;
		}
		unset( $this->placeholder_key, $this->placeholder_value );
		return $this;
	}

	private function unparse_field_key_value() {
		// @todo: implement this


		return $this;
	}

	private function unparse_field_group() {
		// @todo: Implement this and test

		return $this;
	}

	private function unparse_text_limiter() {
		if ( ! isset( $this->limit ) ) {
			return $this;
		}

		$this->text_limiter = [ 
			'limit' => $this->limit,
			'limit_type' => $this->limit_type ?? 'word',
		];

		return $this;
	}
}
