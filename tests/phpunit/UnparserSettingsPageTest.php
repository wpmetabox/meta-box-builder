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
		$settings = $this->normalized['settings'];
		
		$this->assertArrayHasKey( 'settings_page', $settings );
		$this->assertIsArray( $settings['settings_page'] );

		$settings_page = $settings['settings_page'];

		// @todo: Test setting page should have required fields
	}
}
