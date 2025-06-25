<?php
namespace MBB\Extensions\SettingsPage;

use MBB\Helpers\Data;

class Manager {
	public function __construct() {
		if ( ! Data::is_extension_active( 'mb-settings-page' ) ) {
			return;
		}

		new Register();
		new RestApi();
		new Generator();

		if ( is_admin() ) {
			new Edit( 'mb-settings-page', __( 'Settings Page', 'meta-box-builder' ) );
		}
	}
}
