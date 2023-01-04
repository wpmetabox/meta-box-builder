<?php
namespace MBB;

use WP_Query;

class Export {
	public function __construct() {
		add_filter( 'post_row_actions', [$this, 'add_export_link'], 10, 2 );
		add_action( 'admin_init', [ $this, 'export' ] );
	}

	public function add_export_link( $actions, $post ) {
		if ( ! in_array( $post->post_type, [ 'meta-box', 'mb-relationship', 'mb-settings-page' ], true ) ) {
			return $actions;
		}

		$url               = wp_nonce_url( add_query_arg( [
			'action'    => 'mbb-export',
			'post_type' => $post->post_type,
			'post[]'    => $post->ID,
		] ), 'bulk-posts' ); // @see WP_List_Table::display_tablenav()
		$actions['export'] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Export', 'mb-custom-post-type' ) . '</a>';

		return $actions;

	}

	public function export() {
		$action  = isset( $_REQUEST['action'] ) && 'mbb-export' === $_REQUEST['action'];
		$action2 = isset( $_REQUEST['action2'] ) && 'mbb-export' === $_REQUEST['action2'];

		if ( ( ! $action && ! $action2 ) || empty( $_REQUEST['post'] ) || empty( $_REQUEST['post_type'] ) ) {
			return;
		}

		$post_ids = $_REQUEST['post'];

		$query = new WP_Query( [
			'post_type'              => sanitize_text_field( wp_unslash( $_REQUEST['post_type'] ) ),
			'post__in'               => $post_ids,
			'posts_per_page'         => count( $post_ids ),
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		] );

		$data = [];
		foreach ( $query->posts as $post ) {
			$metas_keys = $this->post_metas_keys( $post->post_type );
			foreach ( $metas_keys as $meta ) {
				$metas[ $meta ] = get_post_meta( $post->ID, $meta, true );
			}

			if ( 'meta-box' === $post->post_type ) {
				$data[] = $this->get_meta_box( $post, $metas );
			} else {
				$data[]   = array(
					'post_type'    => $post->post_type,
					'post_title'   => $post->post_title,
					'post_date'    => $post->post_date,
					'post_status'  => $post->post_status,
					'post_content' => $post->post_content,
					'metas'        => $metas,
				);
			}
		}

		$file_name = str_replace( 'mb-', '', $post->post_type ) . '-exported';
		if ( count( $post_ids ) === 1 ) {
			$data = reset( $data );
			$file_name = $query->posts[0]->post_name;
		}

		$data = json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT );

		header( 'Content-Type: application/octet-stream' );
		header( "Content-Disposition: attachment; filename=$file_name.json" );
		header( 'Expires: 0' );
		header( 'Cache-Control: must-revalidate' );
		header( 'Pragma: public' );
		header( 'Content-Length: ' . strlen( $data ) );
		echo $data;
		die;
	}
	public function get_meta_box( $post, $metas ) {
		return array_merge( array(
				'post_type'    => $post->post_type,
				'post_title'   => $post->post_title,
				'post_date'    => $post->post_date,
				'post_status'  => $post->post_status,
				'post_content' => $post->post_content,
			), $metas );
	}
	public function post_metas_keys( $post_type ) {
		switch ( $post_type ) {
			case 'meta-box':
				return [ 'settings', 'fields', 'data', 'meta_box' ];
			case 'mb-relationship':
				return [ 'settings', 'relationship' ];
			case 'mb-settings-page':
				return [ 'settings', 'settings_page' ];
			default: return [];
		}
	}
}
