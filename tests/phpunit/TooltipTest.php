<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class TooltipTest extends TestCase {
	public function testTooltipNormalization() {
		$testCases = [ 
			'string' => [ 
				'input' => [ 'tooltip' => 'This is a tooltip' ],
				'expected' => [ 
					'enable' => true,
					'icon' => 'info',
					'position' => 'top',
					'content' => 'This is a tooltip',
					'allow_html' => true,
				],
			],
			'array' => [ 
				'input' => [ 
					'tooltip' => [ 
						'icon' => 'info',
						'position' => 'top',
						'content' => 'Tooltip content',
						'allow_html' => true,
					],
				],
				'expected' => [ 
					'enable' => true,
					'icon' => 'info',
					'position' => 'top',
					'content' => 'Tooltip content',
					'allow_html' => true,
				],
			],
		];

		foreach ( $testCases as $caseName => $case ) {
			$newJson = json_decode( json_encode( [ 
				'$schema' => 'https://schemas.metabox.io/field-group.json',
				'id' => "test-$caseName",
				'title' => "Test $caseName",
				'fields' => [ 
					[ 
						'id' => 'test_field',
						'type' => 'text',
						'name' => 'Test Field',
					] + $case['input']
				],
				'modified' => 1741272808,
			] ), true );

			$unparser = new MetaBox( $newJson );
			$unparser->unparse();
			$result = $unparser->get_settings();

			// Check fields
			$this->assertArrayHasKey( 'fields', $result, "[$caseName] Result should have 'fields' key" );
			$this->assertArrayHasKey( 'test_field', $result['fields'], "[$caseName] 'fields' should have 'test_field'" );
			$field = $result['fields']['test_field'];

			// Check tooltip normalization
			$this->assertArrayHasKey( 'tooltip', $field, "[$caseName] Field should have 'tooltip'" );
			$tooltip = $field['tooltip'];

			$this->assertIsArray( $tooltip, "[$caseName] 'tooltip' should be an array" );
			$this->assertEquals(
				$case['expected'],
				$tooltip,
				"[$caseName] 'tooltip' should match expected normalized array"
			);

			// Verify all required keys are present
			$requiredKeys = [ 'enable', 'icon', 'position', 'content', 'allow_html' ];
			foreach ( $requiredKeys as $key ) {
				$this->assertArrayHasKey( $key, $tooltip, "[$caseName] 'tooltip' should have '$key' key" );
			}

			// Check meta_box.fields retains original
			$metaField = $result['meta_box']['fields'][0];
			$this->assertArrayHasKey( 'tooltip', $metaField, "[$caseName] 'meta_box.fields' should retain 'tooltip'" );
			$this->assertEquals(
				$case['input']['tooltip'],
				$metaField['tooltip'],
				"[$caseName] 'tooltip' in 'meta_box.fields' should match original input"
			);

			// Only check for 'enable' absence if tooltip is an array
			if ( is_array( $metaField['tooltip'] ) ) {
				$this->assertArrayNotHasKey( 'enable', $metaField['tooltip'], "[$caseName] 'meta_box.fields.tooltip' should not have 'enable'" );
			}
		}
	}
}
