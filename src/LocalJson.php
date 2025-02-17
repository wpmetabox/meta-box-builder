<?php
namespace MBB;

class LocalJson {
	public function __construct() {
		add_action( 'mbb_after_save', [ $this, 'generate_local_json' ], 10, 3 );
	}

	public function generate_local_json( $parser, $post_id, $raw_data ) {
		// $post         = get_post( $post_id );
		// $file_name    = $post->post_name ?: sanitize_key( $post->post_title );
		// $mb_json_path = get_template_directory() . '/mb-json';
		// $file_path    = "$mb_json_path/$file_name.json";

		return self::use_database( compact( 'post_id' ) );
	}

	public static function read_file( string $file_path ) {
		if ( ! file_exists( $file_path ) ) {
			return new \WP_Error( 'file_not_found', __( 'File not found!', 'meta-box-builder' ) );
		}

		if ( ! is_readable( $file_path ) ) {
			return new \WP_Error( 'file_not_readable', __( 'File not readable!', 'meta-box-builder' ) );
		}

		$data = file_get_contents( $file_path );

		return $data;
	}

	public static function write_file( string $file_path, array $data ) {
		if ( ! is_writable( dirname( $file_path ) ) ) {
			return new \WP_Error( 'file_not_writable', __( 'File not writable!', 'meta-box-builder' ) );
		}

		if ( ! is_dir( dirname( $file_path ) ) ) {
			wp_mkdir_p( dirname( $file_path ) );
		}

		$output = wp_json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );

		return file_put_contents( $file_path, $output );
	}

	/**
	 * Import from .json file
	 * @param string $file_path
	 * 
	 * @return \WP_Error|boolean
	 */
	public static function import( string $file_path ) {
		$data = self::read_file( $file_path );

		return Import::import_json( $data );
	}

	public static function import_many( array $file_paths ): void {
		foreach ( $file_paths as $file_path ) {
			self::import( $file_path );
		}
	}

	/**
	 * Use local json file and override database
	 * 
	 * @param array $args
	 * @return bool Success or not
	 */
	public static function use_json( array $args ): bool {
		$post_name = $args['post_name'];
		// @todo: fix hardcode meta-box post type to support other post types
		$post       = get_page_by_path( $post_name, OBJECT, 'meta-box' );
		$post_array = [];

		if ( $post ) {
			$post_array = [ 'ID' => $post->ID ];
		}

		$json = JsonService::get_json( [ 
			'id' => $args['post_name'],
		] );

		if ( ! $json || ! is_array( $json ) ) {
			return false;
		}

		$json = reset( $json );
		$data = $json['local_minimized'];

		$meta_fields = Export::get_meta_keys( $data['post_type'] );
		$post_array  = array_merge( $post_array, [ 
			'post_type' => $data['post_type'],
			'post_name' => $data['post_name'],
			'post_title' => $data['post_title'],
			'post_date' => $data['post_date'],
			'post_status' => $data['post_status'],
			'post_content' => $data['post_content'],
		] );

		$post_id = wp_insert_post( $post_array );

		foreach ( $meta_fields as $meta_key ) {
			if ( ! isset( $data[ $meta_key ] ) ) {
				continue;
			}

			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		return true;
	}

	/**
	 * Use database and override local json file
	 * 
	 * @param int|string $post_id
	 * @return bool Success or not
	 */
	public static function use_database( array $args = [] ): bool {
		if ( isset( $args['post_id'] ) ) {
			$post = get_post( $args['post_id'] );
		} elseif ( isset( $args['post_name'] ) ) {
			$post = get_page_by_path( $args['post_name'], OBJECT, 'meta-box' );
		} else {
			return false;
		}

		if ( ! $post ) {
			return false;
		}

		$data = JsonService::get_json( [ 'id' => $post->post_name ] );
		$data = reset( $data );

		$meta_box = $data['remote']['meta_box'];
		// Add schema to the meta box
		$meta_box = array_merge( [ '$schema' => 'https://schemas.metabox.io/field-group.json' ], $meta_box );

		$file_path = JsonService::get_paths()[0] . '/' . $post->post_name . '.json';

		$success = self::write_file( $file_path, $meta_box );

		if ( is_wp_error( $success ) ) {
			// Return an error message.
			$data = get_post_meta( $post->ID, 'data', true );

			if ( ! is_array( $data ) ) {
				$data = [];
			}

			$data['json_path_error'] = __( 'JSON path is not writable. Please check the folder permission.', 'meta-box-builder' );

			update_post_meta( $post->ID, 'data', $data );

			return false;
		}

		return true;
	}
}
