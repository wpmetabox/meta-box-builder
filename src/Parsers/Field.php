<?php
namespace MBB\Parsers;

class Field extends Base {
	protected $empty_keys = ['max_status', 'save_field'];
	protected $non_empty_keys = [
		'button_group' => ['inline'],
		'radio'        => ['inline'],
	];
	private $choice_types        = ['select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete'];

	public function parse() {
		// Remove collapse/expand state.
		unset( $this->expanded );

		// Remove save_field settings unless it's false.
		$this->remove_default( 'save_field', true );

		$this->remove_tabs()
			->parse_boolean_values()
			->parse_numeric_values()
			->parse_datalist()
			->parse_group_title()
			->parse_object_field()
			->parse_choice_options()
			->parse_choice_std()
			->parse_clone()
			->parse_array_attributes( 'options' )
			->parse_array_attributes( 'js_options' )
			->parse_array_attributes( 'query_args' )
			->parse_array_attributes( 'attributes' )
			->parse_custom_settings()
			->parse_conditional_logic()
			->remove_id()
			->remove_empty_values();

		// Field-specific parser.
		$func = "parse_field_{$this->type}";
		if ( method_exists( $this, $func ) ) {
			$this->$func();
		}
	}

	private function remove_tabs() {
		if ( 'tab' === $this->type ) {
			$this->settings = [];
		}
		return $this;
	}

	private function parse_datalist() {
		if ( empty( $this->settings['datalist_choices'] ) ) {
			return $this;
		}
		$this->datalist = [
			'id'      => uniqid(),
			'options' => explode( "\n", $this->settings['datalist_choices'] ),
		];
		unset( $this->settings['datalist_choices'] );
		return $this;
	}

	private function parse_group_title() {
		if ( 'group' !== $this->type ) {
			return $this;
		}
		unset( $this->groupfield );
		return $this;
	}

	private function parse_object_field() {
		if ( ! in_array( $this->type, array( 'taxonomy', 'taxonomy_advanced', 'post', 'user' ), true ) ) {
			return $this;
		}
		unset( $this->terms );

		/**
		 * Available field types:
		 * - select
		 * - select_advanced
		 * - select_tree
		 * - checkbox_list
		 * - checkbox_tree
		 * - radio_list
		 */

		if ( in_array( $this->field_type, array( 'select', 'select_advanced', 'select_tree', 'checkbox_tree' ), true ) ) {
			unset( $this->inline );
		}
		if ( in_array( $this->field_type, array( 'select_tree', 'checkbox_list', 'checkbox_tree', 'radio_list' ), true ) ) {
			unset( $this->multiple );
		}
		if ( in_array( $this->field_type, array( 'select_tree', 'checkbox_tree', 'radio_list' ), true ) ) {
			unset( $this->select_all_none );
		}
		if ( empty( $this->multiple ) && in_array( $this->field_type, array( 'select', 'select_advanced' ), true ) ) {
			unset( $this->select_all_none );
		}

		return $this;
	}

	private function parse_choice_options() {
		if ( ! in_array( $this->type, $this->choice_types ) ) {
			return $this;
		}
		if ( empty( $this->options ) || is_array( $this->options ) ) {
			return $this;
		}
		$options = array();

		$this->options = trim( wp_unslash( $this->options ) );
		$this->options = explode( "\n", $this->options );

		foreach ( $this->options as $choice ) {
			if ( false !== strpos( $choice, ':' ) ) {
				list( $value, $label )     = explode( ':', $choice, 2 );
				$options[ trim( $value ) ] = trim( $label );
			} else {
				$options[ trim( $choice ) ] = trim( $choice );
			}
		}

		$this->options = $options;

		return $this;
	}

	private function parse_choice_std() {
		$is_multiple = $this->multiple
			|| in_array( $this->type, ['checkbox_list', 'autocomplete'] )
			|| in_array( $this->field_type, ['select_tree', 'checkbox_tree', 'checkbox_list', 'checkbox_tree'] );

		if ( $is_multiple ) {
			$this->std = is_string( $this->std ) && ! empty( $this->std ) ? preg_split('/\r\n|\r|\n/', $this->std ) : $this->std;
		}

		if ( empty( $this->std ) ) {
			unset( $this->std );
		}

		return $this;
	}

	private function parse_clone() {
		if ( $this->clone ) {
			return;
		}
		$keys = ['sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button'];
		foreach ( $keys as $key ) {
			unset( $this->$key );
		}
		return $this;
	}

	private function remove_id() {
		if ( in_array( $this->type, ['divider', 'heading'] ) ) {
			unset( $this->id );
		}
		return $this;
	}
}
