<?php
use MBB\Extensions\Relationships\Parsers\Relationship;
use PHPUnit\Framework\TestCase;

class RelationshipModelTest extends TestCase {
	public function testParseSideKeepsModelAndClearsPostTypeTaxonomy(): void {
		$parser = new Relationship( [
			'id'   => 'posts-to-models',
			'from' => [
				'object_type' => 'post',
				'post_type'   => 'post',
				'field'       => [],
				'meta_box'    => [],
			],
			'to'   => [
				'object_type' => 'model',
				'model'       => 'transaction',
				'post_type'   => 'post',
				'taxonomy'    => 'category',
				'field'       => [
					'item_title' => '{transaction_id} — {amount}',
				],
				'meta_box'    => [],
			],
		] );
		$parser->parse();
		$result = $parser->get_settings();

		$this->assertSame( 'model', $result['to']['object_type'] );
		$this->assertSame( 'transaction', $result['to']['model'] );
		$this->assertArrayNotHasKey( 'post_type', $result['to'] );
		$this->assertArrayNotHasKey( 'taxonomy', $result['to'] );
		$this->assertSame( '{transaction_id} — {amount}', $result['to']['field']['item_title'] );
	}

	public function testParseSideFromExampleJson(): void {
		$json = json_decode( file_get_contents( __DIR__ . '/../examples/relationship-model.json' ), true );
		$this->assertIsArray( $json );

		// Parser expects full side arrays with field/meta_box keys.
		$json['from']['field']    = $json['from']['field'] ?? [];
		$json['from']['meta_box'] = $json['from']['meta_box'] ?? [];
		$json['to']['field']      = $json['to']['field'] ?? [];
		$json['to']['meta_box']   = $json['to']['meta_box'] ?? [];

		$parser = new Relationship( $json );
		$parser->parse();
		$result = $parser->get_settings();

		$this->assertSame( 'model', $result['to']['object_type'] );
		$this->assertSame( 'transaction', $result['to']['model'] );
	}
}
