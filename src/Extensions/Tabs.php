<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Tabs {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-tabs' ) ) {
			return;
		}
		add_filter( 'mbb_field_types', [ $this, 'add_field_types' ] );
		add_filter( 'mbb_field_controls', [ $this, 'add_field_controls' ] );
	}

	public function add_field_types( $types ) {
		$types[] = [
			'name'     => 'tab',
			'title'    => __( 'Tab', 'meta-box-builder' ),
			'category' => 'layout',
		];
		return $types;
	}

	public function add_field_controls( $fields ) {
		$fields['tab'] = [
			'general'  => [
				'name'      => $fields['text']['general']['name'],
				'id'        => $fields['text']['general']['id'],
				'icon_type' => Control::Select( [
					'label'   => __( 'Icon type', 'meta-box-builder' ),
					'options' => [
						'dashicons'   => __( 'Dashicons', 'meta-box-builder' ),
						'fontawesome' => __( 'Font Awesome', 'meta-box-builder' ),
						'url'         => __( 'Custom URL', 'meta-box-builder' ),
					],
				], 'dashicons' ),
				'icon' => Control::Icon( [
					'label'      => __( 'Icon', 'meta-box-builder' ),
					'dependency' => 'icon_type:dashicons',
				] ),
				'icon_fa' => Control::Input( [
					'label'      => '<a href="https://fontawesome.com/icons?d=gallery&m=free" target="_blank" rel="noopenner noreferrer">' . __( 'Icon CSS class', 'meta-box-builder' ) . '</a>',
					'dependency' => 'icon_type:fontawesome',
				] ),
				'icon_url' => Control::Input( [
					'label'      => __( 'Icon URL', 'meta-box-builder' ),
					'dependency' => 'icon_type:url',
				] ),
			],
		];

		return $fields;
	}
}