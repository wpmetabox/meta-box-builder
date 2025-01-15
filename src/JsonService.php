<?php
namespace MBB;

class JsonService {
	private static function get_meta_box_by_meta_box_id( string $meta_box_id ): array {
		$meta_boxes = self::get_meta_boxes();

		// Filter by meta box id
		$meta_box = array_filter( $meta_boxes, function ($meta_box) use ($meta_box_id) {
			return $meta_box['id'] === $meta_box_id;
		} );

		// Get the first key of array
		$keys = array_keys( $meta_box );

		// No posts found, return empty array
		if ( empty( $keys ) ) {
			return [ null, [] ];
		}

		// [post_id, meta_box]
		return [ $keys[0], $meta_box[ $keys[0] ] ];
	}

	private static function get_sync_status( $file ) {
		$local            = json_decode( file_get_contents( $file ), true );
		$local_normalized = Normalizer::normalize( $local );
		$mb_id            = $local_normalized['id'] ?? sanitize_title( $local_normalized['title'] );

		[ $post_id, $remote ] = self::get_meta_box_by_meta_box_id( $mb_id );

		$is_newer = version_compare( $local_normalized['version'], $remote['version'] ?? 'v0' );
		if ( empty( $remote ) ) {
			$is_newer = true;
		}
		
		$left = empty( $remote ) ? '' : wp_json_encode( $remote, JSON_PRETTY_PRINT );

		$sync_json_to_db_text = __( 'Sync JSON to DB', 'meta-box-builder' );
		$sync_db_to_json_text = __( 'Sync DB to JSON', 'meta-box-builder' );
		$sync_json_to_db_url  = add_query_arg( [ 
			'action' => 'mbb-sync',
			'target' => 'to-db',
			'id' => $mb_id,
		] );
		$sync_db_to_json_url  = add_query_arg( [ 
			'action' => 'mbb-sync',
			'target' => 'to-json',
			'id' => $mb_id,
		] );

		$diff = wp_text_diff( $left, wp_json_encode( $local, JSON_PRETTY_PRINT ), [ 
			'title_left' => "<h3>
				<strong>Database Version</strong> <br />
				<a href=\"$sync_json_to_db_url\" class=\"button button-secondary\">$sync_json_to_db_text</a>
			</h3>",
			'title_right' => "<h3>
			<strong>JSON File Version</strong> <br />
			<a href=\"$sync_db_to_json_url\" class=\"button button-secondary\">$sync_db_to_json_text</a></h3>",
			'show_split_view' => ! empty( $remote ),
		] );

		return compact( 'is_newer', 'local', 'local_normalized', 'remote', 'diff', 'post_id', 'file', 'mb_id' );
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
			$post_data = [];

			if ( $post->post_type === 'meta-box' ) {
				$meta_box = get_post_meta( $post->ID, 'meta_box', true );
				$settings = get_post_meta( $post->ID, 'settings', true );

				$post_data            = array_merge( $post_data, $meta_box );
				$post_data['version'] = $settings['version'] ?? 'v0';
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
		// 	mkdir( $mb_json_path );
		// }

		return $mb_json_paths;
	}
}
