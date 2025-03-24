<?php
namespace MBB\Integrations\Polylang;

class Manager {
	public function __construct() {
		if ( ! function_exists( 'pll_register_string' ) ) {
			return;
		}

		new FieldGroup();
		new SettingsPage();
		new Relationship();
	}
}