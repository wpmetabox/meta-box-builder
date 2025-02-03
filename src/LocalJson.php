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

		$data = Normalizer::normalize( $data );
		$meta_fields = Export::get_meta_keys( $data['post_type'] );

		wp_update_post( [ 
			'ID'           => $post_id,
			'post_name'    => $data['post_name'],
			'post_title'   => $data['post_title'],
			'post_date'    => $data['post_date'],
			'post_status'  => $data['post_status'],
			'post_content' => $data['post_content'],
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

		$meta_box = get_post_meta( $post->ID, 'meta_box', true );
		$settings = get_post_meta( $post->ID, 'settings', true );

		// Add version for the meta box
		$meta_box['version'] = $settings['version'] ?? 'v0';

		// Add schema, and it should be the first item
		$meta_box = array_merge( [ '$schema' => 'https://schemas.metabox.io/field-group.json' ], $meta_box );

		$output = wp_json_encode( $meta_box, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );
		file_put_contents( $file_path, $output );

        return true;
	}
}
