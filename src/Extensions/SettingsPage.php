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

		if ( is_admin() ) {
			new \MBB\SettingsPage\Edit( 'mb-settings-page', __( 'Settings Page ID', 'meta-box-builder' ) );
		}
	}
}