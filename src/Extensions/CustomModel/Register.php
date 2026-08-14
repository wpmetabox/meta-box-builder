<?php
namespace MBB\Extensions\CustomModel;

use MetaBox\CustomTable\API;
use MBB\LocalJson;
use MBB\JsonService;
use MBBParser\Unparsers\MetaBox;
use WP_Query;

class Register {
	private const CACHE_OPTION = 'mbb_models';

	public function __construct() {
		$this->register_post_type();

		add_action( 'init', [ $this, 'register_models' ] );

		add_action( 'save_post_mb-model', [ __CLASS__, 'clear_cache' ] );
		add_action( 'before_delete_post', [ $this, 'clear_cache_on_delete' ] );
		add_action( 'wp_trash_post', [ $this, 'clear_cache_on_delete' ] );
		add_action( 'untrash_post', [ $this, 'clear_cache_on_delete' ] );
	}

	private function register_post_type(): void {
		$labels = [
			'name'               => _x( 'Custom Models', 'Post Type General Name', 'meta-box-builder' ),
			'singular_name'      => _x( 'Custom Model', 'Post Type Singular Name', 'meta-box-builder' ),
			'menu_name'          => __( 'Custom Models', 'meta-box-builder' ),
			'name_admin_bar'     => __( 'Custom Model', 'meta-box-builder' ),
			'all_items'          => __( 'Custom Models', 'meta-box-builder' ),
			'add_new_item'       => __( 'Add New', 'meta-box-builder' ),
			'add_new'            => __( 'New Custom Model', 'meta-box-builder' ),
			'new_item'           => __( 'New Custom Model', 'meta-box-builder' ),
			'edit_item'          => __( 'Edit Custom Model', 'meta-box-builder' ),
			'update_item'        => __( 'Update Custom Model', 'meta-box-builder' ),
			'view_item'          => __( 'View Custom Model', 'meta-box-builder' ),
			'search_items'       => __( 'Search', 'meta-box-builder' ),
			'not_found'          => __( 'Not found', 'meta-box-builder' ),
			'not_found_in_trash' => __( 'Not found in Trash', 'meta-box-builder' ),
		];

		$args = [
			'labels'       => $labels,
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => 'meta-box',
			'rewrite'      => false,
			'supports'     => [ 'title' ],
			'map_meta_cap' => true,
			'capabilities' => [
				// Meta capabilities.
				'edit_post'              => 'edit_mb_model',
				'read_post'              => 'read_mb_model',
				'delete_post'            => 'delete_mb_model',

				// Primitive capabilities used outside of map_meta_cap():
				'edit_posts'             => 'manage_options',
				'edit_others_posts'      => 'manage_options',
				'publish_posts'          => 'manage_options',
				'read_private_posts'     => 'manage_options',

				// Primitive capabilities used within map_meta_cap():
				'read'                   => 'read',
				'delete_posts'           => 'manage_options',
				'delete_private_posts'   => 'manage_options',
				'delete_published_posts' => 'manage_options',
				'delete_others_posts'    => 'manage_options',
				'edit_private_posts'     => 'manage_options',
				'edit_published_posts'   => 'manage_options',
				'create_posts'           => 'manage_options',
			],
		];

		register_post_type( 'mb-model', $args );
	}

	public function register_models(): void {
		$models = LocalJson::is_enabled() ? self::query_models_from_json() : null;
		if ( ! is_array( $models ) ) {
			$models = get_option( self::CACHE_OPTION, false );
			if ( ! is_array( $models ) ) {
				$models = self::query_models();
				update_option( self::CACHE_OPTION, $models, true );
			}
		}

		foreach ( $models as $name => $args ) {
			if ( empty( $args ) || ! is_array( $args ) ) {
				continue;
			}

			self::register( $name, $args );

			// Recreate missing tables (imported posts, dropped tables) without dbDelta every request.
			$table = (string) ( $args['table'] ?? '' );
			if ( $table && ! TableColumns::table_exists( $table ) ) {
				self::create_table( $args );
			}
		}
	}

	/**
	 * Register a model with MB Custom Table (no table create).
	 *
	 * @param string $name  Model name (slug).
	 * @param array  $model Parsed model args including optional columns, keys, post_id.
	 */
	public static function register( string $name, array $model ): void {
		$args = $model;
		unset( $args['columns'], $args['keys'], $args['post_id'], $args['name'], $args['modified'] );

		mb_register_model( $name, $args );
	}

	/**
	 * Create or update the model's custom table.
	 *
	 * @param array $model Parsed model args including table, columns, keys.
	 */
	public static function create_table( array $model ): void {
		$table = (string) ( $model['table'] ?? '' );
		if ( '' === $table ) {
			return;
		}

		$columns = isset( $model['columns'] ) && is_array( $model['columns'] ) ? $model['columns'] : [];
		$keys    = isset( $model['keys'] ) && is_array( $model['keys'] ) ? $model['keys'] : [];

		API::create( $table, $columns, $keys );
	}

	/**
	 * Whether a Builder mb-model post exists for this slug.
	 */
	public static function has_post( string $name ): bool {
		$cache = get_option( self::CACHE_OPTION, [] );

		return is_array( $cache ) && ! empty( $cache[ $name ]['post_id'] );
	}

	public static function query_models(): array {
		$query = new WP_Query( [
			'posts_per_page'         => -1,
			'post_status'            => 'publish',
			'post_type'              => 'mb-model',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		] );

		$models = [];
		foreach ( $query->posts as $post ) {
			$model = get_post_meta( $post->ID, 'model', true );
			if ( empty( $model ) || ! is_array( $model ) || empty( $model['name'] ) || empty( $model['table'] ) ) {
				continue;
			}

			$name             = $model['name'];
			$model['post_id'] = (int) $post->ID;
			unset( $model['name'] );
			$models[ $name ] = $model;
		}

		return $models;
	}

	/**
	 * Load published models from Local JSON files (source of truth when enabled).
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public static function query_models_from_json(): array {
		$models = self::query_models();

		foreach ( JsonService::get_files() as $file ) {
			$raw = LocalJson::read_file( $file );
			if ( empty( $raw ) ) {
				continue;
			}

			$unparser = new MetaBox( $raw );
			$unparser->unparse();
			$data = $unparser->get_settings();

			if ( ( $data['post_type'] ?? '' ) !== 'mb-model' ) {
				continue;
			}

			$model = $data['model'] ?? [];
			if ( ! is_array( $model ) || empty( $model['name'] ) || empty( $model['table'] ) ) {
				continue;
			}

			$name = $model['name'];
			unset( $model['name'] );
			if ( isset( $models[ $name ]['post_id'] ) ) {
				$model['post_id'] = $models[ $name ]['post_id'];
			}
			$models[ $name ] = $model;
		}

		return $models;
	}

	public static function clear_cache(): void {
		delete_option( self::CACHE_OPTION );
	}

	/**
	 * Rebuild the full models cache from published mb-model posts.
	 */
	public static function rebuild_cache(): void {
		update_option( self::CACHE_OPTION, self::query_models(), true );
	}

	public function clear_cache_on_delete( int $post_id ): void {
		if ( 'mb-model' === get_post_type( $post_id ) ) {
			self::clear_cache();
		}
	}
}
