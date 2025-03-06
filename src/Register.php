<?php
namespace MBB;

use MetaBox\Support\Arr;

class Register {
	private $meta_box_post_ids = [];

	public function __construct() {
		add_filter( 'rwmb_meta_boxes', [ $this, 'register_meta_box' ] );
	}

	public function register_meta_box( $meta_boxes ): array {
		$files = JsonService::get_files();

		foreach ( $files as $file ) {
			[ $data, $error ] = LocalJson::read_file( $file );

			if ( $data === null || $error !== null ) {
				continue;
			}

			$json     = json_decode( $data, true );
			$meta_box = $json;

			if ( empty( $meta_box ) ) {
				continue;
			}

			$this->transform_for_block( $meta_box );

			// @todo: since we load from files, these fields are not available,
			// we need to find the alternative way to get the post_id
			// ideally, we move create custom table to the save hook
			// and we use post_name instead of post_id 
			// and redirect to the edit screen by post_name
			if ( isset( $data['post_id'] ) ) {
				$post_id = $data['post_id'];
				$this->create_custom_table( $meta_box, $post_id );

				// Get list of meta box ID and meta box post ID to show the edit settings icon on the edit screen.
				$settings = get_post_meta( $post_id, 'settings', true );
				if ( 'post' === Arr::get( $settings, 'object_type', 'post' ) ) {
					$this->meta_box_post_ids[ $meta_box['id'] ] = $post_id;
				}
			}

			$meta_boxes[] = $meta_box;
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

		$meta_box['render_callback'] = function ($attributes, $is_preview = false, $post_id = null) use ($meta_box) {
			$data               = $attributes;
			$data['is_preview'] = $is_preview;
			$data['post_id'] = $post_id;

			// Get all fields data.
			$fields = array_filter( $meta_box['fields'], [ $this, 'has_value' ] );
			foreach ( $fields as $field ) {
				$data[ $field['id'] ] = 'group' === $field['type'] ? mb_get_block_field( $field['id'], [] ) : mb_the_block_field( $field['id'], [], false );
			}

			$loader = new \eLightUp\Twig\Loader\ArrayLoader( [ 
				'block' => '{% autoescape false %}' . $meta_box['render_code'] . '{% endautoescape %}',
			] );
			$twig = new \eLightUp\Twig\Environment( $loader );

			// Proxy for all PHP/WordPress functions.
			$data['mb'] = new TwigProxy();

			echo $twig->render( 'block', $data ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		};
	}

	private function create_custom_table( $meta_box, $post_id ): void {
		if ( ! Helpers\Data::is_extension_active( 'mb-custom-table' ) || empty( $meta_box['table'] ) ) {
			return;
		}

		// Get full custom table settings from JavaScript data.
		$settings = get_post_meta( $post_id, 'settings', true );
		if ( ! Arr::get( $settings, 'custom_table.create' ) ) {
			return;
		}
		$columns = [];
		$fields  = array_filter( $meta_box['fields'], [ $this, 'has_value' ] );
		foreach ( $fields as $field ) {
			$columns[ $field['id'] ] = 'TEXT';
		}

		$data      = [ 
			'table' => $meta_box['table'],
			'columns' => $columns,
		];
		$cache_key = 'mb_create_table_' . md5( wp_json_encode( $data ) );
		if ( get_transient( $cache_key ) !== false ) {
			return;
		}

		\MB_Custom_Table_API::create( $meta_box['table'], $columns );
		set_transient( $cache_key, 1, MONTH_IN_SECONDS );
	}

	public function enqueue_assets(): void {
		wp_enqueue_style( 'mbb-post', MBB_URL . 'assets/css/post.css', [], MBB_VER );
		wp_enqueue_script( 'mbb-post', MBB_URL . 'assets/js/post.js', [], MBB_VER, true );
		\RWMB_Helpers_Field::localize_script_once( 'mbb-post', 'MBB', [ 
			'meta_box_post_ids' => $this->meta_box_post_ids,
			'base_url' => admin_url( 'post.php?action=edit&post=' ),
			'title' => __( 'Edit the field group settings', 'meta-box-builder' ),
		] );
	}

	private function has_value( $field ): bool {
		return ! empty( $field['id'] ) && ! in_array( $field['type'], [ 'heading', 'divider', 'button', 'custom_html', 'tab' ], true );
	}
}
