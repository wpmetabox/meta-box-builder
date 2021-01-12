<?php
namespace MBB\RestApi;

use MBB\Control;
use MBB\Helpers\Data;

class Settings extends Base {
	public function get_settings_controls() {
		$controls = [
			Control::Location( 'location' ),
		];

		if ( Data::is_extension_active( 'meta-box-include-exclude' ) ) {
			$controls[] = Control::IncludeExclude( 'include_exclude' );
		}
		if ( Data::is_extension_active( 'meta-box-show-hide' ) ) {
			$controls[] = Control::ShowHide( 'show_hide' );
		}
		if ( Data::is_extension_active( 'meta-box-conditional-logic' ) ) {
			$controls[] = Control::ConditionalLogic( 'conditional_logic', [
				'label'   => '<a href="https://docs.metabox.io/extensions/meta-box-conditional-logic/" target="_blank" rel="noreferrer noopenner">' . __( 'Conditional logic', 'meta-box-builder' ) . '</a>',
				'tooltip' => __( 'Toogle the visibility of the field group by other fields\' values', 'meta-box-builder' ),
			] );
		}
		$controls[] = Control::Post( 'post' );
		if ( Data::is_extension_active( 'mb-blocks' ) ) {
			$controls[] = Control::Block( 'block' );
		}
		if ( Data::is_extension_active( 'meta-box-custom-table' ) ) {
			$controls[] = Control::CustomTable( 'custom_table' );
		}

		$controls[] = Control::Input( 'class', [
			'label'   => __( 'Custom CSS class', 'meta-box-builder' ),
			'tooltip' => __( 'Custom CSS class for the meta box wrapper', 'meta-box-builder' ),
		] );
		$controls[] = Control::Input( 'prefix', [
			'label'   => __( 'Field ID prefix', 'meta-box-builder' ),
			'tooltip' => __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden.', 'meta-box-builder' ),
		] );
		$controls[] = Control::KeyValue( 'custom_settings', [
			'label'   => __( 'Custom settings', 'meta-box-builder' ),
			'tooltip' => __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ),
		] );

		$controls = apply_filters( 'mbb_settings_controls', $controls );

		return $controls;
	}
}