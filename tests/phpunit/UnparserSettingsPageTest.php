<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use MBB\Normalizer;

class UnparserSettingsPageTest extends TestCase {
	protected $json;

	protected $normalized;

	protected function setUp(): void {
		$json             = file_get_contents( dirname( __DIR__ ) . '/examples/settings.json' );
		$this->json       = json_decode( $json, true );
		$this->normalized = Normalizer::normalize( $this->json );
	}

	public function testSettingsPageProperty() {
		$this->assertArrayHasKey( 'settings_page', $this->normalized );
		$this->assertIsArray( $this->normalized['settings_page'] );

		$settings_page = $this->normalized['settings_page'];

		$this->assertArrayHasKey( 'id', $settings_page );
	}
}
