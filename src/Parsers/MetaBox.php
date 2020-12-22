<?php
namespace MBB\Parsers;

use RWMB_Helpers_Array;
use MBB\Helpers\Arr;

class MetaBox extends Base {
	protected $empty_keys = ['fields'];

	public function parse() {
		if ( ! isset( $this->fields ) || ! is_array( $this->fields ) ) {
			$this->fields = [];
		}
		// Remove array keys.
		$this->fields = array_values( $this->fields );

		$this->parse_boolean_values()
			->parse_numeric_values()
			->parse_location()
			->parse_location_rules( 'show_hide' )
			->parse_location_rules( 'include_exclude' )
			->parse_conditional_logic()
			->parse_block()
			->parse_custom_table()
			->parse_tabs()
			->set_fields_tab()
			->parse_custom_settings()
			->parse_fields( $this->settings['fields'] );

		$this->remove_empty_values();

		// Remove array keys again. Some methods like parse tabs change fields.
		$this->fields = array_values( $this->fields );
	}

	private function parse_location() {
		$object_type = $this->object_type ? $this->object_type : 'post';
		unset( $this->object_type );

		if ( in_array( $object_type, ['user', 'comment', 'block'], true ) ) {
			unset( $this->$object_type );
			$this->type = $object_type;
		}

		if ( 'post' === $object_type ) {
			$this->remove_default( 'post_types', ['post'] );
			$this->remove_default( 'priority', 'high' );
			$this->remove_default( 'style', 'default' );
			$this->remove_default( 'position', 'normal' );
		}

		return $this;
	}

	private function parse_block() {
		// Remove block settings.
		if ( 'block' !== $this->object_type ) {
			$params = [
				'description', 'category', 'keywords', 'supports', 'block_context',
				'icon', 'icon_type', 'icon_svg', 'icon_background', 'icon_foreground',
				'render_with', 'render_template', 'render_callback', 'render_code',
				'enqueue_style', 'enqueue_script', 'enqueue_assets'
			];
			foreach ( $params as $param ) {
				unset( $this->{$param} );
			}
			return $this;
		}

		$this->keywords = RWMB_Helpers_Array::from_csv( $this->keywords );

		// Icon.
		if ( 'dashicons' === $this->icon_type ) {
			if ( $this->icon_background || $this->icon_foreground ) {
				$this->icon = [
					'background' => $this->icon_background,
					'foreground' => $this->icon_foreground,
					'src'        => $this->icon,
				];
			}
		}
		if ( 'svg' === $this->icon_type ) {
			$this->icon = $this->icon_svg;
		}
		unset( $this->icon_svg );
		unset( $this->icon_background );
		unset( $this->icon_foreground );
		unset( $this->icon_type );

		// Render options.
		if ( 'callback' === $this->render_with ) {
			unset( $this->render_template );
		}
		if ( 'template' === $this->render_with ) {
			unset( $this->render_callback );
			$this->render_template = $this->replace_variables( $this->render_template );
		}
		if ( 'code' === $this->render_width ) {
			unset( $this->render_template );
			unset( $this->render_callback );
		}
		$this->enqueue_style = $this->replace_variables( $this->enqueue_style );
		$this->enqueue_script = $this->replace_variables( $this->enqueue_script );

		unset( $this->render_with );

		// Context.
		$this->context = $this->block_context;
		unset( $this->block_context );

		return $this;
	}

	private function parse_custom_table() {
		$enable = Arr::get( $this->settings, 'custom_table.enable', false );
		$name = Arr::get( $this->settings, 'custom_table.name', '' );
		if ( $enable && $name ) {
			$this->storage_type = 'custom_table';

			global $wpdb;
			$prefix = Arr::get( $this->settings, 'custom_table.prefix', false );
			$this->table = ( $prefix ? $wpdb->prefix : '' ) . $name;
		}

		unset( $this->custom_table );
		return $this;
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
			unset( $this->tab_style );
			unset( $this->tab_wrapper );
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

	private function parse_location_rules( $key ) {
		if ( ! isset( $this->$key ) ) {
			return $this;
		}

		$data = $this->$key;
		unset( $this->$key );

		$rules = [];
		foreach ( $data['rules'] as $rule ) {
			$value = $rule['value'];
			if ( 'input_value' === $rule['name'] ) {
				$value = wp_list_pluck( $value, 'value', 'key' );
			} elseif ( is_array( $rule['value'] ) ) {
				$value = wp_list_pluck( $value, 'value' );
			}
			$rules[ $rule['name'] ] = $value;
		}
		$type = $data['type'];

		$this->$type = array_merge( [
			'relation' => $data['relation'],
		], $rules );

		return $this;
	}

	private function parse_fields( &$fields ) {
		array_walk( $fields, array( $this, 'parse_field' ) );
		$fields = array_values( array_filter( $fields ) ); // Make sure to remove empty (such as empty groups) or "tab" fields.
	}

	private function parse_field( &$field ) {
		$parser = new Field( $field );
		$parser->parse();
		$field = $parser->get_settings();

		if ( isset( $field['fields'] ) ) {
			$this->parse_fields( $field['fields'] );
		}
	}

	private function replace_variables( $string ) {
		return strtr( $string, [
			'{{ site.path }}'  => wp_normalize_path( ABSPATH ),
			'{{ site.url }}'   => untrailingslashit( home_url( '/' ) ),
			'{{ theme.path }}' => wp_normalize_path( get_stylesheet_directory() ),
			'{{ theme.url }}'  => get_stylesheet_directory_uri(),
		] );
	}
}
