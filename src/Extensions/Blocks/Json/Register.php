<?php
namespace MBB\Extensions\Blocks\Json;

use WP_Query;
use MetaBox\Support\Arr;
use MBB\Extensions\Blocks\CodeToCallbackTransformer;

class Register {
	public function __construct() {
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	public function register_blocks(): void {
		$query = new WP_Query( [
			'post_type'              => 'meta-box',
			'post_status'            => 'publish',
			'posts_per_page'         => -1,
			'no_found_rows'          => true,
			'fields'                 => 'ids',
			'update_post_term_cache' => false,
		] );

		foreach ( $query->posts as $post_id ) {
			$meta_box = get_post_meta( $post_id, 'meta_box', true );
			if ( ! $this->use_block_json( $meta_box ) ) {
				continue;
			}

			$path = Arr::get( $meta_box, 'block_json.path' );
			$args = $this->get_block_type_args( $post_id, $meta_box );
			register_block_type( trailingslashit( $path ) . $meta_box['id'], $args );
		}
	}

	private function get_block_type_args( int $post_id, array $meta_box ): array {
		$settings    = get_post_meta( $post_id, 'settings', true );
		$render_with = Arr::get( $settings, 'render_with' );

		$args = [];
		if ( $render_with === 'callback' ) {
			$this->set_render_callback_param( $args, $meta_box );
		}
		if ( $render_with === 'template' ) {
			$this->set_render_template_param( $args, $meta_box );
		}
		if ( $render_with === 'code' ) {
			$this->set_render_callback_param_for_code( $args, $meta_box );
		}

		return $args;
	}

	private function use_block_json( $meta_box ): bool {
		if ( ! is_array( $meta_box ) ) {
			return false;
		}

		$path = Arr::get( $meta_box, 'block_json.path' );

		return Arr::get( $meta_box, 'type' ) === 'block'
			&& Arr::get( $meta_box, 'block_json.enable' )
			&& $path
			&& file_exists( $path );
	}

	private function set_render_callback_param( array &$args, array $meta_box ): void {
		$callback = Arr::get( $meta_box, 'render_callback' );
		if ( ! $callback || ! is_callable( $callback ) ) {
			return;
		}

		// render_callback must return a string, but we echo => capture via output buffering.
		$args['render_callback'] = static function( $attributes, $content, $block ) use ( $callback ) {
			ob_start();
			call_user_func( $callback, $attributes, $content, $block );
			return ob_get_clean();
		};
	}

	private function set_render_template_param( array &$args, array $meta_box ): void {
		$template = Arr::get( $meta_box, 'render_template' );
		if ( ! $template || ! is_string( $template ) ) {
			return;
		}

		// Template with relative path to block.json: handled by WordPress
		if ( str_starts_with( $template, '.' ) ) {
			return;
		}

		// Template with absolute path: include it inside a custom render_callback
		if ( ! file_exists( $template ) ) {
			return;
		}
		$args['render_callback'] = static function( $attributes, $content, $block ) use ( $template ) {
			ob_start();
			include $template;
			return ob_get_clean();
		};
	}

	private function set_render_callback_param_for_code( array &$args, array $meta_box ): void {
		if ( empty( $meta_box['render_code'] ) ) {
			return;
		}

		// render_callback must return a string, but we echo => capture via output buffering.
		$callback = CodeToCallbackTransformer::get_render_callback( $meta_box );
		$args['render_callback'] = static function( $attributes, $content, $block ) use ( $callback ) {
			ob_start();
			call_user_func( $callback, $attributes, $content, $block );
			return ob_get_clean();
		};
	}
}
