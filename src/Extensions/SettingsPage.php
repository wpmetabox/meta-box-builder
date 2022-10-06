<?php
namespace MBB\Extensions;

use MBB\Helpers\Data;

class SettingsPage {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-settings-page' ) ) {
			return;
		}

		new \MBB\SettingsPage\Register;
		new \MBB\SettingsPage\RestApi;
		new \MBB\SettingsPage\Generator;

		if ( is_admin() ) {
			new \MBB\SettingsPage\Edit( 'mb-settings-page', __( 'Settings Page ID', 'meta-box-builder' ) );

			add_filter( 'rwmb_meta_boxes', [ $this, 'add_option_name' ] );
		}
	}

	public function add_option_name( $meta_boxes ){
		$request = rwmb_request();
		$settings = get_post_meta( $request->get('post'), 'settings', true );

		$meta_boxes[] = [
			'title'      => __( 'Settings Page ID', 'meta-box-builder' ),
			'post_types' => [ 'mb-settings-page' ],
			'context'    => 'side',
			'priority'   => 'low',
			'fields'     => [
				[
					'type' => 'text',
					'id'   => 'post_name',
				],				
				[
					'type' => 'custom_html',
					'std'  => '<a class="toggle_option_name" href="javascript:void(0)">Advanced</a>',
				],				
				[
					'type' => 'text',
					'id'=> 'settings[option_name]',
					'name'   => __( 'Option name', 'meta-box-builder' ),
					'tooltip' => __( 'Option name where settings data is saved to. Takes settings page ID if missed. If you want to use theme mods, then set this to <code>theme_mods_$themeslug</code>.', 'meta-box-builder' ),					
					'std' => !empty( $settings ) && isset( $settings['option_name'] ) ? $settings['option_name'] : ''
				]
			],
		];
		return $meta_boxes;
	}
}