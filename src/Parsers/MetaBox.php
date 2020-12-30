<?php
namespace MBB\Parsers;

class MetaBox extends Base {
	protected $empty_keys = ['fields'];
	private $settings_parser;

	public function parse() {
		$this->parse_settings();

		// Remove array keys.
		$this->fields = array_values( $this->fields );

		$this->parse_boolean_values()
			->parse_numeric_values()
			->parse_tabs()
			->set_fields_tab()
			->parse_fields( $this->settings['fields'] );

		$this->remove_empty_values();

		// Remove array keys again. Some methods like parse tabs change fields.
		$this->fields = array_values( $this->fields );

		$settings = $this->settings_parser->get_settings();
		$this->settings = array_merge( $settings, [ 'fields' => $this->fields ] );
	}

	private function parse_settings() {
		$settings = isset( $this->settings['settings'] ) ? $this->settings['settings'] : [];
		$this->settings_parser = new Settings( $settings );

		// Set missing parameter.
		$this->settings_parser->title = $this->post_title;
		$this->settings_parser->id = $this->post_name;
		$this->settings_parser->prefix = $this->prefix;
		$this->settings_parser->text_domain = $this->text_domain;
		$this->settings_parser->function_name = $this->function_name;

		$this->settings_parser->parse();
	}

	private function parse_tabs() {
		$this->tabs = [];
		foreach ( $this->fields as $field ) {
			if ( empty( $field['type'] ) || 'tab' !== $field['type'] ) {
				continue;
			}

			$label = isset( $field['name'] ) ? $field['name'] : '';
			$icon  = isset( $field['icon'] ) ? $field['icon'] : '';

			$this->settings['tabs'][ $field['id'] ] = compact( 'label', 'icon' );
		}

		if ( empty( $this->tabs ) ) {
			unset( $this->settings_parser->tab_style );
			unset( $this->settings_parser->tab_wrapper );
		}

		return $this;
	}

	private function set_fields_tab() {
		$tab = isset( $this->settings['fields'][0]['type'] ) ? $this->settings['fields'][0]['type'] : null;
		if ( 'tab' !== $tab ) {
			return $this;
		}

		$previous_tab = null;
		foreach ( $this->settings['fields'] as $index => $field ) {
			if ( 'tab' === $field['type'] ) {
				$previous_tab = $field['id'];
			} else {
				$this->settings['fields'][ $index ]['tab'] = $previous_tab;
			}
		}

		return $this;
	}

	private function parse_fields( &$fields ) {
		array_walk( $fields, [ $this, 'parse_field' ] );
		$fields = array_values( array_filter( $fields ) ); // Make sure to remove empty (such as empty groups) or "tab" fields.
	}

	private function parse_field( &$field ) {
		$parser = new Field( $field );
		$parser->parse();
		$field = $parser->get_settings();

		if ( $this->prefix && isset( $field['id'] ) ) {
			$field['id'] = $this->prefix . $field['id'];
		}

		if ( isset( $field['fields'] ) ) {
			$this->parse_fields( $field['fields'] );
		}
	}
}
