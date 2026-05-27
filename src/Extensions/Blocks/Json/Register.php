<?php
namespace MBB\Extensions\Blocks\Json;

class Register {
	public function __construct() {
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	public function register_blocks(): void {
		$query = new \WP_Query( [
			'post_type'              => 'meta-box',
			'post_status'            => 'publish',
			'posts_per_page'         => -1,
			'no_found_rows'          => true,
			'fields'                 => 'ids',
			'update_post_term_cache' => false,
		] );

		foreach ( $query->posts as $post_id ) {
			$meta_box = get_post_meta( $post_id, 'meta_box', true );

			if ( empty( $meta_box ) ) {
				continue;
			}

			// Bail if this is not a block.
			if ( empty( $meta_box['type'] ) || 'block' !== $meta_box['type'] ) {
				continue;
			}

			// Bail if block path is empty.
			if ( empty( $meta_box['block_json'] ) || empty( $meta_box['block_json']['path'] ) ) {
				continue;
			}

			if ( empty( $meta_box['block_json']['enable'] )
				|| ! file_exists( $meta_box['block_json']['path'] )
				// Do not register block.json if its rendering method is via code.
				|| isset( $meta_box['render_code'] )
			) {
				continue;
			}

			// Render a block with a template:
			// - Relative path (e.g. `file:./template.php`): generated in block.json (see Generator.php), handled by WordPress
			// - Absolute path: rendered by MB Blocks
			if ( isset( $meta_box['render_template'] ) && ! str_starts_with( $meta_box['render_template'], '.' ) ) {
				continue;
			}

			$args = [];

			// Render a block with a callback:
			// render_callback must return a string, but we echo => capture via output buffering.
			if ( isset( $meta_box['render_callback'] ) && is_callable( $meta_box['render_callback'] ) ) {
				$args['render_callback'] = function( $attributes, $content, $block ) use ( $meta_box ) {
					ob_start();
					call_user_func( $meta_box['render_callback'], $attributes, $content, $block );
					return ob_get_clean();
				};
			}

			// Now we register the block with the provided path
			register_block_type( trailingslashit( $meta_box['block_json']['path'] ) . $meta_box['id'], $args );
		}
	}
}
