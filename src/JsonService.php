<?php
namespace MBB;

class JsonService {
	/**
	 * @todo: Check case where db exists but local doesn't
	 * @param array $params
	 * @return array[]
	 */
	public static function get_json( array $params = [] ): ?array {
		$files = self::get_files();
		// key by meta box id
		$items = [];
		foreach ( $files as $file ) {
			$data = LocalJson::read_file( $file );

			if ( $data instanceof \WP_Error ) {
				continue;
			}

			$json = json_decode( $data, true );

			if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $json ) ) {
				continue;
			}

			$local_normalized = Normalizer::normalize( $json );
			ksort( $local_normalized );

			$items[ $json['id'] ] = [ 
				'file' => $file,
				'local' => $json,
				'local_normalized' => $local_normalized,
				'is_newer' => false,
				'post_id' => null,
				'id' => $json['id'],
				'remote' => null,
				'diff' => null,
			];
		}

		$meta_boxes = self::get_meta_boxes();
		foreach ( $meta_boxes as $meta_box ) {
			ksort( $meta_box );
			$id = $meta_box['id'];

			// No file found
			if ( ! isset( $items[ $id ] ) ) {
				$left = empty( $meta_box ) ? '' : wp_json_encode( $meta_box, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

				$diff = wp_text_diff( $left, '', [ 
					'show_split_view' => true,
				] );

				$items[ $id ] = [ 
					'id' => $id,
					'is_newer' => false,
					'diff' => $diff,
					'local' => null,
					'local_normalized' => null,
					'post_id' => $meta_box['post_id'],
					'remote' => $meta_box,
				];

				continue;
			}

			$is_newer = version_compare( $items[ $id ]['local_normalized']['version'], $meta_box['version'] ?? 'v0' );
			if ( empty( $meta_box ) ) {
				$is_newer = true;
			}

			$left = empty( $meta_box ) ? '' : wp_json_encode( $meta_box, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

			$diff = wp_text_diff( $left, wp_json_encode( $items[ $id ]['local_normalized'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ), [ 
				'show_split_view' => true,
			] );

			$items[ $id ] = array_merge( $items[ $id ], [ 
				'id' => $id,
				'is_newer' => $is_newer,
				'remote' => $meta_box,
				'diff' => $diff,
				'post_id' => $meta_box['post_id'],
			] );
		}

		// Filter by params
		if ( isset( $params['id'] ) ) {
			$items = array_filter( $items, function ($item) use ($params) {
				return $item['id'] == $params['id'];
			} );
		}

		foreach ( [ 'is_newer', 'post_id', 'file' ] as $key ) {
			if ( isset( $params[ $key ] ) ) {
				foreach ( $items as $item ) {
					if ( isset( $item[ $key ] ) && $item[ $key ] == $params[ $key ] ) {
						$items[] = $item;
					}
				}
			}
		}

		return $items;
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
			$post_data = [];

			if ( $post->post_type === 'meta-box' ) {
				$meta_box = get_post_meta( $post->ID, 'meta_box', true );
				$settings = get_post_meta( $post->ID, 'settings', true );
				if ( ! is_array( $settings ) || ! is_array( $meta_box ) ) {
					continue;
				}

				$post_data            = array_merge( $post_data, $meta_box );
				$post_data            = Normalizer::normalize( $post_data );
				$post_data['version'] = $settings['version'] ?? 'v0';

				// Extra post id for filtering
				$post_data['post_id'] = $post->ID;
			} else {
				// @todo: Check export for other post types
				$post_data = [ 
					'post_type' => $post->post_type,
					'post_name' => $post->post_name,
					'post_title' => $post->post_title,
					'post_date' => $post->post_date,
					'post_status' => $post->post_status,
					'post_content' => $post->post_content,
				];
				$meta_keys = Export::get_meta_keys( $post->post_type );

				foreach ( $meta_keys as $meta_key ) {
					$post_data[ $meta_key ] = get_post_meta( $post->ID, $meta_key, true );
				}
			}

			$meta_boxes[ $post->ID ] = $post_data;
		}

		return $meta_boxes;
	}

	/**
	 * Get all meta box .json files
	 * 
	 * @return string[]
	 */
	public static function get_files(): array {
		$paths = self::get_paths();

		$all_files = [];

		foreach ( $paths as $path ) {
			$files = glob( "$path/*.json" );

			foreach ( $files as $file ) {
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
		// 	wp_mkdir_p( $mb_json_path );
		// }

		return $mb_json_paths;
	}
}
