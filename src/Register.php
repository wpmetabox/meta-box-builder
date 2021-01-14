<?php
namespace MBB;

use MBB\Helpers\Arr;
use Twig_Loader_Array;
use Twig_Environment;

class Register {
	private $meta_box_post_ids = [];

	public function __construct() {
		add_filter( 'rwmb_meta_boxes', array( $this, 'register_meta_box' ) );
	}

	public function register_meta_box( $meta_boxes ) {
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
			$this->transform_for_block( $meta_box );
			$this->create_custom_table( $meta_box, $post_id );
			$meta_boxes[] = $meta_box;

			$settings = get_post_meta( $post_id, 'settings', true );
			if ( 'post' === Arr::get( $settings, 'object_type', 'post' ) ) {
				$this->meta_box_post_ids[ $meta_box['id'] ] = $post_id;
			}
		}

		if ( ! empty( $this->meta_box_post_ids ) ) {
			add_action( 'rwmb_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		}

		return $meta_boxes;
	}

	private function transform_for_block( &$meta_box ) {
		if ( ! Helpers\Data::is_extension_active( 'mb-blocks' ) || empty( $meta_box['type'] ) || 'block' !== $meta_box['type'] ) {
			return;
		}

		if ( empty( $meta_box['render_code'] ) ) {
			return;
		}

		$meta_box['render_callback'] = function( $attributes, $is_preview = false, $post_id = null ) use ( $meta_box ) {
			$data               = $attributes;
			$data['is_preview'] = $is_preview;
			$data['post_id']    = $post_id;

			// Get all fields data.
			foreach ( $meta_box['fields'] as $field ) {
				$data[ $field['id'] ] = 'group' === $field['type'] ? mb_get_block_field( $field['id'], [] ) : mb_the_block_field( $field['id'], [], false );
			}

			// Proxy for all PHP/WordPress functions.
			$loader     = new Twig_Loader_Array( [
			    'block' => '{% autoescape false %}' . $meta_box['render_code'] . '{% endautoescape %}',
			] );
			$twig       = new Twig_Environment( $loader );
			$data['mb'] = new TwigProxy;

			echo $twig->render( 'block', $data );
		};
	}

	private function create_custom_table( $meta_box, $post_id ) {
		if ( ! Helpers\Data::is_extension_active( 'mb-custom-table' ) || empty( $meta_box['table'] ) ) {
			return;
		}

		// Get full custom table settings from JavaScript data.
		$settings = get_post_meta( $post_id, 'settings', true );
		if ( ! Helpers\Arr::get( $settings, 'custom_table.create' ) ) {
			return;
		}
		$columns = [];
		foreach ( $meta_box['fields'] as $field ) {
			$columns[ $field['id'] ] = 'TEXT';
		}
		\MB_Custom_Table_API::create( $meta_box['table'], $columns );
	}

	public function enqueue_assets() {
		wp_enqueue_style( 'mbb-post', MBB_URL . 'assets/css/post.css' );
		wp_enqueue_script( 'mbb-post', MBB_URL . 'assets/js/post.js', [], MBB_VER, true );
		wp_localize_script( 'mbb-post', 'MBB', [
			'meta_box_post_ids' => $this->meta_box_post_ids,
			'base_url'          => admin_url( 'post.php?action=edit&post=' ),
			'title'             => __( 'Edit the field group settings', 'meta-box-builder' )
		] );
	}
}
