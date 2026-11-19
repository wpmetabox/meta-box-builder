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

		$old_id = $this->source_id( $post, $data );
		$slug   = $this->unique_id( $post->post_type, $old_id );
		$data   = $this->apply_new_id( $data, $slug );

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
			$data = $this->apply_new_id( $data, $created->post_name );
		}

		foreach ( $meta_keys as $meta_key ) {
			update_post_meta( $post_id, $meta_key, $data[ $meta_key ] );
		}

		return $post_id;
	}

	/**
	 * Trash stores the original slug in post meta and appends __trashed to post_name.
	 */
	private function source_id( WP_Post $post, array $data ): string {
		$slug = $post->post_name;
		if ( 'trash' === $post->post_status ) {
			$desired = get_post_meta( $post->ID, '_wp_desired_post_slug', true );
			$slug    = $desired ?: preg_replace( '/__trashed$/', '', $slug );
		}

		return $slug ?: $this->id_from_meta( $post->post_type, $data );
	}

	private function apply_new_id( array $data, string $new_id ): array {
		$data = Export::sync_id( $data, $new_id );

		// Last updated and JSON sync read this timestamp.
		$modified                     = time();
		$data['settings']['modified'] = $modified;
		foreach ( [ 'meta_box', 'settings_page', 'relationship', 'model' ] as $key ) {
			if ( isset( $data[ $key ] ) && is_array( $data[ $key ] ) ) {
				$data[ $key ]['modified'] = $modified;
			}
		}

		// Generated PHP declares this name. A copied name fatal-errors when both snippets load.
		if ( $data['settings']['function_name'] ?? '' ) {
			$name                              = str_replace( '-', '_', $new_id );
			$data['settings']['function_name'] = preg_match( '/^\d/', $name ) ? 'mb_' . $name : $name;
		}

		$post_type = $data['post_type'] ?? '';

		if ( 'mb-settings-page' === $post_type ) {
			$data['settings']['option_name']      = $new_id;
			$data['settings_page']['option_name'] = $new_id;
		}

		if ( 'mb-model' === $post_type ) {
			$use_prefix = ! empty( $data['settings']['prefix'] );
			$table      = $this->unique_table( $new_id, $use_prefix );
			if ( $table ) {
				$data['settings']['table'] = $table;
				$data['model']['table']    = TableSchema::apply_prefix( $table, $use_prefix );
			}
		}

		// Saving the copy runs DDL on this table.
		$custom_table = $data['settings']['custom_table'] ?? null;
		if ( 'meta-box' === $post_type && is_array( $custom_table ) && wp_validate_boolean( $custom_table['enable'] ?? false ) ) {
			$use_prefix = wp_validate_boolean( $custom_table['prefix'] ?? false );
			$table      = $this->unique_table( $new_id, $use_prefix );
			if ( $table ) {
				$data['settings']['custom_table']['name'] = $table;
				$data['meta_box']['table']                = TableSchema::apply_prefix( $table, $use_prefix );
			}
		}

		return $data;
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
	 * Publishing calls create_table(), which alters a table that already exists.
	 */
	private function unique_table( string $id, bool $use_prefix ): string {
		$base = TableSchema::sanitize_name( $id );
		if ( ! $base ) {
			return '';
		}

		$used      = $this->stored_tables();
		$candidate = $base;
		$suffix    = 2;
		while ( $this->table_taken( $candidate, $use_prefix, $used ) ) {
			$candidate = TableSchema::sanitize_name( $base . '_' . $suffix );
			++$suffix;
		}

		return $candidate;
	}

	private function table_taken( string $table, bool $use_prefix, array $used ): bool {
		$stored = TableSchema::apply_prefix( $table, $use_prefix );

		return TableSchema::table_exists( $stored ) || in_array( $table, $used, true ) || in_array( $stored, $used, true );
	}

	private function stored_tables(): array {
		$posts = get_posts( [
			'post_type'              => [ 'mb-model', 'meta-box' ],
			'post_status'            => get_post_stati(),
			'posts_per_page'         => -1,
			'fields'                 => 'ids',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
			'suppress_filters'       => true,
		] );

		$names = [];
		foreach ( $posts as $post_id ) {
			foreach ( [ 'settings', 'model', 'meta_box' ] as $key ) {
				$meta = get_post_meta( $post_id, $key, true );
				if ( is_array( $meta ) ) {
					foreach ( [ $meta['table'] ?? '', $meta['custom_table']['name'] ?? '' ] as $name ) {
						if ( $name ) {
							$names[] = (string) $name;
						}
					}
				}
			}
		}

		return $names;
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
			'name'             => $id,
			'post_type'        => $post_type,
			'post_status'      => get_post_stati(),
			'posts_per_page'   => 1,
			'fields'           => 'ids',
			'no_found_rows'    => true,
			'suppress_filters' => true,
		] );

		// A copy is a new object, so the source file must not count as its own.
		return (bool) $posts || ( LocalJson::is_enabled() && ! LocalJson::new_file_path( $post_type, $id ) );
	}
}
