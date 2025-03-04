<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use MBB\Normalizer;

class GroupTest extends TestCase {
	protected $json;

	protected function setUp(): void {
		$json       = file_get_contents( dirname( __DIR__ ) . '/examples/group.json' );
		$this->json = json_decode( $json, true );
	}

	/**
	 * Test group field property
	 */
	public function testGroupField() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$group = $fields['group'];

		// Other test already handle required fields for 
		// generic fields so we only checks for group specific
		// fields
		$required_group_props = [ 
			'group_title',
			'fields',
		];

		foreach ( $required_group_props as $prop ) {
			$this->assertArrayHasKey( $prop, $group );
		}

		$this->assertIsArray( $group['fields'] );
		// Check if group fields is key value array
		$keys = array_keys( $group['fields'] );
		foreach ( $keys as $key ) {
			$this->assertIsString( $key );
		}

		// Check if all fields in group have required fields
		foreach ( $group['fields'] as $field ) {
			$field_keys = array_keys( $field );

			$required_fields = [ 
				'id',
				'_id',
				'name',
				'type',
				'save_field',
			];

			foreach ( $required_fields as $required_field ) {
				$this->assertContains( $required_field, $field_keys );
			}
		}
	}
}
