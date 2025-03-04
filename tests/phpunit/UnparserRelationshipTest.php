<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use MBB\Normalizer;

class UnparserRelationshipTest extends TestCase {
	protected $json;

	protected $normalized;

	protected function setUp(): void {
		$json             = file_get_contents( dirname( __DIR__ ) . '/examples/relationships.json' );
		$this->json       = json_decode( $json, true );
		$this->normalized = Normalizer::normalize( $this->json );
	}

	public function testRelationshipProperty() {
		$relationships = $this->normalized['relationship'];
		
		$this->assertArrayHasKey( 'relationship', $this->normalized );
		$this->assertIsArray( $relationships );
	}
}