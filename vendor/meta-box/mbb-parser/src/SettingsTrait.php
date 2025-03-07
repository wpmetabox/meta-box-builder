<?php
namespace MBBParser;

use MetaBox\Support\Arr;
/**
 * Use overloading magic methods for short syntax.
 */
trait SettingsTrait {
	protected array $settings;

	public function get_settings(): array {
		return $this->settings;
	}

	public function __get( string $key ) {
		return $this->settings[ $key ] ?? null;
	}

	public function __set( string $key, $value ): void {
		$this->settings[ $key ] = $value;
	}

	public function __isset( string $key ): bool {
		return isset( $this->settings[ $key ] );
	}

	public function __unset( string $key ): void {
		unset( $this->settings[ $key ] );
	}

	/**
	 * Lookup from the data using keys, return the first key found or null
	 * 
	 * @param array $keys
	 * @return mixed
	 */
	public function lookup( array $keys, $default = null ) {
		foreach ( $keys as $key ) {
			if ( Arr::get( $this->settings, $key ) !== null ) {
				return Arr::get( $this->settings, $key );
			}
		}

		return $default;
	}
}
