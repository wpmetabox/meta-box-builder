<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class MetaBoxUnparserTest extends TestCase {
	protected $newJson;
	protected $oldJson;

	protected function setUp(): void {
		// Load new format sample
		$this->newJson = json_decode( '{
            "$schema": "https://schemas.metabox.io/field-group.json",
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
                        }
                    ]
                }
            ],
            "id": "listing-details",
            "title": "Listing Details",
            "storage_type": "custom_table",
            "table": "ss_customtable",
            "modified": 1741272808
        }', true );

		// Load old format sample (simplified for testing)
		$this->oldJson = json_decode( '{
            "post_type": "meta-box",
            "post_name": "listing-details",
            "post_title": "Listing Details",
            "post_status": "publish",
            "modified": 1741272808,
            "settings": {
                "object_type": "post",
                "post_types": ["real-estate"]
            },
            "fields": {
                "group_vti4hxrk2c9": {
                    "name": "Highlights Group",
                    "id": "HighlightsGroup",
                    "type": "group",
                    "clone": true
                }
            },
            "data": [],
            "meta_box": {
                "modified": 1741272808,
                "title": "Listing Details",
                "id": "listing-details",
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
                            }
                        ]
                    }
                ]
            }
        }', true );
	}

	public function testNewFormatHasRequiredKeys() {
		$unparser = new MetaBox( $this->newJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		$this->assertArrayHasKey( 'settings', $result );
		$this->assertArrayHasKey( 'fields', $result );
		$this->assertArrayHasKey( 'data', $result );
		$this->assertArrayHasKey( 'meta_box', $result );
	}

	public function testNewFormatSetsDefaultEmptyValues() {
		$unparser = new MetaBox( $this->newJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		$this->assertEmpty( $result['data'] );
		$this->assertEquals( 'meta-box', $result['post_type'] );
		$this->assertEquals( 'publish', $result['post_status'] );
		$this->assertEquals( '', $result['post_content'] );
	}

	public function testNewFormatPreservesMetaBoxData() {
		$unparser = new MetaBox( $this->newJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		$this->assertEquals( 'listing-details', $result['meta_box']['id'] );
		$this->assertEquals( 'Listing Details', $result['meta_box']['title'] );
		$this->assertEquals( 'custom_table', $result['meta_box']['storage_type'] );
		$this->assertEquals( 'ss_customtable', $result['meta_box']['table'] );
	}

	public function testOldFormatPreservesOriginalStructure() {
		$unparser = new MetaBox( $this->oldJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		// Check root-level post fields
		$this->assertEquals( $this->oldJson['post_type'], $result['post_type'] );
		$this->assertEquals( $this->oldJson['post_name'], $result['post_name'] );
		$this->assertEquals( $this->oldJson['post_title'], $result['post_title'] );
		$this->assertEquals( $this->oldJson['post_status'], $result['post_status'] );
		$this->assertArrayHasKey( 'post_content', $result );

		// Check settings preservation (ensure all old keys exist, allow extra keys)
		if ( isset( $this->oldJson['settings'] ) ) {
			$missingKeys = array_diff_key( $this->oldJson['settings'], $result['settings'] );
			$this->assertEmpty(
				$missingKeys,
				"Result 'settings' is missing keys: " . implode( ', ', array_keys( $missingKeys ) )
			);
		}

		// Check meta_box preservation
		$this->assertEquals( $this->oldJson['meta_box']['id'], $result['meta_box']['id'] );
		$this->assertEquals( $this->oldJson['meta_box']['title'], $result['meta_box']['title'] );
	}

	public function testFieldConversionConsistency() {
		$unparserNew = new MetaBox( $this->newJson );
		$unparserNew->unparse();
		$newResult = $unparserNew->get_settings();

		$unparserOld = new MetaBox( $this->oldJson );
		$unparserOld->unparse();
		$oldResult = $unparserOld->get_settings();

		// Compare core field structure
		$newFields = $newResult['meta_box']['fields'][0];
		$oldFields = $oldResult['meta_box']['fields'][0];

		$this->assertEquals( $newFields['name'], $oldFields['name'] );
		$this->assertEquals( $newFields['id'], $oldFields['id'] );
		$this->assertEquals( $newFields['type'], $oldFields['type'] );
		$this->assertEquals( $newFields['clone'], $oldFields['clone'] );
	}

	public function testMinimalNewFormat() {
		$minimalJson = [ 
			'id' => 'test-id',
			'title' => 'Test Title',
			'fields' => [ 
				[ 
					'id' => 'test_field',
					'type' => 'text',
				],
			],
		];

		$unparser = new MetaBox( $minimalJson );
		$unparser->unparse();
		$result = $unparser->get_settings();

		$this->assertEquals( 'test-id', $result['meta_box']['id'] );
		$this->assertEquals( 'Test Title', $result['meta_box']['title'] );
		$this->assertCount( 1, $result['meta_box']['fields'] );
		$this->assertEmpty( $result['data'] );
	}
}