<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class FieldTest extends TestCase {
    public function testFieldsPropertyIsKeyValueArrayWithRequiredKeys() {
        // Sample new format JSON with multiple fields
        $newJson = json_decode('{
            "$schema": "https://schemas.metabox.io/field-group.json",
            "id": "test-meta-box",
            "title": "Test Meta Box",
            "fields": [
                {
                    "id": "field1",
                    "type": "text",
                    "name": "Text Field"
                },
                {
                    "id": "field2",
                    "type": "textarea",
                    "name": "Textarea Field"
                },
                {
                    "id": "field3",
                    "type": "checkbox",
                    "name": "Checkbox Field"
                }
            ],
            "modified": 1741272808
        }', true);

        $unparser = new MetaBox($newJson);
        $unparser->unparse();
        $result = $unparser->get_settings();

        // Check top-level fields exists and is an array
        $this->assertArrayHasKey('fields', $result, "Result should have 'fields' key");
        $this->assertIsArray($result['fields'], "'fields' should be an array");

        // Check that fields is a key-value array (not numeric)
        $this->assertArrayHasKey('field1', $result['fields'], "'fields' should use 'field1' as key");
        $this->assertArrayHasKey('field2', $result['fields'], "'fields' should use 'field2' as key");
        $this->assertArrayHasKey('field3', $result['fields'], "'fields' should use 'field3' as key");
        $this->assertFalse(
            array_key_exists(0, $result['fields']),
            "'fields' should not have numeric keys"
        );

        // Required keys as per your unparser and schema
        $requiredKeys = ['id', '_id', 'name', 'type', 'save_field'];

        // Check each field has required keys
        foreach ($result['fields'] as $fieldId => $field) {
            foreach ($requiredKeys as $key) {
                $this->assertArrayHasKey(
                    $key,
                    $field,
                    "Field '$fieldId' should have '$key' key"
                );
                $this->assertNotNull(
                    $field[$key],
                    "Field '$fieldId' key '$key' should not be null"
                );
            }

            // Specific value checks
            $this->assertEquals(
                $fieldId,
                $field['id'],
                "Field '$fieldId' 'id' should match its key"
            );
            $this->assertEquals(
                $fieldId,
                $field['_id'],
                "Field '$fieldId' '_id' should match its key"
            );
            $this->assertTrue(
                $field['save_field'],
                "Field '$fieldId' 'save_field' should default to true"
            );
            $this->assertIsString(
                $field['name'],
                "Field '$fieldId' 'name' should be a string"
            );
            $this->assertIsString(
                $field['type'],
                "Field '$fieldId' 'type' should be a string"
            );
        }
    }
}
