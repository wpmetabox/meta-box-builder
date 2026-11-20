<?php
namespace MBB;

use MetaBox\Support\Arr;
use WP_Post;

class Export {
	public const ALLOWED_POST_TYPES = [ 'meta-box', 'mb-relationship', 'mb-settings-page', 'mb-model' ];

	public function __construct() {
		add_filter( 'post_row_actions', [ $this, 'add_export_link' ], 10, 2 );
		add_action( 'admin_init', [ $this, 'export' ] );
	}

	/**
	 * Add export link to the post row actions.
	 *
	 * @param array<string, string> $actions Row actions.
	 * @param WP_Post               $post    Post object.
	 */
	public function add_export_link( array $actions, WP_Post $post ): array {
		if ( ! in_array( $post->post_type, self::ALLOWED_POST_TYPES, true ) || ! current_user_can( 'edit_post', $post->ID ) ) {
			return $actions;
		}

		$url               = wp_nonce_url( add_query_arg( [
			'action'    => 'mbb-export',
			'post_type' => $post->post_type,
			'post[]'    => $post->ID,
		] ), 'bulk-posts' );
		$actions['export'] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Export', 'meta-box-builder' ) . '</a>';

		return $actions;
	}

	public function export(): void {
		$action  = isset( $_REQUEST['action'] ) && 'mbb-export' === $_REQUEST['action'];
		$action2 = isset( $_REQUEST['action2'] ) && 'mbb-export' === $_REQUEST['action2'];

		if ( ( ! $action && ! $action2 ) || empty( $_REQUEST['post'] ) || empty( $_REQUEST['post_type'] ) ) {
			return;
		}

		check_ajax_referer( 'bulk-posts' );

		$post_type        = sanitize_key( wp_unslash( $_REQUEST['post_type'] ) );
		$post_type_object = in_array( $post_type, self::ALLOWED_POST_TYPES, true ) ? get_post_type_object( $post_type ) : null;
		if ( ! $post_type_object || ! current_user_can( $post_type_object->cap->edit_posts ) ) {
			wp_die( esc_html__( 'You are not allowed to export this post type.', 'meta-box-builder' ), 403 );
		}

		$post_ids = [];
		foreach ( wp_parse_id_list( wp_unslash( $_REQUEST['post'] ) ) as $post_id ) {
			$post = get_post( $post_id );
			if ( $post instanceof WP_Post && $post->post_type === $post_type && current_user_can( 'edit_post', $post_id ) ) {
				$post_ids[] = $post_id;
			}
		}

		if ( ! $post_ids ) {
			wp_die( esc_html__( 'You are not allowed to export these items.', 'meta-box-builder' ), 403 );
		}

		$data = JsonService::get_meta_boxes( [
			'post_type'   => $post_type,
			'post_status' => get_post_stati(),
			'post__in'    => $post_ids,
		] );

		if ( ! $data ) {
			return;
		}

		$data = array_map( function ( $item ) {
			unset( $item['post_id'], $item['post_type'] );
			return $item;
		}, $data );

		$data = array_values( $data );

		$file_name = str_replace( 'mb-', '', $post_type ) . '-export';
		if ( count( $post_ids ) === 1 ) {
			$data      = reset( $data );
			$file_name = $data['id'] ?? $file_name;
		}

		ksort( $data );

		$output = wp_json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );

		header( 'Content-Type: application/octet-stream' );
		header( 'Content-Disposition: attachment; filename=' . sanitize_file_name( $file_name ) . '.json' );
		header( 'Expires: 0' );
		header( 'Cache-Control: must-revalidate' );
		header( 'Pragma: public' );
		header( 'Content-Length: ' . strlen( $output ) );

		echo $output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		die;
	}

	/**
	 * Meta keys stored for each builder post type.
	 *
	 * @return string[]
	 */
	public static function get_meta_keys( string $post_type ): array {
		$meta_keys = [
			'meta-box'         => [ 'settings', 'fields', 'meta_box' ],
			'mb-relationship'  => [ 'settings', 'relationship' ],
			'mb-settings-page' => [ 'settings', 'settings_page' ],
			'mb-model'         => [ 'settings', 'model' ],
		];

		return $meta_keys[ $post_type ] ?? [];
	}

	/**
	 * Dot-notation keys that store the object ID.
	 *
	 * @return string[]
	 */
	public static function id_keys( string $post_type ): array {
		$keys = [
			'meta-box'         => [ 'settings.id', 'meta_box.id' ],
			'mb-model'         => [ 'settings.slug', 'model.id', 'model.name' ],
			'mb-settings-page' => [ 'settings.id', 'settings_page.id' ],
			'mb-relationship'  => [ 'settings.id', 'relationship.id' ],
		];

		return $keys[ $post_type ] ?? [];
	}

	/**
	 * Store the given ID everywhere the object type keeps it.
	 *
	 * @param array  $post Post data, including post_type and meta.
	 * @param string $id   ID to store, which is also the post slug.
	 */
	public static function sync_id( array $post, string $id ): array {
		$post['post_name'] = $id;
		foreach ( self::id_keys( $post['post_type'] ?? '' ) as $key ) {
			Arr::set( $post, $key, $id );
		}

		return $post;
	}
}
