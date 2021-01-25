<?php
namespace MBBParser\Encoders;

use MBBParser\SettingsTrait;

class Field {
	use SettingsTrait;

	private $id_prefix;

	public function __construct( $settings, $id_prefix ) {
		$this->settings    = $settings;
		$this->id_prefix   = $id_prefix;
	}

	public function encode() {
		$translatable_fields = ['name', 'desc', 'label_description', 'add_button', 'placeholder', 'prefix', 'suffix', 'before', 'after'];
		array_walk( $translatable_fields, [ $this, 'make_translatable' ] );

		$this->transform_id_prefix();
		$this->make_options_translatable();
	}

	private function transform_id_prefix() {
		if ( empty( $this->id ) ) {
			return;
		}
		$this->id = substr( $this->id, strlen( $this->id_prefix ) );
		$this->id = '{prefix}' . $this->id;
	}

	private function make_options_translatable() {
		$choice_types = ['select', 'radio', 'checkbox_list', 'select_advanced', 'button_group', 'image_select', 'autocomplete'];
		if ( ! in_array( $this->type, $choice_types ) ) {
			return;
		}

		if ( $this->_callback ) {
			$this->options = "{raw}{$this->_callback}(){/raw}";
			unset( $this->_callback );
			return;
		}

		if ( empty( $this->options ) || ! is_array( $this->options ) ) {
			return;
		}
		$options = $this->options;
		foreach ( $options as &$label ) {
			$label = sprintf( '{translate}%s{/translate}', $label );
		}
		$this->options = $options;
	}

	private function make_translatable( $name ) {
		if ( ! empty( $this->$name ) && is_string( $this->$name ) ) {
			$this->$name = sprintf( '{translate}%s{/translate}', $this->$name );
		}
	}
}
