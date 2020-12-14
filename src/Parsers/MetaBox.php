<?php
namespace MBB\Parsers;

use RWMB_Helpers_Array;

class MetaBox extends Base {
	public function parse() {
		$this->parse_boolean_values()
			->parse_numeric_values()
			->parse_location()
			->parse_location_rules( 'show_hide' )
			->parse_location_rules( 'include_exclude' )
			->parse_block()
			->parse_custom_settings()
			->parse_conditional_logic()
			->parse_tabs()
			->set_fields_tab()
			->parse_custom_table();

		if ( isset( $this->settings['fields'] ) && is_array( $this->settings['fields'] ) ) {
			$this->parse_fields( $this->settings['fields'] );

			// Online Generator uses field IDs as array index. We don't need that in the output.
			$this->fields = array_values( $this->fields );
		}

		unset( $this->is_id_modified );

		$this->remove_empty_values();
	}

	private function parse_location() {
		$object_type = $this->object_type ? $this->object_type : 'post';
		unset( $this->object_type );

		if ( in_array( $object_type, ['user', 'comment', 'block'], true ) ) {
			unset( $this->$object_type );
			$this->type = $object_type;
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
		if ( $this->table_enable ) {
			$this->storage_type = 'custom_table';

			global $wpdb;
			$this->table = ( $this->table_prefix ? $wpdb->prefix : '' ) . $this->table_name;
		}

		$params = [
			'table_enable', 'table_name', 'table_prefix', 'table_create',
		];
		foreach ( $params as $param ) {
			unset( $this->{$param} );
		}
		return $this;
	}

	private function parse_tabs() {
		$this->tabs = [];
		if ( ! empty( $this->fields ) ) {
			foreach ( $this->fields as $field ) {
				if ( empty( $field['type'] ) || 'tab' !== $field['type'] ) {
					continue;
				}

				$label = isset( $field['label'] ) ? $field['label'] : '';
				$icon  = isset( $field['icon'] ) ? $field['icon'] : '';

				$this->settings['tabs'][ $field['id'] ] = compact( 'label', 'icon' );
			}
		}

		if ( empty( $this->tabs ) ) {
			unset( $this->tab_style );
			unset( $this->tab_wrapper );
		}

		return $this;
	}

	private function set_fields_tab() {
		$tab = ! empty( $this->settings['fields'][0]['type'] ) ? $this->settings['fields'][0]['type'] : '';
		if ( 'tab' !== $tab ) {
			return $this;
		}

		$previous_tab = 0;

		foreach ( $this->settings['fields'] as $index => $field ) {
			if ( 'tab' === $field['type'] ) {
				$previous_tab = $index;
			} else {
				$this->settings['fields'][ $index ]['tab'] = $this->settings['fields'][ $previous_tab ]['id'];
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
		$fields = array_filter( $fields ); // Make sure to remove empty (such as empty groups) or "tab" fields.
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

	private function replace_variables( $string ) {
		return strtr( $string, [
			'{{ site.path }}'  => wp_normalize_path( ABSPATH ),
			'{{ site.url }}'   => untrailingslashit( home_url( '/' ) ),
			'{{ theme.path }}' => wp_normalize_path( get_stylesheet_directory() ),
			'{{ theme.url }}'  => get_stylesheet_directory_uri(),
		] );
	}
}
