<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class ConditionalLogicTest extends TestCase {
    protected function setUp(): void {
        if (!class_exists('MB_Conditional_Logic')) {
            eval('class MB_Conditional_Logic {
                public function parse_conditions($settings) {
                    $output = [];
                    foreach (["visible", "hidden"] as $key) {
                        if (!empty($settings[$key])) {
                            $conditions = $this->normalize_conditions($settings[$key]);
                            $output[$key] = [
                                "relation" => $conditions["relation"] ?? "and",
                                "when" => $conditions["when"]
                            ];
                        }
                    }
                    return $output;
                }
                private function normalize_conditions($condition) {
                    if (!is_array($condition)) {
                        return ["when" => [], "relation" => "and"];
                    }
                    if (isset($condition["when"])) {
                        return [
                            "when" => array_map([$this, "normalize_single_condition"], $condition["when"]),
                            "relation" => $condition["relation"] ?? "and"
                        ];
                    }
                    if (isset($condition[0]) && !isset($condition[0][0])) {
                        return ["when" => [$this->normalize_single_condition($condition)]];
                    }
                    return ["when" => array_map([$this, "normalize_single_condition"], $condition)];
                }
                private function normalize_single_condition($cond) {
                    if (!isset($cond[1])) {
                        return [$cond[0], "=", $cond[1]];
                    }
                    return [$cond[0], $cond[1], $cond[2] ?? null];
                }
            }');
        }
    }

    public function testConditionalLogicNormalization() {
        $testCases = [
            'dead_simple' => [
                'input' => ['visible' => ['checkbox', true]],
                'expected' => [
                    'type' => 'visible',
                    'relation' => 'and',
                    'when' => [
                        'checkbox' => [
                            'id' => 'checkbox',
                            'name' => 'checkbox',
                            'operator' => '=',
                            'value' => true
                        ]
                    ]
                ]
            ],
            'simple' => [
                'input' => ['hidden' => ['checkbox', '=', false]],
                'expected' => [
                    'type' => 'hidden',
                    'relation' => 'and',
                    'when' => [
                        'checkbox' => [
                            'id' => 'checkbox',
                            'name' => 'checkbox',
                            'operator' => '=',
                            'value' => false
                        ]
                    ]
                ]
            ],
            'multiple_conditions' => [
                'input' => [
                    'visible' => [
                        ['checkbox', true],
                        ['select', 'in', ['foo', 'bar']]
                    ]
                ],
                'expected' => [
                    'type' => 'visible',
                    'relation' => 'and',
                    'when' => [
                        'checkbox' => [
                            'id' => 'checkbox',
                            'name' => 'checkbox',
                            'operator' => '=',
                            'value' => true
                        ],
                        'select' => [
                            'id' => 'select',
                            'name' => 'select',
                            'operator' => 'in',
                            'value' => ['foo', 'bar']
                        ]
                    ]
                ]
            ],
            'with_relation' => [
                'input' => [
                    'visible' => [
                        'when' => [
                            ['brand', 'Apple'],
                            ['released_year', 'between', [2010, 2015]]
                        ],
                        'relation' => 'or'
                    ]
                ],
                'expected' => [
                    'type' => 'visible',
                    'relation' => 'or',
                    'when' => [
                        'brand' => [
                            'id' => 'brand',
                            'name' => 'brand',
                            'operator' => '=',
                            'value' => 'Apple'
                        ],
                        'released_year' => [
                            'id' => 'released_year',
                            'name' => 'released_year',
                            'operator' => 'between',
                            'value' => [2010, 2015]
                        ]
                    ]
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

            // Check conditional_logic
            $this->assertArrayHasKey('conditional_logic', $field, "[$caseName] Field should have 'conditional_logic'");
            $cl = $field['conditional_logic'];

            $this->assertEquals(
                $case['expected']['type'],
                $cl['type'],
                "[$caseName] 'conditional_logic.type' should match expected type"
            );
            $this->assertEquals(
                $case['expected']['relation'],
                $cl['relation'],
                "[$caseName] 'conditional_logic.relation' should match expected relation"
            );
            $this->assertArrayHasKey('when', $cl, "[$caseName] 'conditional_logic' should have 'when'");
            $this->assertIsArray($cl['when'], "[$caseName] 'when' should be an array");
            $this->assertFalse(
                array_key_exists(0, $cl['when']),
                "[$caseName] 'when' should not have numeric keys"
            );
            $this->assertCount(
                count($case['expected']['when']),
                $cl['when'],
                "[$caseName] 'when' should have the correct number of conditions"
            );

            // Check each condition
            foreach ($case['expected']['when'] as $key => $expectedCondition) {
                $this->assertArrayHasKey($key, $cl['when'], "[$caseName] 'when' should have key '$key'");
                $condition = $cl['when'][$key];

                $this->assertIsArray($condition, "[$caseName] Condition for '$key' should be an array");
                $this->assertEquals(
                    $expectedCondition['id'],
                    $condition['id'],
                    "[$caseName] 'id' for '$key' should match expected"
                );
                $this->assertEquals(
                    $expectedCondition['name'],
                    $condition['name'],
                    "[$caseName] 'name' for '$key' should match expected"
                );
                $this->assertEquals(
                    $expectedCondition['operator'],
                    $condition['operator'],
                    "[$caseName] 'operator' for '$key' should match expected"
                );
                $this->assertEquals(
                    $expectedCondition['value'],
                    $condition['value'],
                    "[$caseName] 'value' for '$key' should match expected"
                );
            }

            // Check meta_box.fields retains original
            $metaField = $result['meta_box']['fields'][0];
            $key = $case['expected']['type'];
            $this->assertArrayHasKey($key, $metaField, "[$caseName] 'meta_box.fields' should retain '$key'");
            $this->assertEquals(
                $case['input'][$key],
                $metaField[$key],
                "[$caseName] '$key' in 'meta_box.fields' should match original input"
            );
            $this->assertArrayNotHasKey('conditional_logic', $metaField, "[$caseName] 'meta_box.fields' should not have 'conditional_logic'");
        }
    }
}