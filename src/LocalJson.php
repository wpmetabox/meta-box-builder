<?php
namespace MBB;

use MBB\RestApi\Save;
use MBBParser\Unparsers\MetaBox;
use WP_Error;

class LocalJson {
	/**
	 * Why the latest sync did not write a file, empty when it wrote one or had nothing to do.
	 *
	 * @var string
	 */
	private static string $last_error = '';

	public function __construct() {
		add_action( 'mbb_after_save', [ $this, 'generate_local_json' ], 10, 3 );
	}

	/**
	 * Sync error from the latest use_database() call, if any.
	 *
	 * Not every false return is an error: drafts and other post types simply have
	 * nothing to sync.
	 */
	public static function get_last_error(): string {
		return self::$last_error;
	}

	public function generate_local_json( $parser, $post_id, $raw_data ): bool {
		$args = compact( 'post_id' );
		if ( ! empty( $raw_data['previous_id'] ) ) {
			$args['previous_id'] = (string) $raw_data['previous_id'];
		}

		return self::use_database( $args );
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
	 * Get decoded JSON as an associative array from a .json file
	 */
	public static function read_file( string $file_path ): array {
		if ( ! file_exists( $file_path ) || ! is_readable( $file_path ) ) {
			return [];
		}

		$json = wp_json_file_decode( $file_path, [ 'associative' => true ] );

		return is_array( $json ) ? $json : [];
	}

	public static function write_file( string $file_path, array $data ) {
		if ( ! is_writable( dirname( $file_path ) ) ) {
			return false;
		}

		if ( ! is_dir( dirname( $file_path ) ) ) {
			wp_mkdir_p( dirname( $file_path ) );
		}

		$output = wp_json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );

		return @file_put_contents( $file_path, $output );
	}

	/**
	 * Import from .json file
	 *
	 * @return WP_Error|boolean
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
	 * @param array $args
	 * @return bool Success or not
	 */
	public static function use_json( array $args ): bool {
		$json = JsonService::get_json( [
			'id'        => $args['post_name'],
			'post_type' => $args['post_type'] ?? 'meta-box',
		] );

		if ( ! $json || ! is_array( $json ) ) {
			return false;
		}

		$json = reset( $json );

		return self::sync_json( $json );
	}

	/**
	 * Sync from JSON file to database.
	 *
	 * Exprected format: [ 'post_id' => 123, 'local' => [local JSON array] ]. See JsonService::get_json() for the full format.
	 * After unparsing: 'local' becomes:
	 * [
	 *      // Post fields:
	 *      'post_type',
	 *      'post_name',
	 *      'post_title',
	 *      'post_date',
	 *      'post_status',
	 *      'post_content',
	 *
	 *      // Meta keys (same as exported)
	 *      'settings',
	 *      'meta_box',
	 *      'fields',
	 *      'data',
	 * ]
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

		$post_array = [ 'ID' => $data['post_id'] ];
		$data       = $data['local'];
		$unparser   = new MetaBox( $data );
		$unparser->unparse();
		$data        = $unparser->get_settings();
		$meta_fields = Export::get_meta_keys( $data['post_type'] );
		$post_array  = array_merge( $post_array, [
			'post_type'    => $data['post_type'],
			'post_name'    => $data['post_name'],
			'post_title'   => $data['post_title'],
			'post_date'    => $data['post_date'],
			'post_status'  => $data['post_status'],
			'post_content' => $data['post_content'],
		] );
		$post_array  = Save::fix_post_date( $post_array );

		$post_id = wp_insert_post( $post_array );

		foreach ( $meta_fields as $meta_key ) {
			if ( ! isset( $data[ $meta_key ] ) ) {
				continue;
			}

			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		do_action( 'mbb_sync_json', $data, $post_id );

		// Now we need to save the modified data back to the JSON file
		self::use_database( [
			'post_id'   => $post_id,
			'post_type' => $data['post_type'] ?? 'meta-box',
		] );

		return true;
	}

	/**
	 * Sync data from database to JSON file, overwriting existing content.
	 *
	 * @param array $args Contains post_id or post_name, optional post_type and previous_id (old slug after rename).
	 * @return bool Success or not.
	 */
	public static function use_database( array $args = [] ): bool {
		self::$last_error = '';

		if ( ! self::is_enabled() ) {
			return false;
		}

		$post_type = $args['post_type'] ?? 'meta-box';
		$post      = null;
		if ( isset( $args['post_id'] ) ) {
			$post = get_post( $args['post_id'] );
		} elseif ( isset( $args['post_name'] ) ) {
			$post = get_page_by_path( $args['post_name'], OBJECT, $post_type );
		}

		if ( empty( $post ) || $post->post_status !== 'publish' ) {
			return false;
		}

		if ( ! in_array( $post->post_type, [ 'meta-box', 'mb-model' ], true ) ) {
			return false;
		}

		$post_data = (array) $post;
		foreach ( Export::get_meta_keys( $post->post_type ) as $meta_key ) {
			$value                  = get_post_meta( $post->ID, $meta_key, true );
			$post_data[ $meta_key ] = is_array( $value ) ? $value : [];
		}

		$unparser = new MetaBox( $post_data );
		$unparser->unparse();
		$post_data = $unparser->to_minimal_format();

		$previous_id = (string) ( $args['previous_id'] ?? '' );
		$is_rename   = $previous_id !== '' && $previous_id !== $post->post_name;

		$file_path = self::resolve_file( $post->post_type, $post->post_name, $is_rename );
		if ( ! $file_path ) {
			return self::fail( self::id_taken_message() );
		}

		if ( ! self::write_file( $file_path, $post_data ) ) {
			return self::fail( __( 'Could not write the Local JSON file.', 'meta-box-builder' ) );
		}

		// Remove the file left behind by the rename, wherever it is stored.
		$stale_file = $is_rename ? self::find_file_by_id( $post->post_type, $previous_id ) : '';
		if ( $stale_file && $stale_file !== $file_path ) {
			wp_delete_file( $stale_file );
		}

		return true;
	}

