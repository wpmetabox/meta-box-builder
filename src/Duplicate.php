<?php
namespace MBB;

use MBB\Helpers\Id;
use MBB\Helpers\TableSchema;
use MetaBox\Support\Arr;
use WP_Post;

class Duplicate {
	public function __construct() {
		add_filter( 'post_row_actions', [ $this, 'add_duplicate_link' ], 11, 2 );
		add_action( 'admin_init', [ $this, 'duplicate' ] );
	}

	/**
	 * Add a duplicate link next to Export.
	 *
	 * @param array<string, string> $actions Row actions.
	 */
	public function add_duplicate_link( array $actions, WP_Post $post ): array {
		if ( ! in_array( $post->post_type, Export::ALLOWED_POST_TYPES, true ) || ! current_user_can( 'edit_post', $post->ID ) ) {
			return $actions;
		}

		$url                  = wp_nonce_url( add_query_arg( [
			'action' => 'mbb-duplicate',
			'post'   => $post->ID,
		] ), 'mbb-duplicate_' . $post->ID );
		$actions['duplicate'] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Duplicate', 'meta-box-builder' ) . '</a>';

		return $actions;
	}

	public function duplicate(): void {
		$action = isset( $_GET['action'] ) && is_string( $_GET['action'] ) ? sanitize_key( wp_unslash( $_GET['action'] ) ) : '';
		if ( 'mbb-duplicate' !== $action ) {
			return;
		}

		$post_id = isset( $_GET['post'] ) && is_string( $_GET['post'] ) ? absint( wp_unslash( $_GET['post'] ) ) : 0;
		check_admin_referer( 'mbb-duplicate_' . $post_id );

		// get_post( 0 ) falls back to the global post. && would return true, not the post.
		$post = $post_id ? get_post( $post_id ) : null;
		if ( ! $post instanceof WP_Post || ! in_array( $post->post_type, Export::ALLOWED_POST_TYPES, true ) || ! current_user_can( 'edit_post', $post->ID ) ) {
			wp_die( esc_html__( 'You are not allowed to duplicate this item.', 'meta-box-builder' ), '', [ 'response' => 403 ] );
		}

		$new_id = $this->duplicate_post( $post );
		$link   = get_edit_post_link( $new_id, 'raw' );
		wp_safe_redirect( $link ?: admin_url( 'edit.php?post_type=' . $post->post_type ) );
		exit;
	}

	/**
	 * Copy a builder post as a draft with a new object ID.
	 */
	public function duplicate_post( WP_Post $post ): int {
		$data = [
			'post_type'   => $post->post_type,
			// translators: %s - original title.
			'post_title'  => sprintf( __( '%s (Copy)', 'meta-box-builder' ), $post->post_title ),
			'post_status' => 'draft',
		];

		$meta_keys = Export::get_meta_keys( $post->post_type );
		foreach ( $meta_keys as $meta_key ) {
			$value             = get_post_meta( $post->ID, $meta_key, true );
			$data[ $meta_key ] = is_array( $value ) ? $value : [];
		}

		$old_id = $post->post_name ?: $this->id_from_meta( $post->post_type, $data );
		$slug   = $this->unique_id( $post->post_type, $old_id );
		$data   = $this->apply_new_id( $data, $old_id, $slug );

		// Registration reads this title. The list and the editor read post_title.
		if ( isset( $data['meta_box']['title'] ) ) {
			$data['meta_box']['title'] = $data['post_title'];
		}

		$post_id = wp_insert_post( [
			'post_type'   => $data['post_type'],
			'post_title'  => $data['post_title'],
			'post_name'   => $data['post_name'],
			'post_status' => $data['post_status'],
		] );

		if ( is_wp_error( $post_id ) || ! $post_id ) {
			wp_die( esc_html__( 'Could not duplicate this item.', 'meta-box-builder' ) );
		}

		$created = get_post( $post_id );
		if ( $created->post_name !== $data['post_name'] ) {
			$data = $this->apply_new_id( $data, $data['post_name'], $created->post_name );
		}

		foreach ( $meta_keys as $meta_key ) {
			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		LocalJson::use_database( [
			'post_id'   => $post_id,
			'post_type' => $post->post_type,
		], false );

		return $post_id;
	}

	private function apply_new_id( array $data, string $old_id, string $new_id ): array {
		$data = Export::sync_id( $data, $new_id );
		$data = $this->sync_option_name( $data, $old_id, $new_id );

		return $this->sync_model_table( $data, $new_id );
	}

	/**
	 * ID stored in meta when the post has no slug yet.
	 */
	private function id_from_meta( string $post_type, array $meta ): string {
		foreach ( Export::id_keys( $post_type ) as $key ) {
			$value = Arr::get( $meta, $key );
			if ( $value ) {
				return (string) $value;
			}
		}

		return '';
	}

	/**
	 * Save leaves a non-empty option_name alone, so a copied default would keep writing the original option.
	 */
	private function sync_option_name( array $data, string $old_id, string $new_id ): array {
		if ( 'mb-settings-page' === ( $data['post_type'] ?? '' ) && $old_id ) {
			foreach ( [ 'settings', 'settings_page' ] as $key ) {
				if ( ( $data[ $key ]['option_name'] ?? '' ) === $old_id ) {
					$data[ $key ]['option_name'] = $new_id;
				}
			}
		}

		return $data;
	}

	/**
	 * Publishing calls create_table() with this name, so the copy must not keep the original table.
	 */
	private function sync_model_table( array $data, string $new_id ): array {
		$table = TableSchema::sanitize_name( $new_id );
		if ( 'mb-model' === ( $data['post_type'] ?? '' ) && $table ) {
			if ( $data['settings']['table'] ?? '' ) {
				$data['settings']['table'] = $table;
			}
			if ( $data['model']['table'] ?? '' ) {
				$data['model']['table'] = TableSchema::apply_prefix( $table, ! empty( $data['settings']['prefix'] ) );
			}
		}

		return $data;
	}

	private function unique_id( string $post_type, string $id ): string {
		$base      = Id::sanitize( $id . '_copy', $id );
		$candidate = $base;
		$suffix    = 2;

		while ( $this->id_exists( $post_type, $candidate ) ) {
			$candidate = Id::sanitize( $base . '_' . $suffix, $id );
			++$suffix;
		}

		return $candidate;
	}

	private function id_exists( string $post_type, string $id ): bool {
		// Limit the lookup to this post type, including trashed posts.
		// get_page_by_path() also matches attachments.
		$posts = get_posts( [
			'name'           => $id,
			'post_type'      => $post_type,
			'post_status'    => get_post_stati(),
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'no_found_rows'  => true,
		] );

		return (bool) $posts || (bool) LocalJson::check_id( $post_type, $id );
	}
}
