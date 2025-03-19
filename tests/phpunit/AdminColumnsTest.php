<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class AdminColumnsTest extends TestCase {
    public function testAdminColumnsNormalization() {
        $testCases = [
            'boolean_true' => [
                'input' => ['admin_columns' => true],
                'expected' => [
                    'enable' => true,
                    'position' => 'after title',
                    'title' => '',
                    'before' => '',
                    'after' => '',
                    'sort' => false,
                    'searchable' => false,
                    'filterable' => false,
                    'link' => false
                ]
            ],
            'simple_string' => [
                'input' => ['admin_columns' => 'before title'],
                'expected' => [
                    'enable' => true,
                    'position' => 'before title',
                    'title' => '',
                    'before' => '',
                    'after' => '',
                    'sort' => false,
                    'searchable' => false,
                    'filterable' => false,
                    'link' => false
                ]
            ],
            'full_array' => [
                'input' => [
                    'admin_columns' => [
                        'position' => 'after title',
                        'title' => 'Price',
                        'before' => '$',
                        'after' => ' USD',
                        'sort' => true,
                        'searchable' => true,
                        'filterable' => false,
                        'link' => 'edit'
                    ]
                ],
                'expected' => [
                    'enable' => true,
                    'position' => 'after title',
                    'title' => 'Price',
                    'before' => '$',
                    'after' => ' USD',
                    'sort' => true,
                    'searchable' => true,
                    'filterable' => false,
                    'link' => 'edit'
                ]
            ]
        ];

        foreach ($testCases as $caseName => $case) {
            $newJson = json_decode(json_encode([
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
                'modified' => 1741272808
            ]), true);

            $unparser = new MetaBox($newJson);
            $unparser->unparse();
            $result = $unparser->get_settings();

            // Check fields
            $this->assertArrayHasKey('fields', $result, "[$caseName] Result should have 'fields' key");
            $this->assertArrayHasKey('test_field', $result['fields'], "[$caseName] 'fields' should have 'test_field'");
            $field = $result['fields']['test_field'];

            // Check admin_columns normalization
            $this->assertArrayHasKey('admin_columns', $field, "[$caseName] Field should have 'admin_columns'");
            $ac = $field['admin_columns'];

            $this->assertIsArray($ac, "[$caseName] 'admin_columns' should be an array");
            $this->assertEquals(
                $case['expected'],
                $ac,
                "[$caseName] 'admin_columns' should match expected normalized array"
            );

            // Verify all required keys are present
            $requiredKeys = ['enable', 'position', 'title', 'before', 'after', 'sort', 'searchable', 'filterable', 'link'];
            foreach ($requiredKeys as $key) {
                $this->assertArrayHasKey($key, $ac, "[$caseName] 'admin_columns' should have '$key' key");
            }

            // Check meta_box.fields retains original
            $metaField = $result['meta_box']['fields'][0];
            $this->assertArrayHasKey('admin_columns', $metaField, "[$caseName] 'meta_box.fields' should retain 'admin_columns'");
            $this->assertEquals(
                $case['input']['admin_columns'],
                $metaField['admin_columns'],
                "[$caseName] 'admin_columns' in 'meta_box.fields' should match original input"
            );

            // Only check for 'enable' absence if admin_columns is an array
            if (is_array($metaField['admin_columns'])) {
                $this->assertArrayNotHasKey('enable', $metaField['admin_columns'], "[$caseName] 'meta_box.fields.admin_columns' should not have 'enable'");
            }
        }
    }
}
