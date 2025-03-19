<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class TabsTest extends TestCase {
	public function testTabNormalization() {
		$testCases = [ 
			'new_format' => [ 
				'input' => [ 
					'tabs' => [ 
						'contact' => 'Contact',
						'social' => [ 'label' => 'Social Media', 'icon' => 'dashicons-share' ],
					],
					'tab_style' => 'box',
					'tab_default_active' => 'contact',
					'tab_remember' => true,
					'fields' => [ 
						[ 'id' => 'phone', 'type' => 'text', 'name' => 'Phone', 'tab' => 'contact' ],
						[ 'id' => 'twitter', 'type' => 'text', 'name' => 'Twitter', 'tab' => 'social' ],
					],
				],
				'is_new_format' => true,
			],
			'old_format' => [ 
				'input' => [ 
					'meta_box' => [ 
						'tabs' => [ 
							'contact' => 'Contact',
							'social' => [ 'label' => 'Social Media', 'icon' => 'dashicons-share' ],
						],
						'tab_style' => 'left',
						'tab_default_active' => 'social',
						'tab_remember' => false,
						'fields' => [ 
							[ 'id' => 'phone', 'type' => 'text', 'name' => 'Phone', 'tab' => 'contact' ],
							[ 'id' => 'twitter', 'type' => 'text', 'name' => 'Twitter', 'tab' => 'social' ],
						],
					],
					'fields' => [ 
						[ 'id' => 'phone', 'type' => 'text', 'name' => 'Phone', 'tab' => 'contact' ],
						[ 'id' => 'twitter', 'type' => 'text', 'name' => 'Twitter', 'tab' => 'social' ],
					],
				],
				'is_new_format' => false,
			],
		];

		foreach ( $testCases as $caseName => $case ) {
			$baseJson = [ 
				'$schema' => 'https://schemas.metabox.io/field-group.json',
				'id' => "test-$caseName",
				'title' => "Test $caseName",
				'modified' => 1741272808,
			];

			$newJson = json_decode( json_encode(
				$case['is_new_format']
				? array_merge( $baseJson, $case['input'] )
				: array_merge( $baseJson, $case['input'] )
			), true );

			$unparser = new MetaBox( $newJson );
			$unparser->unparse();
			$result = $unparser->get_settings();

			// Check fields for tab fields
			$this->assertArrayHasKey( 'fields', $result, "[$caseName] Result should have 'fields'" );
			$fields = array_values( $result['fields'] );
			$this->assertGreaterThanOrEqual( 4, count( $fields ), "[$caseName] Should have at least 4 fields (2 tabs + 2 fields)" );

			$tabs    = $case['is_new_format'] ? $case['input']['tabs'] : $case['input']['meta_box']['tabs'];
			$tab_ids = array_keys( $tabs );
			$this->assertEquals( 'tab', $fields[0]['type'], "[$caseName] First field should be a tab" );
			$this->assertEquals( $tab_ids[0], $fields[0]['id'], "[$caseName] First tab ID should match" );
			$this->assertEquals( 'tab', $fields[2]['type'], "[$caseName] Third field should be a tab" );
			$this->assertEquals( $tab_ids[1], $fields[2]['id'], "[$caseName] Second tab ID should match" );

			foreach ( $tabs as $tab_id => $tab_data ) {
				$label     = is_array( $tab_data ) ? $tab_data['label'] : $tab_data;
				$icon      = is_array( $tab_data ) ? ( $tab_data['icon'] ?? '' ) : '';
				$tab_field = array_filter( $fields, fn( $f ) => $f['id'] === $tab_id )[ array_key_first( array_filter( $fields, fn( $f ) => $f['id'] === $tab_id ) ) ];
				$this->assertEquals( 'tab', $tab_field['type'], "[$caseName] Field '$tab_id' should be a tab" );
				$this->assertEquals( $label, $tab_field['name'], "[$caseName] Tab '$tab_id' name should match" );
				if ( $icon ) {
					$this->assertEquals( $icon, $tab_field['icon'], "[$caseName] Tab '$tab_id' icon should match" );
				}
			}

			// Check custom_settings
			$this->assertArrayHasKey( 'settings', $result, "[$caseName] Result should have 'settings'" );
			$this->assertArrayHasKey( 'custom_settings', $result['settings'], "[$caseName] 'settings' should have 'custom_settings'" );
			$cs            = $result['settings']['custom_settings'];
			$expected_keys = [ 'tab_style', 'tab_default_active', 'tab_remember' ];
			foreach ( $expected_keys as $key ) {
				$this->assertArrayHasKey( $key, $cs, "[$caseName] 'custom_settings' should have '$key'" );
				$this->assertEquals( $key, $cs[ $key ]['key'], "[$caseName] '$key' key should match" );
				$expected_value = $case['is_new_format'] ? ( $case['input'][ $key ] ?? ( $key === 'tab_remember' ? false : '' ) ) : ( $case['input']['meta_box'][ $key ] ?? ( $key === 'tab_remember' ? false : '' ) );
				$this->assertEquals( $expected_value, $cs[ $key ]['value'], "[$caseName] '$key' value should match" );
			}

			// Check original location
			if ( $case['is_new_format'] ) {
				$this->assertArrayHasKey( 'tabs', $result, "[$caseName] New format should retain 'tabs' at root" );
				$this->assertEquals( $case['input']['tabs'], $result['tabs'], "[$caseName] 'tabs' at root should match" );
			} else {
				$this->assertArrayHasKey( 'meta_box', $result, "[$caseName] Result should have 'meta_box'" );
				$this->assertArrayHasKey( 'tabs', $result['meta_box'], "[$caseName] Old format should retain 'tabs' in 'meta_box'" );
				$this->assertEquals( $case['input']['meta_box']['tabs'], $result['meta_box']['tabs'], "[$caseName] 'tabs' in 'meta_box' should match" );
			}
		}
	}
}
