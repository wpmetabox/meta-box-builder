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
			->unparse_choice_options()
			->unparse_choice_std()
			->unparse_clone()
			->unparse_array_attributes( 'options' )
			->unparse_array_attributes( 'js_options' )
			->unparse_array_attributes( 'query_args' )
			->unparse_array_attributes( 'attributes' )
			->unparse_text_limiter()
			->unparse_conditional_logic()
			->unparse_tooltip()
			->unparse_admin_columns();

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

	private function unparse_clone() {
		if ( ! $this->clone ) {
			return $this;
		}

		$keys = [ 'sort_clone', 'clone_default', 'clone_as_multiple', 'min_clone', 'max_clone', 'add_button' ];
		
		foreach ( $keys as $key ) {
			if ( isset( $this->$key ) ) {
				continue;
			}

			$numerics = [ 'min_clone', 'max_clone' ];
			if ( in_array( $key, $numerics, true ) ) {
				$this->$key = 0;
			} else {
				$this->$key = false;
			}
		}

		return $this;
	}

	private function unparse_field_key_value() {
		$placeholder = $this->placeholder;
		if ( empty( $placeholder ) ) {
			return $this;
		}

		$this->placeholder_key = $placeholder['key'] ?? '';
		$this->placeholder_value = $placeholder['value'] ?? '';

		return $this;
	}

	private function unparse_field_group() {
		$this->default_state = 'expanded';

		$keys = [ 'default_state', 'save_state', 'group_title' ];

		foreach ( $keys as $key ) {
			$this->$key = $this->$key ?? '';
		}

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

	private function unparse_tooltip() {
		if ( ! isset( $this->tooltip ) ) {
			return $this;
		}

		if ( is_array( $this->tooltip ) ) {
			if ( ! isset( $this->tooltip['enable'] ) ) {
				$this->tooltip = array_merge( $this->tooltip, [ 'enable' => true ] );
			}

			return $this;
		}

		$this->tooltip = [ 
			'text' => $this->tooltip,
			'icon' => 'info',
			'position' => 'top',
			'content' => '',
			'allow_html' => true,
			'enable' => true,
		];

		return $this;
	}

	private function unparse_admin_columns() {
		if ( ! isset( $this->admin_columns ) ) {
			return $this;
		}

		if ( is_array( $this->admin_columns ) ) {
			if ( ! isset( $this->admin_columns['enable'] ) ) {
				$this->admin_columns = array_merge( $this->admin_columns, [ 'enable' => true ] );
			}

			return $this;
		}

		$this->admin_columns = [ 
			'enable' => true,
			'position' => [ 'type' => 'after', 'column' => 'title' ],
			'title' => '',
			'before' => '',
			'after' => '',
			'sort' => false,
			'searchable' => false,
			'filterable' => false,
			'link' => false,
		];

		return $this;
	}
}
