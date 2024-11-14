<?php
namespace MBB;

class JsonService
{
    private static function get_meta_box_by_meta_box_id( string $meta_box_id ): array {
		$meta_boxes = self::get_meta_boxes();

		// Filter by meta box id
		$meta_box = array_filter( $meta_boxes, function ($meta_box) use ( $meta_box_id ) {
			return $meta_box['meta_box']['id'] === $meta_box_id;
		} );

		// Get the first key of array
		$keys = array_keys( $meta_box );

		// No posts found, return empty array
		if ( empty( $keys ) ) {
			return [ 
				null,
				[ 
					'settings' => [ 'version' => 'v0' ],
				],
			];
		}

		// [post_id, meta_box]
		return [ $keys[0], $meta_box[ $keys[0] ] ];
	}

    private static function get_sync_status( $file ) {
		$local = json_decode( file_get_contents( $file ), true );
		$mb_id = $local['meta_box']['id'] ?? $local['post_name'];

		[ $post_id, $remote ] = self::get_meta_box_by_meta_box_id( $mb_id );

		$is_newer = version_compare( $local['settings']['version'], $remote['settings']['version'] );

		$diff = wp_text_diff( wp_json_encode( $local, JSON_PRETTY_PRINT ), wp_json_encode( $remote, JSON_PRETTY_PRINT ), [ 
			'title_left' => esc_html__( 'Local', 'meta-box-builder' ),
			'title_right' => esc_html__( 'Remote', 'meta-box-builder' ),
		] );

		return compact( 'is_newer', 'local', 'remote', 'diff', 'post_id', 'file', 'mb_id' );
	}

    public static function get_json(): ?array {
        $files = self::get_files();

        $json = [];
        foreach ( $files as $file ) {
            $mid          = rtrim( basename( $file ), '.json' );
            $json[ $mid ] = self::get_sync_status( $file );
        }

		return $json;
    }

    public static function get_meta_boxes(): array {
        $query = new \WP_Query( [ 
			'post_type' => 'meta-box',
			'posts_per_page' => -1,
			'no_found_rows' => true,
			'update_post_term_cache' => false,
		] );

		$meta_boxes = [];
		foreach ( $query->posts as $post ) {
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

			if ( ! is_array( $post_data ) ) {
				continue;
			}

			$post_data['settings']['version'] = $post_data['settings']['version'] ?? 'v0';
			$meta_boxes[ $post->ID ]          = $post_data;
		}

        return $meta_boxes;
    }

    public static function get_files(): array {
        $paths = self::get_paths();

        $all_files = [];

        foreach ($paths as $path) {
            $files = glob( "$path/*.json" );

            foreach ($files as $file) {
                $all_files[] = $file;
            }
        }

        return $all_files;
    }

    public static function get_paths() {
		$theme_path    = get_template_directory();
		$mb_json_paths = [];

        if ( file_exists( "$theme_path/mb-json" ) ) {
            $mb_json_paths[] = "$theme_path/mb-json";
        }
        
		$mb_json_paths = apply_filters( 'mb_json_paths', $mb_json_paths );

		// @todo: Should we create the directory if it doesn't exist?
		// if ( ! is_dir( $mb_json_path ) ) {
		// 	mkdir( $mb_json_path );
		// }

		return $mb_json_paths;
	}
}
