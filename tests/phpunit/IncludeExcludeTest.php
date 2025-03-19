<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class IncludeExcludeTest extends TestCase {
    public function testIncludeExcludeNormalization() {
        $testCases = [
            'include_new' => [
                'input' => [
                    'include' => [
                        'post_type' => 'post',
                        'taxonomy' => 'category',
                        'template' => 'single.php'
                    ]
                ],
                'is_new_format' => true,
                'expected' => [
                    'type' => 'include',
                    'relation' => 'OR',
                    'rules' => [
                        'post_type' => [
                            'id' => 'post_type',
                            'name' => 'post_type',
                            'value' => 'post'
                        ],
                        'taxonomy' => [
                            'id' => 'taxonomy',
                            'name' => 'taxonomy',
                            'value' => 'category'
                        ],
                        'template' => [
                            'id' => 'template',
                            'name' => 'template',
                            'value' => 'single.php'
                        ]
                    ]
                ]
            ],
            'exclude_old' => [
                'input' => [
                    'meta_box' => [
                        'exclude' => [
                            'post_type' => 'page',
                            'taxonomy' => 'tag',
                            'template' => 'archive.php'
                        ]
                    ]
                ],
                'is_new_format' => false,
                'expected' => [
                    'type' => 'exclude',
                    'relation' => 'OR',
                    'rules' => [
                        'post_type' => [
                            'id' => 'post_type',
                            'name' => 'post_type',
                            'value' => 'page'
                        ],
                        'taxonomy' => [
                            'id' => 'taxonomy',
                            'name' => 'taxonomy',
                            'value' => 'tag'
                        ],
                        'template' => [
                            'id' => 'template',
                            'name' => 'template',
                            'value' => 'archive.php'
                        ]
                    ]
                ]
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

            // Check settings.include_exclude
            $this->assertArrayHasKey('settings', $result, "[$caseName] Result should have 'settings' key");
            $this->assertArrayHasKey('include_exclude', $result['settings'], "[$caseName] 'settings' should have 'include_exclude'");
            $ie = $result['settings']['include_exclude'];
            $this->assertIsArray($ie, "[$caseName] 'include_exclude' should be an array");

            $this->assertEquals(
                $case['expected']['type'],
                $ie['type'],
                "[$caseName] 'type' should match expected"
            );
            $this->assertEquals(
                $case['expected']['relation'],
                $ie['relation'],
                "[$caseName] 'relation' should match expected"
            );
            $this->assertArrayHasKey('rules', $ie, "[$caseName] 'include_exclude' should have 'rules'");
            $this->assertIsArray($ie['rules'], "[$caseName] 'rules' should be an array");
            $this->assertEquals(
                $case['expected']['rules'],
                $ie['rules'],
                "[$caseName] 'rules' should match expected"
            );

            // Check original location
            $keyword = $case['expected']['type'];
            if ($case['is_new_format']) {
                $this->assertArrayHasKey($keyword, $result, "[$caseName] New format should retain '$keyword' at root");
                $this->assertEquals(
                    $case['input'][$keyword],
                    $result[$keyword],
                    "[$caseName] '$keyword' at root should match original input"
                );
            } else {
                $this->assertArrayHasKey('meta_box', $result, "[$caseName] Result should have 'meta_box'");
                $this->assertArrayHasKey($keyword, $result['meta_box'], "[$caseName] Old format should retain '$keyword' in 'meta_box'");
                $this->assertEquals(
                    $case['input']['meta_box'][$keyword],
                    $result['meta_box'][$keyword],
                    "[$caseName] '$keyword' in 'meta_box' should match original input"
                );
            }
        }
    }
}