	private static function fail( string $message ): bool {
		self::$last_error = $message;

		return false;
	}

	/**
	 * File that must store this ID, empty string when another file already holds it.
	 *
	 * A file is normally stored in the first path as {$id}.json, but users might use
	 * another file name, so existing files are matched by the ID inside them.
	 *
	 * @param string $post_type Builder post type.
	 * @param string $id        ID to store.
	 * @param bool   $is_rename Whether the ID just changed.
	 */
	private static function resolve_file( string $post_type, string $id, bool $is_rename ): string {
		$current_file = self::find_file_by_id( $post_type, $id );

		// After a rename the new ID must be free, so a match here is another field group or model.
		if ( $is_rename && $current_file ) {
			return '';
		}

		$default_path = JsonService::get_paths()[0] . '/' . $id . '.json';

		// Likewise, the default file name may already store another object under a custom ID.
		if ( ! $current_file && self::read_file( $default_path ) ) {
			return '';
		}

		return $current_file ?: $default_path;
	}

	/**
	 * Error when a JSON file already stores this ID, empty string when the ID is free.
	 *
	 * Saving checks this before writing the post, because the sync runs afterwards and
	 * would leave the new ID on the post while the file kept the old one.
	 *
	 * @param string $post_type   Builder post type.
	 * @param string $id          ID about to be saved.
	 * @param string $previous_id ID before this save.
	 */
	public static function check_id( string $post_type, string $id, string $previous_id = '' ): string {
		if ( ! self::is_enabled() ) {
			return '';
		}

		return self::resolve_file( $post_type, $id, $previous_id !== '' && $previous_id !== $id )
			? ''
			: self::id_taken_message();
	}

	private static function id_taken_message(): string {
		return __( 'Another JSON file already uses this ID. Please choose a different one.', 'meta-box-builder' );
	}

	/**
	 * Path of the JSON file storing an ID, empty string when no file matches.
	 *
	 * @param string $post_type Builder post type.
	 * @param string $id        ID stored in the JSON file.
	 */
	private static function find_file_by_id( string $post_type, string $id ): string {
		foreach ( JsonService::get_files() as $file ) {
			$raw_json = self::read_file( $file );
			if ( empty( $raw_json ) ) {
				continue;
			}

			$unparser = new MetaBox( $raw_json );
			$unparser->unparse();
			$json = $unparser->get_settings();

			if ( ( $json['post_type'] ?? 'meta-box' ) === $post_type && self::get_json_id( $json ) === $id ) {
				return $file;
			}
		}

		return '';
	}

	/**
	 * ID used to match a JSON file to a Builder post.
	 */
	public static function get_json_id( array $data ): string {
		$post_type = $data['post_type'] ?? 'meta-box';

		if ( 'mb-model' === $post_type ) {
			return (string) ( $data['model']['id'] ?? $data['model']['name'] ?? $data['post_name'] ?? '' );
		}

		return (string) ( $data['meta_box']['id'] ?? $data['post_name'] ?? '' );
	}
}
