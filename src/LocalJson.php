<?php
namespace MBB;

class LocalJson {
	public function __construct() {
		add_action( 'mbb_after_save', [ $this, 'generate_local_json' ], 10, 3 );
	}

	public function generate_local_json( $parser, $post_id, $raw_data ): bool {
		return self::use_database( compact( 'post_id' ) );
	}

	/**
	 * Check if the local JSON feature is enabled
	 * 
	 * @return bool
	 */
	public static function is_enabled(): bool {
		return ! empty( JsonService::get_paths() );
	}

	/**
	 * Get data from a .json file
	 * 
	 * @param string $file_path
	 * @return array[ $data, $error ]
	 */
	public static function read_file( string $file_path ) {
		if ( ! file_exists( $file_path ) ) {
			return [ null, new \WP_Error( 'file_not_found', __( 'File not found!', 'meta-box-builder' ) ) ];
		}

		if ( ! is_readable( $file_path ) ) {
			return [ null, new \WP_Error( 'file_not_readable', __( 'File not readable!', 'meta-box-builder' ) ) ];
		}

		$data = file_get_contents( $file_path );

		return [ $data, null ];
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
	 * 
	 * @return \WP_Error|boolean
	 */
	public static function import( array $data ): bool {
		return self::sync_json( $data );
	}

	public static function import_many( array $json ): void {
		foreach ( $json as $data ) {
			self::import( $data );
		}
	}

	/**
	 * Use local json file and override database. Currently, its using by REST API
	 * 
	 * @todo: Remove this function and use sync_json() instead.
	 * 
	 * @param array $args
	 * @return bool Success or not
	 */
	public static function use_json( array $args ): bool {
		$post_name  = $args['post_name'];
		$post       = get_page_by_path( $post_name, OBJECT, $args['post_type'] );
		$post_array = [];

		if ( $post ) {
			$post_array = [ 
				'ID' => $post->ID,
				'post_type' => $post->post_type,
			];
		}

		$json = JsonService::get_json( [ 
			'id' => $args['post_name'],
			'post_type' => $args['post_type'],
		] );

		if ( ! $json || ! is_array( $json ) ) {
			return false;
		}

		$json = reset( $json );
		$data = $json['local'];
		$data = Normalizer::normalize( $data );

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
	 * Sync json file with database
	 * 
	 * @param array $data
	 * @return bool Success or not
	 */
	public static function sync_json( array $data ): bool {
		$required_keys = [ 'post_id', 'local' ];

		foreach ( $required_keys as $key ) {
			if ( ! array_key_exists( $key, $data ) ) {
				return false;
			}
		}
		$post_array  = [ 'ID' => $data['post_id'] ];
		$data        = $data['local'];
		$data        = Normalizer::normalize( $data );
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
	 * @param array $args
	 * @return bool Success or not
	 */
	public static function use_database( array $args = [] ): bool {
		if ( isset( $args['post_id'] ) ) {
			$post = get_post( $args['post_id'] );
		} elseif ( isset( $args['post_name'] ) ) {
			$post_type = $args['post_type'] ?? 'meta-box';
			$post = get_page_by_path( $args['post_name'], OBJECT, $post_type );
		} else {
			return false;
		}

		if ( ! $post ) {
			return false;
		}

		$data = JsonService::get_json( [ 'post_id' => $post->ID ] );
		$data = reset( $data );

		if ( ! $data || ! is_array( $data ) || ! isset( $data['remote'] ) ) {
			return false;
		}

		$meta_box = $data['remote'];
		if ( ! self::is_enabled() ) {
			return false;
		}

		$file_path = JsonService::get_paths()[0] . '/' . $post->post_name . '.json';
		$success   = self::write_file( $file_path, $meta_box );

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
