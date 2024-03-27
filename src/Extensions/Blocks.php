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
			if ( empty( $meta_box['block_path'] ) ) {
				continue;
			}

			if ( ! file_exists( $meta_box['block_path'] ) ) {
				continue;
			}

			// Now we register the block with the provided path
			register_block_type( $meta_box['block_path'] );
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
			'path'   => '{{ theme.path }}/blocks',
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
			'render'      => "file:./{$block_id}.php",
			'supports'    => [ 
				'html'   => false,
				'anchor' => false,
				'align'  => true,
			],
			'style'      => "file:./{$block_id}.css",
			'viewScript' => "file:./{$block_id}.js",
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

		foreach ( $fields as $id => $field ) {
			[ $type, $std ] = $this->get_field_type_and_default_value( $field );

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

		$is_multiple = ( isset( $field['multiple'] ) && $field['multiple'] )
			|| ( isset( $field['type'] ) && in_array( $field['type'], $array_fields ) )
			|| ( isset( $field['field_type'] ) && in_array( $field['field_type'], [ 'select_tree', 'checkbox_tree', 'checkbox_list', 'checkbox_tree' ] ) );

		$is_cloneable = $field['clone'];

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
		$block_id   = $settings['id'];
		$block_path = $settings['block_json']['path'];

		$parent_block_path = dirname( $block_path );

		// If the block path contains the block ID, we assume that people want to create a block manually.
		// otherwise, we create a folder with the block ID.
		if ( ! str_contains( $block_path, $block_id ) ) {
			$block_path .= '/' . $block_id;
		}

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
			mkdir( $block_path, 0775, true );
		}

		$block_metadata = $this->generate_block_metadata( $settings, $raw_data );

		// Get all files in views/block-stubs folder.   
		$stubs_dir = MBB_DIR . '/views/block-stubs';
		$stubs     = scandir( $stubs_dir );

		foreach ( $stubs as $stub ) {
			if ( in_array( $stub, [ '.', '..' ] ) ) {
				continue;
			}

			$stub_file = "$stubs_dir/$stub";

			// Remove the .stub extension.
			if ( ! file_exists( $stub_file ) ) {
				continue;
			}

			// Copy the stub file to the block folder.
			$file_name = str_replace( '.stub', '', $stub );
			$file_name = str_replace( 'block', $block_id, $file_name );

			// We handle the render file separately.
			if ( $stub === 'block.php.stub' ) {
				$stub_content      = file_get_contents( $stub_file );
				$fields_output     = '';
				$attributes_output = '';

				foreach ( $settings['fields'] as $field ) {
					$fields_output .= "<div><?php mb_the_block_field( '{$field['id']}' ); ?></div>\n\t";
					[ $type ]      = $this->get_field_type_and_default_value( $field );

					// Because type=object is converted to array
					$type = $type === 'object' ? 'array' : $type;

					$attributes_output .= "\n *\t{$field['id']}: {$type},";
				}

				$attributes_output = rtrim( $attributes_output, ',' );
				$attributes_output .= "\n *";

				$stub_content = strtr( $stub_content, [ 
					'{{ fields }}' => $fields_output,
					'{{ types }}' => $attributes_output,
				] );

				file_put_contents( "$block_path/$file_name", $stub_content );
			}

			if ( $stub !== 'block.php.stub' ) {
				copy( $stub_file, "$block_path/$file_name" );
			}

			// Allows developers to modify the file directly.
			chmod( $block_path . '/' . $file_name, 0664 );
		}

		// Save the block metadata to the block folder.
		file_put_contents( "$block_path/block.json", $block_metadata );
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
		if ( ! str_contains( $path, ABSPATH ) ) {
			return false;
		}

		$relative_path = str_replace( ABSPATH, '', $path );
		$relative_path = explode( '/', $relative_path );

		// Traverse the path and check if the directories are writable
		for ( $i = 0; $i < count( $relative_path ); $i++ ) {
			$dir = ABSPATH . implode( '/', array_slice( $relative_path, 0, $i + 1 ) );

			if ( file_exists( $dir ) && is_dir( $dir ) ) {
				if ( ! is_writable( $dir ) ) {
					return false;
				}

				continue;
			}

			if ( ! is_writable( dirname( $dir ) ) ) {
				return false;
			}
		}

		return true;
	}
}
