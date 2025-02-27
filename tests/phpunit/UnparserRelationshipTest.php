<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use MBB\Normalizer;

class UnparserRelationshipTest extends TestCase {
	protected $json;

	protected $normalized;

	protected function setUp(): void {
		$json             = file_get_contents( dirname( __DIR__ ) . '/examples/settings.json' );
		$this->json       = json_decode( $json, true );
		$this->normalized = Normalizer::normalize( $this->json );
	}

	public function testRelationshipProperty() {
		$settings = $this->normalized['settings'];
		
		$this->assertArrayHasKey( 'relationship', $settings );
		$this->assertIsArray( $settings['relationship'] );
	}
}