<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class ColumnsTest extends TestCase {
    public function testColumnsNormalization() {
        $testCases = [
            'simple_new' => [
                'input' => [
                    'columns' => [
                        'column-1' => 4,
                        'column-2' => ['size' => 4, 'class' => 'custom-css-class']
                    ]
                ],
                'is_new_format' => true,
                'expected_json' => '{"column-1":4,"column-2":{"size":4,"class":"custom-css-class"}}'
            ],
            'simple_old' => [
                'input' => [
                    'meta_box' => [
                        'columns' => [
                            'column-1' => 4,
                            'column-2' => ['size' => 4, 'class' => 'custom-css-class']
                        ]
                    ]
                ],
                'is_new_format' => false,
                'expected_json' => '{"column-1":4,"column-2":{"size":4,"class":"custom-css-class"}}'
            ]
        ];

        foreach ($testCases as $caseName => $case) {
            $baseJson = [
                '$schema' => 'https://schemas.metabox.io/field-group.json',
                'id' => "test-$caseName",
                'title' => "Test $caseName",
                'fields' => [
                    ['id' => 'test_field', 'type' => 'text', 'name' => 'Test Field']
                ],
                'modified' => 1741272808
            ];

            $newJson = json_decode(json_encode(
                $case['is_new_format']
                    ? array_merge($baseJson, $case['input'])
                    : array_merge($baseJson, $case['input'])
            ), true);

            $unparser = new MetaBox($newJson);
            $unparser->unparse();
            $result = $unparser->get_settings();

            // Check settings.custom_settings.columns
            $this->assertArrayHasKey('settings', $result, "[$caseName] Result should have 'settings' key");
            $this->assertArrayHasKey('custom_settings', $result['settings'], "[$caseName] 'settings' should have 'custom_settings'");
            $customSettings = $result['settings']['custom_settings'];
            $this->assertIsArray($customSettings, "[$caseName] 'custom_settings' should be an array");

            $columnsFound = false;
            foreach ($customSettings as $uuid => $setting) {
                $this->assertIsString($uuid, "[$caseName] 'custom_settings' keys should be UUIDs");
                $this->assertArrayHasKey('id', $setting, "[$caseName] Custom setting should have 'id'");
                $this->assertArrayHasKey('key', $setting, "[$caseName] Custom setting should have 'key'");
                $this->assertArrayHasKey('value', $setting, "[$caseName] Custom setting should have 'value'");
                $this->assertEquals($uuid, $setting['id'], "[$caseName] 'id' should match UUID");

                if ($setting['key'] === 'columns') {
                    $columnsFound = true;
                    $this->assertEquals(
                        $case['expected_json'],
                        $setting['value'],
                        "[$caseName] 'columns' value should be JSON-encoded correctly"
                    );
                }
            }
            $this->assertTrue($columnsFound, "[$caseName] 'columns' should be present in 'custom_settings'");

            // Check original location
            if ($case['is_new_format']) {
                $this->assertArrayHasKey('columns', $result, "[$caseName] New format should retain 'columns' at root");
                $this->assertEquals(
                    $case['input']['columns'],
                    $result['columns'],
                    "[$caseName] 'columns' at root should match original input"
                );
            } else {
                $this->assertArrayHasKey('meta_box', $result, "[$caseName] Result should have 'meta_box'");
                $this->assertArrayHasKey('columns', $result['meta_box'], "[$caseName] Old format should retain 'columns' in 'meta_box'");
                $this->assertEquals(
                    $case['input']['meta_box']['columns'],
                    $result['meta_box']['columns'],
                    "[$caseName] 'columns' in 'meta_box' should match original input"
                );
            }
        }
    }
}
