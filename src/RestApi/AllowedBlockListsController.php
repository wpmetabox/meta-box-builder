<?php
namespace MBB\RestApi;

use MBB\Helpers\AllowedBlockLists;
use WP_REST_Server;
use WP_REST_Request;
use WP_Error;
use WP_Block_Type_Registry;

class AllowedBlockListsController {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		register_rest_route( 'mbb', 'allowed-block-lists', [
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_items' ],
				'permission_callback' => [ $this, 'has_permission' ],
			],
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'update_item' ],
				'permission_callback' => [ $this, 'has_permission' ],
				'args'                => $this->get_schema(),
			],
		] );

		register_rest_route( 'mbb', 'allowed-block-lists/(?P<id>[\w-]+)', [
			[
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => [ $this, 'delete_item' ],
				'permission_callback' => [ $this, 'has_permission' ],
			],
		] );

		register_rest_route( 'mbb', 'allowed-block-lists/import', [
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'import_items' ],
				'permission_callback' => [ $this, 'has_permission' ],
			],
		] );

		register_rest_route( 'mbb', 'allowed-block-lists/export', [
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'export_items' ],
				'permission_callback' => [ $this, 'has_permission' ],
			],
		] );

		register_rest_route( 'mbb', 'blocks', [
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'get_blocks' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	public function get_blocks(): array {
		$blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

		// Do not get child blocks like accordion-heading
		$blocks = array_filter( $blocks, fn( $block ) => empty( $block->parent ) );

		return array_map(
			static fn( $block ) => [
				'name'   => $block->name,
				'title'  => $block->title,
				'icon'   => $block->icon,
			],
			$blocks
		);
	}

	public function get_items(): array {
		AllowedBlockLists::seed_defaults();
		return AllowedBlockLists::get_lists();
	}

	public function update_item( WP_REST_Request $request ) {
		$id     = $request->get_param( 'id' );
		$name   = $request->get_param( 'name' );
		$blocks = $request->get_param( 'blocks' ) ?: [];

		if ( empty( $name ) ) {
			return new WP_Error( 'rest_invalid', __( 'Name is required.', 'meta-box-builder' ), [ 'status' => 400 ] );
		}

		if ( empty( $id ) ) {
			$id = AllowedBlockLists::generate_id( $name );
		}

		AllowedBlockLists::update_list( $id, $name, $blocks );

		return AllowedBlockLists::get_lists();
	}

	public function delete_item( WP_REST_Request $request ): array {
		$id = $request->get_param( 'id' );

		$query = new \WP_Query( [
			'post_type'      => 'meta-box',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_key'       => 'fields',
		] );

		foreach ( $query->posts as $post ) {
			$fields   = get_post_meta( $post->ID, 'fields', true );
			$settings = get_post_meta( $post->ID, 'settings', true );

			if ( ! is_array( $fields ) ) {
				continue;
			}

			$modified = false;
			foreach ( $fields as &$field ) {
				if ( isset( $field['allowed_block_list'] ) && $field['allowed_block_list'] === $id ) {
					unset( $field['allowed_block_list'] );
					unset( $field['allowed_blocks'] );
					$modified = true;
				}
			}

			if ( $modified ) {
				Save::parse( $post, $fields, $settings ?? [] );
			}
		}

		AllowedBlockLists::delete_list( $id );

		return AllowedBlockLists::get_lists();
	}

	public function import_items( WP_REST_Request $request ) {
		$data = $request->get_param( 'lists' ) ?: [];

		if ( ! is_array( $data ) ) {
			return new WP_Error( 'rest_invalid', __( 'Invalid data format.', 'meta-box-builder' ), [ 'status' => 400 ] );
		}

		$lists = AllowedBlockLists::get_lists();

		foreach ( $data as $id => $item ) {
			if ( isset( $item['name'], $item['blocks'] ) ) {
				$lists[ $id ] = [
					'name'   => $item['name'],
					'blocks' => $item['blocks'],
				];
			}
		}

		AllowedBlockLists::update_lists( $lists );

		return AllowedBlockLists::get_lists();
	}

	public function export_items(): array {
		return AllowedBlockLists::get_lists();
	}

	private function get_schema(): array {
		return [
			'id'     => [
				'type'        => 'string',
				'description' => __( 'List ID (optional).', 'meta-box-builder' ),
			],
			'name'   => [
				'type'        => 'string',
				'description' => __( 'List name.', 'meta-box-builder' ),
				'required'    => true,
			],
			'blocks' => [
				'type'        => 'array',
				'description' => __( 'Array of block names.', 'meta-box-builder' ),
				'items'       => [
					'type' => 'string',
				],
			],
		];
	}
}
