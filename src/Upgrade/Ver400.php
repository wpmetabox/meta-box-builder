<?php
namespace MBB\Upgrade;

use MBB\Helpers\Arr;
use MBB\Helpers\Data;

/**
 * Convert from data for AngularJS to React.
 * - JavaScript data stored in post meta "settings" and "fields" instead of "post_excerpt"
 * - PHP data stored in post meta "meta_box" instead of "post_content"
 */
class Ver400 {
	public function __construct() {
		$query = new \WP_Query( [
			'post_type'              => 'meta-box',
			'post_status'            => 'any',
			'posts_per_page'         => -1,
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		] );

		array_walk( $query->posts, [ $this, 'update_settings' ] );
		// array_walk( $query->posts, [ $this, 'update_fields' ] );
	}

	private function update_settings( $post ) {
		$data = json_decode( $post->post_excerpt, true );
		$new_data = [];

		$this->update_location( $new_data, $data );
		$this->update_include_exclude( $new_data, $data );
		$this->update_show_hide( $new_data, $data );
		$this->update_conditional_logic( $new_data, $data );
		$this->update_block( $new_data, $data );
		$this->update_custom_settings( $new_data, $data );
		$this->update_custom_table( $new_data, $data );

		$this->copy_data( $data, $new_data, ['prefix', 'text_domain', 'tab_style', 'tab_wrapper'] );

		update_post_meta( $post->ID, 'settings', $new_data );
	}

	private function update_location( &$new_data, $data ) {
		// Object type.
		$for = Arr::get( $data, 'for', 'post_types' );
		$object_types = [
			'post_types'     => 'post',
			'taxonomies'     => 'term',
			'settings_pages' => 'setting',
		];
		$new_data['object_type'] = isset( $object_types[ $for ] ) ? $object_types[ $for ] : $for;

		if ( 'post' === $new_data['object_type'] ) {
			$names = ['post_types', 'context', 'priority', 'style', 'default_hidden', 'autosave'];
			$this->copy_data( $data, $new_data, $names );

			// Show in media modal for attachments.
			if ( in_array( 'attachment', $new_data['post_types'] ) ) {
				$new_data['media_modal'] = (bool) Arr::get( $data, 'media_modal' );
			}
		}

		// Taxonomies.
		if ( 'term' === $new_data['object_type'] ) {
			$this->copy_data( $data, $new_data, 'taxonomies' );
		}

		// Settings pages.
		if ( 'setting' === $new_data['object_type'] ) {
			$this->copy_data( $data, $new_data, 'settings_pages' );
		}
	}

