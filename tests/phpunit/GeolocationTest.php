<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class GeolocationTest extends TestCase {
    public function testGeolocationNormalization() {
        $testCases = [
            'boolean_true_new' => [
                'input' => ['geo' => true],
                'is_new_format' => true,
                'expected_value' => true // Expect true or "true"
            ],
            'array_new' => [
                'input' => [
                    'geo' => [
                        'api_key' => 'YOUR API KEY',
                        'componentRestrictions' => ['country' => 'au']
                    ]
                ],
                'is_new_format' => true,
                'expected_value' => '{"api_key":"YOUR API KEY","componentRestrictions":{"country":"au"}}'
            ],
            'boolean_true_old' => [
                'input' => ['meta_box' => ['geo' => true]],
                'is_new_format' => false,
                'expected_value' => true // Expect true or "true"
            ],
            'array_old' => [
                'input' => [
                    'meta_box' => [
                        'geo' => [
                            'api_key' => 'YOUR API KEY',
                            'componentRestrictions' => ['country' => 'au']
                        ]
                    ]
                ],
                'is_new_format' => false,
                'expected_value' => '{"api_key":"YOUR API KEY","componentRestrictions":{"country":"au"}}'
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

            // Check settings.custom_settings.geo
            $this->assertArrayHasKey('settings', $result, "[$caseName] Result should have 'settings' key");
            $this->assertArrayHasKey('custom_settings', $result['settings'], "[$caseName] 'settings' should have 'custom_settings'");
            $customSettings = $result['settings']['custom_settings'];
            $this->assertIsArray($customSettings, "[$caseName] 'custom_settings' should be an array");

            $geoFound = false;
            foreach ($customSettings as $uuid => $setting) {
                $this->assertIsString($uuid, "[$caseName] 'custom_settings' keys should be UUIDs");
                $this->assertArrayHasKey('id', $setting, "[$caseName] Custom setting should have 'id'");
                $this->assertArrayHasKey('key', $setting, "[$caseName] Custom setting should have 'key'");
                $this->assertArrayHasKey('value', $setting, "[$caseName] Custom setting should have 'value'");
                $this->assertEquals($uuid, $setting['id'], "[$caseName] 'id' should match UUID");

                if ($setting['key'] === 'geo') {
                    $geoFound = true;
                    if (is_bool($case['expected_value'])) {
                        // Accept either true or "true" for boolean cases
                        $this->assertTrue(
                            $setting['value'] === true || $setting['value'] === 'true',
                            "[$caseName] 'geo' value should be true or 'true', got " . var_export($setting['value'], true)
                        );
                    } else {
                        $this->assertEquals(
                            $case['expected_value'],
                            $setting['value'],
                            "[$caseName] 'geo' value should match expected"
                        );
                    }
                }
            }
            $this->assertTrue($geoFound, "[$caseName] 'geo' should be present in 'custom_settings'");

            // Check original location
            if ($case['is_new_format']) {
                $this->assertArrayHasKey('geo', $result, "[$caseName] New format should retain 'geo' at root");
                $this->assertEquals(
                    $case['input']['geo'],
                    $result['geo'],
                    "[$caseName] 'geo' at root should match original input"
                );
            } else {
                $this->assertArrayHasKey('meta_box', $result, "[$caseName] Result should have 'meta_box'");
                $this->assertArrayHasKey('geo', $result['meta_box'], "[$caseName] Old format should retain 'geo' in 'meta_box'");
                $this->assertEquals(
                    $case['input']['meta_box']['geo'],
                    $result['meta_box']['geo'],
                    "[$caseName] 'geo' in 'meta_box' should match original input"
                );
            }
        }
    }
}
