<?php
namespace MBB\Relationships;

use MBB\RestApi\Base;
use MBB\Control;
use MBB\Helpers\Data;

class RestApi extends Base {
	public function get_relationships_sides() {
		$sides = [
			[
				'title'    => __( 'From', 'meta-box-builder' ),
				'id'       => 'from',
				'controls' => $this->get_controls( 'from' ),
			],
			[
				'title'    => __( 'To', 'meta-box-builder' ),
				'id'       => 'to',
				'controls' => $this->get_controls( 'to' ),
			],
		];

		return $sides;
	}

	private function get_controls( $side ) {
		$controls = [
			Control::Select( 'object_type', [
				'label'   => __( 'Object type', 'meta-box-builder' ),
				'options' => [
					'post' => __( 'Post', 'meta-box-builder' ),
					'term' => __( 'Term', 'meta-box-builder' ),
					'user' => __( 'User', 'meta-box-builder' ),
				],
			], 'post' ),
			Control::Select( 'post_type', [
				'label'      => __( 'Post type', 'meta-box-builder' ),
				'options'    => $this->get_post_types(),
				'dependency' => 'object_type:post',
			], 'post' ),
			Control::Select( 'taxonomy', [
				'label'      => __( 'Taxonomy', 'meta-box-builder' ),
				'options'    => $this->get_taxonomies(),
				'dependency' => 'object_type:term',
			], 'category' ),
			Control::Input( 'empty_message', [
				'label'   => __( 'Empty message', 'meta-box-builder' ),
				'tooltip' => __( 'The message displayed when there’s no connections', 'meta-box-builder' ),
			] ),
		];

		return $controls;
	}

	private function get_post_types() {
		$post_types = Data::get_post_types();
		$options = [];
		foreach ( $post_types as $post_type ) {
			$options[ $post_type['slug'] ] = sprintf( '%s (%s)', $post_type['name'], $post_type['slug'] );
		}
		return $options;
	}

	private function get_taxonomies() {
		$taxonomies = Data::get_taxonomies();
		$options = [];
		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy['slug'] ] = sprintf( '%s (%s)', $taxonomy['name'], $taxonomy['slug'] );
		}
		return $options;
	}
}