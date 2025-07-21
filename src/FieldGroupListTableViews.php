<?php
namespace MBB;

use WP_Query;

class FieldGroupListTableViews {
	public function __construct() {
		add_action( 'load-edit.php', [ $this, 'load' ] );
	}

	public function load(): void {
		add_filter( 'views_edit-meta-box', [ $this, 'add_views' ] );
		add_action( 'pre_get_posts', [ $this, 'filter_by_mode' ] );
	}

	public function add_views( array $views ): array {
		// Remove default views
		unset( $views['all'], $views['publish'], $views['draft'] );

		// Count posts for each mode
		$counts    = [
			'custom-fields'        => 0,
			'post-submission-form' => 0,
			'block'                => 0,
		];
		$all_posts = get_posts( [
			'post_type'              => 'meta-box',
			'post_status'            => 'any',
			'posts_per_page'         => -1,
			'fields'                 => 'ids',
			'no_found_rows'          => true,
			'update_term_meta_cache' => false,
		] );
		foreach ( $all_posts as $post_id ) {
			$settings = get_post_meta( $post_id, 'settings', true );
			$mode     = $settings['mode'] ?? 'custom-fields';
			if ( isset( $counts[ $mode ] ) ) {
				++$counts[ $mode ];
			}
		}

		$current_mode = empty( $_GET['mode'] ) ? 'custom-fields' : sanitize_key( $_GET['mode'] );
		$base_url     = remove_query_arg( [ 'mode', 'post_status', 'paged' ] );
		$modes        = [
			'custom-fields'        => __( 'Custom Fields', 'meta-box-builder' ),
			'post-submission-form' => __( 'Post Submission Forms', 'meta-box-builder' ),
			'block'                => __( 'Blocks', 'meta-box-builder' ),
		];
		$new_views    = [];
		foreach ( $modes as $key => $label ) {
			$url               = add_query_arg( 'mode', $key, $base_url );
			$class             = $current_mode === $key ? 'class="current"' : '';
			$new_views[ $key ] = sprintf(
				// Translators: %1$s is the class attribute, %2$s is the URL, %3$s is the label, %4$d is the count.
				'<a %1$s href="%2$s">%3$s <span class="count">(%4$d)</span></a>',
				$class,
				esc_url( $url ),
				esc_html( $label ),
				$counts[ $key ]
			);
		}
		return array_merge( $new_views, $views );
	}

	public function filter_by_mode( WP_Query $query ): void {
		if ( get_current_screen()->id !== 'edit-meta-box' ) {
			return;
		}
		if ( ! $query->is_main_query() || $query->get( 'post_type' ) !== 'meta-box' ) {
			return;
		}

		$mode = empty( $_GET['mode'] ) ? 'custom-fields' : sanitize_key( $_GET['mode'] );
		if ( $mode === 'custom-fields' ) {
			$query->set( 'meta_query', [
				'relation' => 'OR',
				[
					'key'     => 'settings',
					'value'   => 's:4:"mode";s:14:"custom-fields";',
					'compare' => 'LIKE',
				],
				[
					'key'     => 'settings',
					'value'   => 'mode',
					'compare' => 'NOT LIKE',
				],
			] );
		} elseif ( $mode === 'post-submission-form' ) {
			$query->set( 'meta_query', [
				[
					'key'     => 'settings',
					'value'   => 's:4:"mode";s:20:"post-submission-form";',
					'compare' => 'LIKE',
				],
			] );
		} elseif ( $mode === 'block' ) {
			$query->set( 'meta_query', [
				[
					'key'     => 'settings',
					'value'   => 's:4:"mode";s:5:"block";',
					'compare' => 'LIKE',
				],
			] );
		}
	}
}
