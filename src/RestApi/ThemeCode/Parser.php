<?php
namespace MBB\RestApi\ThemeCode;

use MBBParser\Parsers\Base;
use MetaBox\Support\Arr;

class Parser extends Base {
	private $theme_code;

	public function parse() {
		$object_types = [
			'settings_pages' => 'setting',
			'taxonomies'     => 'term',
			'comment',
		];
		$params       = [
			'args'      => [],
			'object_id' => '',
		];

		foreach ( $object_types as $key => $object_type ) {
			if ( $this->settings['object_type'] !== $object_type ) {
				continue;
			}

			$params = [
				'args'      => [ "'object_type' => '$object_type'" ],
				'object_id' => is_int( $key ) ? '' : Arr::get( $this->settings, "$key.0" ),
			];
		}

		$this->theme_code = array_merge( $params, [ 'object_type' => $this->settings['object_type'] ] );

		return $this;
	}

	public function get_settings() {
		return $this->theme_code ?: [];
	}
}