	private function update_include_exclude( &$new_data, $data ) {
		$old = Arr::get( $data, 'includeexclude' );
		if ( empty( $old ) ) {
			return;
		}
		$new = [];
		$this->copy_data( $old, $new, ['type', 'relation'] );
		unset( $old['type'], $old['relation'] );

		$rules = [];

		// is_child, custom.
		$names = ['is_child', 'custom'];
		foreach ( $names as $name ) {
			$value = Arr::get( $old, $name );
			unset( $old[ $name ] );
			if ( empty( $value ) ) {
				continue;
			}
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value' );
		}

		// ID, parent.
		$names = ['ID', 'parent'];
		foreach ( $names as $name ) {
			$value = Arr::get( $old, $name );
			unset( $old[ $name ] );
			if ( empty( $value ) ) {
				continue;
			}
			$label = array_map( [ $this, 'get_post_title' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// user_id, edited_user_id.
		$names = ['user_id', 'edited_user_id'];
		foreach ( $names as $name ) {
			$value = Arr::get( $old, $name );
			unset( $old[ $name ] );
			if ( empty( $value ) ) {
				continue;
			}
			$label = array_map( [ $this, 'get_user_display_name' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// user_role, edited_user_role.
		$names = ['user_role', 'edited_user_role'];
		foreach ( $names as $name ) {
			$value = Arr::get( $old, $name );
			unset( $old[ $name ] );
			if ( empty( $value ) ) {
				continue;
			}
			$label = array_map( [ $this, 'get_user_role' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// template.
		$value = Arr::get( $old, 'template' );
		unset( $old['template'] );
		if ( $value ) {
			$label = array_map( [ $this, 'get_template' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// Terms & parent terms.
		foreach ( $old as $name => $value ) {
			$label = array_map( [ $this, 'get_term_name' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		$new['rules'] = $rules;
		$new_data['include_exclude'] = $new;
	}

	private function update_show_hide( &$new_data, $data ) {
		$old = Arr::get( $data, 'showhide' );
		if ( empty( $old ) ) {
			return;
		}
		$new = [];
		$this->copy_data( $old, $new, ['type', 'relation'] );
		unset( $old['type'], $old['relation'] );

		$rules = [];

		// template.
		$value = Arr::get( $old, 'template' );
		unset( $old['template'] );
		if ( $value ) {
			$label = array_map( [ $this, 'get_template' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// post_format.
		$value = Arr::get( $old, 'post_format' );
		unset( $old['post_format'] );
		if ( $value ) {
			$label = array_map( [ $this, 'get_post_format' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		// Terms & parent terms.
		foreach ( $old as $name => $value ) {
			$label = array_map( [ $this, 'get_term_name' ], $value );
			$id = uniqid();
			$rules[ $id ] = compact( 'id', 'name', 'value', 'label' );
		}

		$new['rules'] = $rules;
		$new_data['show_hide'] = $new;
	}

	private function update_conditional_logic( &$new_data, $data ) {
		$old = Arr::get( $data, 'logic' );
		if ( empty( $old ) ) {
			return;
		}
		$new = [];
		$new['type'] = Arr::get( $old, 'visibility' );
		$this->copy_data( $old, $new, 'relation' );

		$rules = [];
		$when = Arr::get( $old, 'when', [] );
		foreach ( $when as $rule ) {
			$id = uniqid();
			$rules[ $id ] = [
				'id'       => $id,
				'name'     => $rule[0],
				'operator' => $rule[1],
				'value'    => $rule[2],
			];
		}

		$new['when'] = $rules;
		$new_data['conditional_lgoic'] = $new;
	}

	private function update_block( &$new_data, $data ) {
		$names = [
			'description', 'icon_type', 'icon', 'icon_svg', 'icon_background', 'icon_foreground',
			'category', 'keywords', 'block_context', 'supports',
			'render_with', 'render_callback', 'render_template', 'render_code',
			'enqueue_style', 'enqueue_script', 'enqueue_assets'
		];
		$this->copy_data( $data, $new_data, $names );
	}

	private function update_custom_settings( $new_data, $data ) {
		$old = Arr::get( $data, 'attrs' );
		if ( empty( $old ) ) {
			return;
		}
		$new = [];
		foreach ( $old as $item ) {
			$id = uniqid();
			$new[ $id ] = array_merge( ['id' => $id], $item );
		}
		$new_data['custom_settings'] = $new;
	}

	private function update_custom_table( $new_data, $data ) {
		$old = Arr::get( $data, 'table' );
		if ( empty( $old ) ) {
			return;
		}
		$new = [
			'enable' => true,
			'name' => $old,
		];
		$new_data['custom_table'] = $new;
	}

	private function update_fields( $post ) {
	}

	private function copy_data( $source, &$destination, $name ) {
		if ( is_string( $name ) ) {
			$value = Arr::get( $source, $name );
			if ( null !== $value ) {
				$destination[ $name ] = $value;
			}
			return;
		}
		foreach( $name as $n ) {
			$value = Arr::get( $source, $n );
			if ( null !== $value ) {
				$destination[ $name ] = $value;
			}
		}
	}

	private function get_post_title( $post_id ) {
		return get_post( $post_id )->post_title;
	}

	private function get_user_display_name( $user_id ) {
		return get_userdata( $user_id )->display_name;
	}

	private function get_user_role( $role ) {
		global $wp_roles;

		$roles = $wp_roles->roles;
		return isset( $roles[ $role ] ) ? $roles[ $role ]['name'] : $role;
	}

	private function get_template( $file ) {
		$templates = Data::get_templates();

		// Group templates by file, which eliminates duplicates templates for multiple post types.
		$items = [];
		foreach ( $templates as $template ) {
			if ( empty( $s ) || false !== strpos( strtolower( $template['name'] ), $s ) ) {
				$items[ $template['file'] ] = $template['name'];
			}
		}

		return isset( $items[ $file ] ) ? $items[ $file ] : $file;
	}

	private function get_term_name( $term_id ) {
		return get_term( $term_id )->name;
	}

	private function get_post_format( $format ) {
		$items = Data::get_post_formats();
		return isset( $items[ $format ] ) ? $items[ $format ] : $format;
	}
}
