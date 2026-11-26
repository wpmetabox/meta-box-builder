<?php
namespace MBB;

use MBB\Helpers\TableSchema;
use WP_Post;

class Duplicate {
	public function __construct() {
		add_filter( 'post_row_actions', [ $this, 'add_link' ], 11, 2 );
		add_action( 'admin_action_mbb_duplicate', [ $this, 'duplicate' ] );
	}

	public function add_link( array $actions, WP_Post $post ): array {
		if ( $this->can_duplicate( $post ) ) {
			$url                  = wp_nonce_url( admin_url( 'admin.php?action=mbb_duplicate&post=' . $post->ID ), 'mbb_duplicate_' . $post->ID );
			$actions['duplicate'] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Duplicate', 'meta-box-builder' ) . '</a>';
		}

		return $actions;
	}

	public function duplicate(): void {
		$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;
		check_admin_referer( 'mbb_duplicate_' . $post_id );

		$post = $post_id ? get_post( $post_id ) : null;
		if ( ! $post || ! $this->can_duplicate( $post ) ) {
			wp_die( esc_html__( 'You are not allowed to duplicate this item.', 'meta-box-builder' ), 403 );
		}

		wp_safe_redirect( get_edit_post_link( $this->duplicate_post( $post ), 'raw' ) );
		exit;
	}

	/**
	 * Copy as a draft, so nothing registers until the user publishes it.
	 */
	public function duplicate_post( WP_Post $post ): int {
		$data = [
			'post_type' => $post->post_type,
			'post_name' => $this->new_id( $post ),
		];

		$keys = Export::get_meta_keys( $post->post_type );
		foreach ( $keys as $key ) {
			// A missing key is an empty string. Casting that to an array stores one empty item.
			$value        = get_post_meta( $post->ID, $key, true );
			$data[ $key ] = is_array( $value ) ? $value : [];
		}

		$data = Import::sync_id( $data, $data['post_name'] );

		// Two settings pages with one option name share data.
		unset( $data['settings']['option_name'], $data['settings_page']['option_name'] );
		if ( 'mb-model' === $post->post_type ) {
			// Publishing from the list never opens the editor, so the copy needs its own table.
			$data['settings']['table'] = TableSchema::sanitize_name( $data['post_name'] );
			$data['model']['table']    = TableSchema::apply_prefix( $data['settings']['table'], ! empty( $data['settings']['prefix'] ) );
		}

		// wp_insert_post() unslashes its input, so a backslash in the title must be slashed first.
		$post_id = wp_insert_post( wp_slash( [
			'post_type'   => $post->post_type,
			// translators: %s - original title.
			'post_title'  => sprintf( __( '%s (Copy)', 'meta-box-builder' ), $post->post_title ),
			'post_name'   => $data['post_name'],
			'post_status' => 'draft',
		] ), true );

		if ( is_wp_error( $post_id ) ) {
			wp_die( esc_html( $post_id->get_error_message() ) );
		}

		foreach ( $keys as $key ) {
			update_post_meta( $post_id, $key, wp_slash( $data[ $key ] ) );
		}

		do_action( 'mbb_sync_json', $data, $post_id );

		return $post_id;
	}

	/**
	 * Slug a published post would get, skipping an ID that already has a Local JSON file.
	 *
	 * Drafts skip the unique slug check, and publishing would overwrite that file.
	 */
	private function new_id( WP_Post $post ): string {
		$base = $post->post_name . '_copy';
		for ( $i = 1; ; $i++ ) {
			$id = wp_unique_post_slug( $i > 1 ? "{$base}-{$i}" : $base, 0, 'publish', $post->post_type, 0 );
			if ( ! LocalJson::is_enabled() || LocalJson::new_file_path( $post->post_type, $id ) ) {
				return $id;
			}
		}
	}

	private function can_duplicate( WP_Post $post ): bool {
		return 'trash' !== $post->post_status && in_array( $post->post_type, Export::ALLOWED_POST_TYPES, true ) && current_user_can( 'edit_post', $post->ID );
	}
}
