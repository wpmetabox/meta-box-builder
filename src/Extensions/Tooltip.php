<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;

class Tooltip {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-tooltip' ) ) {
			return;
		}
		add_filter( 'mbb_fields', [ $this, 'add_settings' ] );
	}

	public function add_settings( $fields ) {
		foreach ( $fields as &$data ) {
			$data['general']['tooltip_enable'] = Control::Checkbox( [
				'name'  => 'tooltip[enable]',
				'label' => '<a href="https://metabox.io/plugins/meta-box-tooltip/" target="_blank" rel="nofollow noopenner">' . __( 'Tooltip', 'meta-box-builder' ) . '</a>',
			] );
			$data['general']['tooltip_icon'] = Control::Input( [
				'name'       => 'tooltip[icon]',
				'label'      => __( 'Icon', 'meta-box-builder' ),
				'tooltip'    => __( 'Can be "info" (default), "help", Dashicons or URL of the custom icon image', 'meta-box-builder' ),
				'dependency' => 'tooltip_enable:true',
			] );
			$data['general']['tooltip_position'] = Control::Select( [
				'name'       => 'tooltip[position]',
				'label'      => __( 'Position', 'meta-box-builder' ),
				'dependency' => 'tooltip_enable:true',
				'options'    => [
					'top'    => __( 'Top', 'meta-box-builder' ),
					'bottom' => __( 'Bottom', 'meta-box-builder' ),
					'left'   => __( 'Left', 'meta-box-builder' ),
					'right'  => __( 'Right', 'meta-box-builder' ),
				],
			], 'top' );
			$data['general']['tooltip_content'] = Control::Input( [
				'name'       => 'tooltip[content]',
				'label'      => __( 'Content', 'meta-box-builder' ),
				'dependency' => 'tooltip_enable:true',
			] );
		}

		return $fields;
	}
}