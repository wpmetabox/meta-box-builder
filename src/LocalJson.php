<?php
namespace MBB;

class LocalJson {
	public function __construct() {
		add_action( 'mbb_after_save', [ $this, 'generate_local_json' ], 10, 3 );
	}

	public function generate_local_json( $parser, $post_id, $raw_data ) {
		$post         = get_post( $post_id );
		$file_name    = $post->post_name ?: sanitize_key( $post->post_title );
		$mb_json_path = get_template_directory() . '/mb-json';
		$file_path    = "$mb_json_path/$file_name.json";

		return self::update_local( $post, $file_path );
	}

	/**
	 * Import from .json file
	 * @param string $file_path
	 * 
	 * @return \WP_Error|boolean
	 */
	public static function import( string $file_path ) {
		if ( ! file_exists( $file_path ) ) {
			return new \WP_Error( 'file_not_found', __( 'File not found!', 'meta-box-builder' ) );
		}

		$data = file_get_contents( $file_path );

		return Import::import_json( $data );
	}

	public static function import_many( array $file_paths ) {
		foreach ( $file_paths as $file_path ) {
			if ( ! file_exists( $file_path ) ) {
				continue;
			}
			
			self::import( $file_path );
		}
	}

	public static function update_remote( int $post_id, string $file_path ) {
		if ( ! file_exists( $file_path ) ) {
			return new \WP_Error( 'file_not_found', __( 'File not found!', 'meta-box-builder' ) );
		}

		$data = json_decode( file_get_contents( $file_path ), true );

		$meta_fields = Export::get_meta_keys( $data['post_type'] );

		// Post fields is data except meta fields
		$post_fields = array_diff( array_keys( $data ), $meta_fields );

		$post_data = [];
		foreach ( $post_fields as $field ) {
			$post_data[ $field ] = $data[ $field ];
		}

		wp_update_post( [ 
			'ID' => $post_id,
			'post_name' => $post_data['post_name'],
			'post_title' => $post_data['post_title'],
			'post_date' => $post_data['post_date'],
			'post_status' => $post_data['post_status'],
			'post_content' => $post_data['post_content'],
		] );

		foreach ( $meta_fields as $meta_key ) {
			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		return true;
	}

	public static function update_local( $post, string $file_path ) {
		if ( ! is_object( $post ) ) {
			$post = get_post( $post );
		}

		$meta_keys = Export::get_meta_keys( $post->post_type );

		$post_data = [ 
			'post_type' => $post->post_type,
			'post_name' => $post->post_name,
			'post_title' => $post->post_title,
			'post_date' => $post->post_date,
			'post_status' => $post->post_status,
			'post_content' => $post->post_content,
		];

		foreach ( $meta_keys as $meta_key ) {
			$post_data[ $meta_key ] = get_post_meta( $post->ID, $meta_key, true );
		}

		// Add version for the meta box
		$post_data['settings']['version'] = $post_data['settings']['version'] ?? 'v' . time();

		$output = wp_json_encode( $post_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );
		file_put_contents( $file_path, $output );

        return true;
	}
}
