<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Group {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-group' ) ) {
			return;
		}
		add_filter( 'mbb_fields', [ $this, 'add_field' ] );
	}

	public function add_field( $fields ) {
		$fields['group'] = [
			'title'    => __( 'Group', 'meta-box-builder' ),
			'category' => 'layout',
			'controls' => [
				'name', 'id', 'label_description', 'desc',
				Control::Checkbox( 'collapsible', __( 'Collapsible', 'meta-box-builder' ) ),
				Control::Select( 'default_state', [
					'label'      => __( 'Default state', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
					'options'    => [
						'expanded'  => __( 'Expanded', 'meta-box-builder' ),
						'collapsed' => __( 'Collapsed', 'meta-box-builder' ),
					],
				], 'expanded' ),
				Control::Checkbox( 'save_state', [
					'label'      => __( 'Save state', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
				] ),
				Control::Input( 'group_title', [
					'label'      => __( 'Group title', 'meta-box-builder' ),
					'tooltip'    => __( 'Use {field_id} for a sub-field value and {#} for the clone index (if the group is cloneable)', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
				] ),
				'clone', 'sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button',
				'before', 'after', 'class', 'save_field', 'sanitize_callback', 'attributes', 'custom_settings',
			],
		];

		return $fields;
	}
}
