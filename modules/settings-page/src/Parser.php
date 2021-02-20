<?php
namespace MBB\SettingsPage;

use MBBParser\Parsers\Base;
use MBBParser\Arr;

class Parser extends Base {
	public function parse() {
		$this->parse_menu_icon()
			->parse_tabs();

		if ( 'top' === $this->menu_type ) {
			unset( $this->parent );
		}

		// Cleanup.
		unset( $this->menu_type );
		$this->parse_boolean_values()
			->parse_numeric_values()
			->remove_empty_values()
			->remove_default( 'capability', 'edit_theme_options' )
			->remove_default( 'style', 'boxes' )
			->remove_default( 'columns', 2 )
			->remove_default( 'tab_style', 'default' );
	}

	private function parse_menu_icon() {
		$type = Arr::get( $this->settings, 'icon_type', 'dashicons' );
		$this->icon_url = Arr::get( $this->settings, "icon_$type" );

		if ( 'dashicons' === $type ) {
			$this->icon_url = 'dashicons-' . $this->icon_url;
		}

		$keys = ['icon_type', 'icon_dashicons', 'icon_svg', 'icon_custom'];
		foreach ( $keys as $key ) {
			unset( $this->$key );
		}

		return $this;
	}

	private function parse_tabs() {
		if ( empty( $this->tabs ) ) {
			return;
		}
		$tabs = [];
		foreach ( $this->tabs as $tab ) {
			$tabs[ $tab['key'] ] = $tab['value'];
		}
		$this->tabs = $tabs;

		return $this;
	}
}
