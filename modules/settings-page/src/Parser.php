<?php
namespace MBB\SettingsPage;

use MBBParser\Parsers\Base;
use MBBParser\Arr;

class Parser extends Base {
	public function parse() {
		$type = Arr::get( $this->settings, 'icon_type', 'dashicons' );

		$this->icon_url = Arr::get( $this->settings, "icon_$type" );

		$keys = ['icon_type', 'icon_dashicons', 'icon_svg', 'icon_custom'];
		foreach ( $keys as $key ) {
			unset( $this->$key );
		}
	}
}
