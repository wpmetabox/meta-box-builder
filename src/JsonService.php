<?php
namespace MBB;

class JsonService {

	/**
	 * @param array $params
	 * @return array[]
	 */
	public static function get_json( array $params = [] ): ?array {
		$files = self::get_files();
		// key by meta box id
		$items = [];
		foreach ( $files as $file ) {
			[ $data, $error ] = LocalJson::read_file( $file );

			if ( $data === null || $error !== null ) {
				continue;
			}

			$json = json_decode( $data, true );

			if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $json ) ) {
				continue;
			}

			$unparser = new \MBBParser\Unparsers\MetaBox( $json );
			$unparser->unparse();
			$json = $unparser->get_settings();
			$local_minimized = Normalizer::minimize( $json );
			ksort( $local_minimized );

			$diff = wp_text_diff( '', wp_json_encode( $local_minimized, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ), [ 
				'show_split_view' => true,
			] );

			$items[ $json['id'] ] = [ 
				'file' => $file,
				'local' => $json,
				'local_minimized' => $local_minimized,
				'is_newer' => true,
				'post_id' => null,
				'post_type' => Normalizer::detect_post_type( $json ),
				'id' => $json['id'],
				'remote' => null,
				'diff' => $diff,
			];
		}

		$post_type  = $params['post_type'] ?? 'meta-box';
		$post_status = $params['post_status'] ?? 'publish';

		$meta_boxes = self::get_meta_boxes( compact( 'post_type', 'post_status' ) );
		foreach ( $meta_boxes as $meta_box ) {
			ksort( $meta_box );
			$id      = $meta_box['id'];
			$post_id = $meta_box['post_id'];
			$post_type = $meta_box['post_type'];

			// Remove post_id, post_type to avoid diff
			unset( $meta_box['post_id'] );
			unset( $meta_box['post_type'] );

			// No file found
			if ( ! isset( $items[ $id ] ) ) {
				$left = empty( $meta_box ) ? '' : wp_json_encode( $meta_box, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

				$diff = wp_text_diff( $left, '', [ 
					'show_split_view' => true,
				] );

				$items[ $id ] = [ 
					'id' => $id,
					'is_newer' => -1,
					'diff' => $diff,
					'local' => null,
					'local_minimized' => null,
					'post_id' => $post_id,
					'post_type' => $post_type,
					'remote' => $meta_box,
				];

				continue;
			}

			$local_version = $items[ $id ]['local']['version'] ?? 'v0';
			$is_newer = version_compare( $local_version, $meta_box['version'] ?? 'v0' );

			$left = empty( $meta_box ) ? '' : wp_json_encode( $meta_box, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

			$diff = wp_text_diff( $left, wp_json_encode( $items[ $id ]['local_minimized'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ), [ 
				'show_split_view' => true,
			] );

			$items[ $id ] = array_merge( $items[ $id ], [ 
				'id' => $id,
				'is_newer' => $is_newer,
				'remote' => $meta_box,
				'diff' => $diff,
				'post_id' => $post_id,
				'post_type' => $post_type,
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
				$items = array_filter( $items, function ($item) use ($key, $params) {
					return isset( $item[ $key ] ) && $item[ $key ] == $params[ $key ];
				} );
			}
		}

		return $items;
	}

	/**
	 * Bare minimum keys needed in the json file
	 * 
	 * @param string $post_type
	 * @return string[]
	 */
	private static function get_minimal_meta_keys( string $post_type ): array {
		$meta_keys = [ 
			'meta-box' => [ 'meta_box' ],
			'mb-relationship' => [ 'relationship' ],
			'mb-settings-page' => [ 'settings_page' ],
		];

		return $meta_keys[ $post_type ] ?? [];
	}

	public static function get_meta_boxes( array $query_params = [] ): array {
		$defaults = [ 
			'post_type' => 'meta-box',
			'post_status' => get_post_stati(),
			'posts_per_page' => -1,
			'no_found_rows' => true,
			'update_post_term_cache' => false,
		];
		$query_params = wp_parse_args( $query_params, $defaults );
		$query = new \WP_Query( $query_params );
		
		$meta_boxes = [];
		foreach ( $query->posts as $post ) {
			$post_data = (array) $post;
			$meta_keys = self::get_minimal_meta_keys( $query_params['post_type'] );

			foreach ( $meta_keys as $meta_key ) {
				$post_data[ $meta_key ] = get_post_meta( $post->ID, $meta_key, true );
				$post_data              = Normalizer::minimize( $post_data, $query_params['post_type'] );
				$post_data['post_id']   = $post->ID;
			}

			// Extra post_id, post_type for filtering, check this line carefully if you want to change it
			$post_data['post_id']    = $post->ID;
			$post_data['post_type']  = $query_params['post_type'];
			
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
			$all_files = array_merge( $all_files, glob( "$path/*.json" ) );
		}

		$all_files = apply_filters( 'mbb_json_files', $all_files );

		return $all_files;
	}

	/**
	 * Get all paths to search for .json files
	 * 
	 * @return string[]
	 */
	public static function get_paths(): array {
		$theme_path    = get_template_directory();
		$mb_json_paths = [];

		if ( file_exists( "$theme_path/mb-json" ) ) {
			$mb_json_paths[] = "$theme_path/mb-json";
		}

		$mb_json_paths = apply_filters( 'mb_json_paths', $mb_json_paths );

		return $mb_json_paths;
	}
}
