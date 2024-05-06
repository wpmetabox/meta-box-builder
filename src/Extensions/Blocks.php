<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Blocks {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-blocks' ) ) {
			return;
		}
		add_filter( 'mbb_settings_controls', [ $this, 'add_settings_controls' ] );
		add_filter( 'mbb_app_data', [ $this, 'add_app_data' ] );
		add_action( 'mbb_after_save', [ $this, 'generate_block_json' ], 10, 3 );
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	public function register_blocks() {
		$query = new \WP_Query( [ 
			'post_type' => 'meta-box',
			'post_status' => 'publish',
			'posts_per_page' => -1,
			'no_found_rows' => true,
			'fields' => 'ids',
			'update_post_term_cache' => false,
		] );

		foreach ( $query->posts as $post_id ) {
			$meta_box = get_post_meta( $post_id, 'meta_box', true );

			if ( empty( $meta_box ) ) {
				continue;
			}

			// Bail if this is not a block.
			if ( empty( $meta_box['type'] ) || 'block' !== $meta_box['type'] ) {
				continue;
			}

			// Bail if block path is empty.
			if ( empty( $meta_box['block_json'] ) || empty( $meta_box['block_json']['path'] ) ) {
				continue;
			}

			if ( ! isset( $meta_box['block_json']['enable'] )
				|| ! $meta_box['block_json']['enable']
				|| ! file_exists( $meta_box['block_json']['path']
				|| isset( $meta_box['function_name'] )
				|| isset( $meta_box['render_template'] )
				) ) {
				continue;
			}

			// Now we register the block with the provided path
			register_block_type( trailingslashit( $meta_box['block_json']['path'] ) . $meta_box['id'] );
		}
	}

	public function add_settings_controls( $controls ) {
		$controls[12] = Control::Block( 'block' );
		return $controls;
	}

	public function add_app_data( array $data ) {
		$data['blockCategories'] = wp_list_pluck( get_block_categories( get_post() ), 'title', 'slug' );
		$data['settings']        = is_array( $data['settings'] ) ? $data['settings'] : [];

		$block_json_settings = $data['settings']['block_json'] ?? [ 
			'enable' => true,
			'path' => '{{ theme.path }}/blocks',
		];

		$data['settings']['block_json'] = $block_json_settings;

		return $data;
	}

	public function generate_block_json( $parser, $post_id, $raw_data ) {
		$settings = $parser->get_settings();

		// Bail if this is not a block.
		if ( ! isset( $settings['type'] ) || $settings['type'] !== 'block' ) {
			return;
		}

		// Bail if block path is empty.
		if ( empty( $settings['block_json'] ) || ! $settings['block_json']['enable'] ) {
			return;
		}

		$this->generate_block_package( $settings, $post_id, $raw_data );
	}

	private function generate_block_metadata( array $settings, array $raw_data ): string {
		$block_id = sanitize_title( $settings['title'] );

		$metadata = [ 
			'$schema'     => "https://schemas.wp.org/trunk/block.json",
			'apiVersion'  => 3,
			'version'     => 'v' . time(),
			'name'        => "meta-box/{$block_id}",
			'title'       => $settings['title'] ?? '',
			'description' => $settings['description'] ?? '',
			'category'    => $settings['category'] ?? 'common',
			'icon'        => $settings['icon'] ?? 'admin-generic',
			'keywords'    => $settings['keywords'] ?? [],
			'supports' => [ 
				'html'   => false,
				'anchor' => false,
				'align'  => true,
			],
		];

		// Add fields to block metadata attributes.
		$attributes             = $this->generate_block_attributes( $raw_data['fields'] );
		$metadata['attributes'] = $attributes;

		$metadata_json = json_encode( $metadata, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );

		return $metadata_json;
	}

	/**
	 * Generate block metadata attribute
	 * 
	 * If field is multiple or clone, then field type is array.
	 * If field type is number, then field type is number.
	 * Otherwise, field type is string.
	 * 
	 * @todo: Add support for other field types. For example, enum.
	 */
	private function generate_block_attributes( array $fields ) {
		$attributes = [];

		foreach ( $fields as $field ) {
			$id       = $field['id'];
			$type_std = $this->get_field_type_and_default_value( $field );

			if ( is_null( $type_std ) ) {
				continue;
			}

			[ $type, $std ] = $type_std;

			$attributes[ $id ] = [ 
				'type' => $type,
			];

			if ( $std ) {
				$attributes[ $id ]['default'] = $std;
			}
		}

		return $attributes;
	}

	private function get_field_type_and_default_value( $field ) {
		$type = 'string';
		$std  = $field['std'] ?? null;

		// These fields returns array
		$array_fields = [ 
			'group',
			'checkbox_list',
			'file_advanced',
			'autocomplete',
			'file_upload',
			'file',
			'image',
			'image_advanced',
			'image_upload',
			'key_value',
		];

		if ( ! isset( $field['type'] ) || ! isset( $field['std'] ) || ! isset( $field['id'] ) ) {
			return;
		}

		$is_multiple = ( isset( $field['multiple'] ) && $field['multiple'] )
			|| ( isset( $field['type'] ) && in_array( $field['type'], $array_fields ) )
			|| ( isset( $field['field_type'] ) && in_array( $field['field_type'], [ 'select_tree', 'checkbox_tree', 'checkbox_list', 'checkbox_tree' ] ) );

		$is_cloneable = $field['clone'] ?? false;

		if ( $is_multiple || $is_cloneable ) {
			$type = 'array';
			$std  = is_array( $field['std'] ) ? $field['std'] : [];
		}

		if ( in_array( $field['type'], [ 'number', 'slider', 'range' ] ) ) {
			$type = 'number';
			$std  = is_numeric( $field['std'] ) ? $field['std'] : 0;
		}

		if ( in_array( $field['type'], [ 'checkbox', 'switch' ] ) ) {
			$type = 'boolean';
			$std  = (bool) $field['std'];
		}

		if ( in_array( $field['type'], [ 'single_image', 'file_input' ] ) ) {
			$type = 'object';
			$std  = new \stdClass();
		}

		return [ $type, $std ];
	}

	private function generate_block_package( array $settings, $post_id, $raw_data ): void {
		$block_id          = $settings['id'];
		$block_path        = trailingslashit( $settings['block_json']['path'] ) . $block_id;
		$parent_block_path = dirname( $block_path );


		if ( ! self::is_future_path_writable( $parent_block_path ) ) {
			// Return an error message.
			$data = get_post_meta( $post_id, 'data', true );

			if ( ! is_array( $data ) ) {
				$data = [];
			}

			$data['block_path_error'] = __( 'Block path is not writable. Please check the folder permission.', 'meta-box-builder' );

			update_post_meta( $post_id, 'data', $data );

			return;
		}

		if ( ! file_exists( $block_path ) ) {
			wp_mkdir_p( $block_path );
		}

		$block_metadata = $this->generate_block_metadata( $settings, $raw_data );

		// Save the block metadata to the block folder.
		file_put_contents( "$block_path/block.json", $block_metadata );
		chmod( $block_path . '/block.json', 0664 );
	}

	/**
	 * Check if the intended path is writable.
	 * 
	 * Because is_writable() only checks the existing path, and returns false if the path doesn't exist,
	 * this method checks if we can create the path, also do the additional security check to make sure the path is inside 
	 * the WordPress installation.
	 */
	public static function is_future_path_writable( string $path ): bool {
		$path = trailingslashit( $path );

		// For security, we only allow the path inside the current WordPress installation.
		if ( ! str_starts_with( $path, wp_normalize_path( ABSPATH ) ) ) {
			return false;
		}

		$paths = explode( '/', $path );

		// Traverse from the leaf to the root to get the first existing directory
		// and check if it's writable
		while ( count( $paths ) > 1 ) {
			array_pop( $paths );
			$path_str = implode( '/', $paths );

			if ( file_exists( $path_str ) ) {
				break;
			}
		}

		return is_dir( $path_str ) && is_writable( $path_str );
	}
}
