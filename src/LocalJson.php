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

		return self::use_database( $post_id );
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

	public static function import_many( array $file_paths ) {
		foreach ( $file_paths as $file_path ) {
			self::import( $file_path );
		}
	}

	/**
	 * Use local json file and override database
	 * 
	 * @param int $post_id
	 * @return bool
	 */
	public static function use_json( int $post_id ) {
		$json = JsonService::get_json( [ 'post_id' => $post_id ] );
		if ( ! $json || ! is_array( $json ) ) {
			return false;
		}

		$json = reset( $json );
		$data = $json['local_normalized'];

		$meta_fields = Export::get_meta_keys( $data['post_type'] );

		wp_update_post( [ 
			'ID' => $post_id,
			'post_name' => $data['post_name'],
			'post_title' => $data['post_title'],
			'post_date' => $data['post_date'],
			'post_status' => $data['post_status'],
			'post_content' => $data['post_content'],
		] );

		foreach ( $meta_fields as $meta_key ) {
			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		return true;
	}

	/**
	 * Use database and override local json file
	 * 
	 * @param mixed $post
	 * @param string $file_path
	 * @return bool
	 */
	public static function use_database( int $post_id ) {
		$post = get_post( $post_id );
		
		if ( ! $post ) {
			return false;
		}

		$file_name    = $post->post_name ?: sanitize_key( $post->post_title );
		$mb_json_path = JsonService::get_paths()[0];
		$file_path    = "$mb_json_path/$file_name.json";

		$meta_box = get_post_meta( $post_id, 'meta_box', true );
		$settings = get_post_meta( $post_id, 'settings', true );

		// Add version for the meta box
		$meta_box['version'] = $settings['version'] ?? 'v' . time();

		// Add schema, and it should be the first item
		$meta_box = array_merge( [ '$schema' => 'https://schemas.metabox.io/field-group.json' ], $meta_box );

		$success = self::write_file( $file_path, $meta_box );

		if ( is_wp_error( $success ) ) {
			// Return an error message.
			$data = get_post_meta( $post_id, 'data', true );

			if ( ! is_array( $data ) ) {
				$data = [];
			}

			$data['json_path_error'] = __( 'JSON path is not writable. Please check the folder permission.', 'meta-box-builder' );

			update_post_meta( $post_id, 'data', $data );

			return false;
		}

		return true;
	}
}
