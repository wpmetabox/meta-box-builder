<?php
use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class GroupTest extends TestCase {
	public function testGroupFieldConversionFromNewFormat() {
		// Sample new format JSON with a Group field
		$newJson = json_decode( '{
			"$schema": "https://schemas.metabox.io/field-group.json",
			"id": "listing-details",
			"title": "Listing Details",
			"fields": [
				{
					"name": "Highlights Group",
					"id": "HighlightsGroup",
					"type": "group",
					"clone": true,
					"fields": [
						{
							"name": "Highlight",
							"id": "highlight",
							"type": "text"
						},
						{
							"name": "Description",
							"id": "description",
							"type": "textarea"
						}
					]
				}
			],
			"modified": 1741272808
		}', true );

		$unparser = new MetaBox( $newJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		// Check top-level fields is a key-value array
		$this->assertArrayHasKey( 'fields', $result, "Result should have 'fields' key" );
		$this->assertIsArray( $result['fields'], "'fields' should be an array" );
		$this->assertArrayHasKey( 'HighlightsGroup', $result['fields'], "'fields' should use 'HighlightsGroup' as key" );

		// Check the Group field structure
		$groupField = $result['fields']['HighlightsGroup'];
		$this->assertEquals( 'group', $groupField['type'], "Field type should be 'group'" );
		$this->assertArrayHasKey( 'fields', $groupField, "Group field should have nested 'fields'" );
		$this->assertIsArray( $groupField['fields'], "Nested 'fields' should be an array" );

		// Check that nested fields is a key-value array
		$nestedFields = $groupField['fields'];
		$this->assertArrayHasKey( 'highlight', $nestedFields, "Nested 'fields' should use 'highlight' as key" );
		$this->assertArrayHasKey( 'description', $nestedFields, "Nested 'fields' should use 'description' as key" );
		$this->assertFalse(
			array_key_exists( 0, $nestedFields ),
			"Nested 'fields' should not have numeric keys"
		);

		// Required keys to check
		$requiredKeys = [ 'id', '_id', 'name', 'type', 'save_field' ];

		// Check each nested field has required keys
		foreach ( $nestedFields as $fieldId => $field ) {
			foreach ( $requiredKeys as $key ) {
				$this->assertArrayHasKey(
					$key,
					$field,
					"Field '$fieldId' should have '$key' key"
				);
				$this->assertNotNull(
					$field[ $key ],
					"Field '$fieldId' key '$key' should not be null"
				);
			}

			// Specific value checks
			$this->assertEquals( $fieldId, $field['id'], "Field '$fieldId' 'id' should match its key" );
			$this->assertEquals( $fieldId, $field['_id'], "Field '$fieldId' '_id' should match its key" );
			$this->assertTrue(
				$field['save_field'],
				"Field '$fieldId' 'save_field' should default to true"
			);
		}

		// Contrast with meta_box.fields (should be numeric array)
		$this->assertArrayHasKey( 'meta_box', $result, "Result should have 'meta_box'" );
		$this->assertArrayHasKey( 'fields', $result['meta_box'], "'meta_box' should have 'fields'" );
		$this->assertIsArray( $result['meta_box']['fields'], "'meta_box.fields' should be an array" );
		$this->assertTrue(
			array_key_exists( 0, $result['meta_box']['fields'] ),
			"'meta_box.fields' should have numeric keys"
		);
	}
}
