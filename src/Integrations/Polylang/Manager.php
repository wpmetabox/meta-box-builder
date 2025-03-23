<?php
namespace MBB\Integrations\Polylang;

class Manager {
	public function __construct() {
		if ( ! defined( 'POLYLANG_VERSION' ) ) {
			return;
		}

		new FieldGroup();
		// new SettingsPage();
		// new Relationship();
	}
}