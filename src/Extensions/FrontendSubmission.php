<?php
namespace MBB\Extensions;

use MBB\Control;

class FrontendSubmission {
	public function __construct() {
		add_filter( 'mbb_controls', [ $this, 'add_post_fields_controls' ] );
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ], 10, 3 );
		add_filter( 'mbb_field_types', [ $this, 'add_post_fields' ], 10, 2 );
		add_filter( 'mbb_field_categories', [ $this, 'add_post_fields_category' ] );
	}

	public function add_post_fields_controls( array $controls ): array {
		$controls['options_post_content'] = $controls['options_wysiwyg'];

		$controls['std_post_excerpt'] = $controls['std_textarea'];

		$controls['inline_post_date'] = $controls['inline_datetime'];
		$controls['js_options_post_date'] = $controls['js_options_datetime'];

		return $controls;
	}

	public function add_field_controls( array $controls, string $type, string $mode ): array {
		if ( in_array( $type, [ 'button', 'custom_html', 'divider', 'heading', 'tab' ] ) || 'post-submission-form' === $mode ) {
			return $controls;
		}

		$control = Control::Toggle( 'hide_from_front', [
			'name'        => 'hide_from_front',
			'label'       => __( 'Hide from front end?', 'meta-box-builder' ),
			'description' => __( 'Do not show this field in front-end forms.', 'meta-box-builder' ),
		], false, 'advanced' );

		return Control::insert_before( $controls, 'save_field', $control );
	}

	public function add_post_fields_category( array $categories ): array {
		// Add Post Fields category at the beginning
		array_unshift( $categories, [
			'slug'  => 'post-fields',
			'title' => __( 'Post Fields', 'meta-box-builder' ),
		] );

		return $categories;
	}

	public function add_post_fields( array $field_types, string $mode ): array {
		if ( 'post-submission-form' !== $mode ) {
			return $field_types;
		}

		$post_fields = [
			'post_title'     => array_merge( $field_types['text'], [
				'title'           => __( 'Post Title', 'meta-box-builder' ),
				'category'        => 'post-fields',
				'underlying_type' => 'text',
				'defaults'        => [
					'id' => 'post_title',
				],
			] ),
			'post_content'   => array_merge( $field_types['wysiwyg'], [
				'title'           => __( 'Post Content', 'meta-box-builder' ),
				'category'        => 'post-fields',
				'underlying_type' => 'wysiwyg',
				'defaults'        => [
					'id' => 'post_content',
				],
			] ),
			'post_excerpt'   => array_merge( $field_types['textarea'], [
				'title'           => __( 'Post Excerpt', 'meta-box-builder' ),
				'category'        => 'post-fields',
				'underlying_type' => 'textarea',
				'defaults'        => [
					'id' => 'post_excerpt',
				],
			] ),
			'post_date'      => array_merge( $field_types['datetime'], [
				'title'           => __( 'Post Date', 'meta-box-builder' ),
				'category'        => 'post-fields',
				'underlying_type' => 'datetime',
				'defaults'        => [
					'id' => 'post_date',
					'save_format' => 'Y-m-d H:i:s',
				],
			] ),
			'post_thumbnail' => array_merge( $field_types['image'], [
				'title'           => __( 'Post Thumbnail', 'meta-box-builder' ),
				'category'        => 'post-fields',
				'underlying_type' => 'image',
				'defaults'        => [
					'id' => 'post_thumbnail',
				],
			] ),
		];

		foreach ( $post_fields as $id => &$field ) {
			$field['controls'] = array_diff( $field['controls'], [ 'clone_settings', 'input_attributes' ] );

			if ( 'post_date' === $id ) {
				$field['controls'] = array_diff( $field['controls'], [ 'save_format', 'timestamp' ] );
			}
		}

		return array_merge( $post_fields, $field_types );
	}
}
