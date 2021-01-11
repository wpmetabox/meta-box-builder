<?php
namespace MBB\RestApi;

use MBB\Control;
use MBB\Helpers\Data;

class Settings extends Base {
	public function get_settings() {
		$settings = [
			Control::Location()
		];

		if ( Data::is_extension_active( 'meta-box-include-exclude' ) ) {
			$settings[] = Control::IncludeExclude();
		}
		if ( Data::is_extension_active( 'meta-box-show-hide' ) ) {
			$settings[] = Control::ShowHide();
		}
		if ( Data::is_extension_active( 'meta-box-conditional-logic' ) ) {
			$settings[] = Control::ConditionalLogic();
		}
		$settings[] = Control::Post();
		if ( Data::is_extension_active( 'mb-blocks' ) ) {
			$settings[] = Control::Block();
		}
		if ( Data::is_extension_active( 'meta-box-custom-table' ) ) {
			$settings[] = Control::CustomTable();
		}
		if ( Data::is_extension_active( 'meta-box-tabs' ) ) {
			$settings[] = Control::Tabs();
		}

		$settings[] = Control::Input( 'class', [
			'label'   => __( 'Custom CSS class', 'meta-box-builder' ),
			'tooltip' => __( 'Custom CSS class for the meta box wrapper', 'meta-box-builder' ),
		] );
		$settings[] = Control::Input( 'prefix', [
			'label'   => __( 'Field ID prefix', 'meta-box-builder' ),
			'tooltip' => __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden.', 'meta-box-builder' ),
		] );
		$settings[] = Control::KeyValue( 'custom_settings', [
			'label'   => __( 'Custom settings', 'meta-box-builder' ),
			'tooltip' => __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ),
		] );

		$settings = apply_filters( 'mbb_settings', $settings );

		return $settings;
	}
}