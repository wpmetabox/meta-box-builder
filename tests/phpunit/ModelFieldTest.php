<?php
use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class ModelFieldTest extends TestCase {
	public function testModelFieldUnparseFromExample(): void {
		$json = json_decode( file_get_contents( __DIR__ . '/../examples/model.json' ), true );
		$this->assertIsArray( $json );

		$unparser = new MetaBox( $json );
		$unparser->unparse();
		$result = $unparser->get_settings();

		$this->assertArrayHasKey( 'fields', $result );

		$field = null;
		foreach ( $result['fields'] as $candidate ) {
			if ( ( $candidate['id'] ?? '' ) === 'related_item' ) {
				$field = $candidate;
				break;
			}
		}

		$this->assertNotNull( $field, 'Expected a field with id related_item' );
		$this->assertSame( 'model', $field['type'] );
		$this->assertSame( 'transaction', $field['model'] );
		$this->assertSame( '{transaction_id} — {amount}', $field['item_title'] );
		$this->assertSame( 'select_advanced', $field['field_type'] );
		$this->assertIsArray( $field['query_args'] );
		$this->assertNotEmpty( $field['query_args'] );
	}
}
