<?php
namespace MBB\Extensions;

use MBB\Control;
use MBB\Helpers\Data;
use MBB\Helpers\Arr;

class Tooltip {
	public function __construct() {
		if ( ! Data::is_extension_active( 'meta-box-tooltip' ) ) {
			return;
		}
		add_filter( 'mbb_field_controls', [ $this, 'add_controls' ] );
		add_filter( 'mbb_parsed_field', [ $this, 'parse_field' ] );
	}

	public function add_controls( $fields ) {
		foreach ( $fields as &$controls ) {
			$controls['general']['tooltip_enable'] = Control::Checkbox( [
				'name'  => 'tooltip[enable]',
				'label' => '<a href="https://metabox.io/plugins/meta-box-tooltip/" target="_blank" rel="nofollow noopenner">' . __( 'Tooltip', 'meta-box-builder' ) . '</a>',
			] );
			$controls['general']['tooltip_icon'] = Control::Input( [
				'name'       => 'tooltip[icon]',
				'label'      => __( 'Icon', 'meta-box-builder' ),
				'tooltip'    => __( 'Can be "info" (default), "help", Dashicons or URL of the custom icon image', 'meta-box-builder' ),
				'dependency' => 'tooltip_enable:true',
			] );
			$controls['general']['tooltip_position'] = Control::Select( [
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
			$controls['general']['tooltip_content'] = Control::Input( [
				'name'       => 'tooltip[content]',
				'label'      => __( 'Content', 'meta-box-builder' ),
				'dependency' => 'tooltip_enable:true',
			] );
		}

		return $fields;
	}

	public function parse_field( $settings ) {
		if ( ! Arr::get( $settings, 'tooltip.enable' ) || ! Arr::get( $settings, 'tooltip.content' ) ) {
			unset( $settings['tooltip'] );
		}
		if ( isset( $settings['tooltip'] ) ) {
			unset( $settings['tooltip']['enable'] );
		}
		return $settings;
	}
}