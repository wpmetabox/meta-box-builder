<?php

use MBBParser\Unparsers\MetaBox;
use PHPUnit\Framework\TestCase;

class AttributeTest extends TestCase {
    public function testOptionPropertyForSelectField() {
        // Sample new format JSON with a select field
        $newJson = json_decode('{
            "$schema": "https://schemas.metabox.io/field-group.json",
            "id": "test-select-box",
            "title": "Test Select Box",
            "fields": [
                {
                    "id": "color_select",
                    "type": "select",
                    "name": "Color Select",
                    "options": {
                        "red": "Red",
                        "blue": "Blue",
                        "green": "Green"
                    }
                }
            ],
            "modified": 1741272808
        }', true);

        $unparser = new MetaBox($newJson);
        $unparser->unparse();
        $result = $unparser->get_settings();

        // Check top-level fields
        $this->assertArrayHasKey('fields', $result, "Result should have 'fields' key");
        $this->assertIsArray($result['fields'], "'fields' should be an array");
        $this->assertArrayHasKey('color_select', $result['fields'], "'fields' should use 'color_select' as key");

        // Check fields.options (multiline string)
        $selectField = $result['fields']['color_select'];
        $this->assertEquals('select', $selectField['type'], "Field type should be 'select'");
        $this->assertArrayHasKey('options', $selectField, "Select field should have 'options'");
        $this->assertIsString($selectField['options'], "'options' in 'fields' should be a string");

        $expectedOptionsString = "red:Red\r\nblue:Blue\r\ngreen:Green";
        $this->assertEquals(
            $expectedOptionsString,
            $selectField['options'],
            "'options' should be a multiline string with KEY:VALUE pairs"
        );

        // Check meta_box.fields
        $this->assertArrayHasKey('meta_box', $result, "Result should have 'meta_box'");
        $this->assertArrayHasKey('fields', $result['meta_box'], "'meta_box' should have 'fields'");
        $this->assertIsArray($result['meta_box']['fields'], "'meta_box.fields' should be an array");
        $this->assertTrue(
            array_key_exists(0, $result['meta_box']['fields']),
            "'meta_box.fields' should have numeric keys"
        );

        // Check meta_box.fields options (array)
        $metaBoxSelectField = $result['meta_box']['fields'][0];
        $this->assertEquals('select', $metaBoxSelectField['type'], "Meta box field type should be 'select'");
        $this->assertArrayHasKey('options', $metaBoxSelectField, "Meta box select field should have 'options'");
        $this->assertIsArray($metaBoxSelectField['options'], "'options' in 'meta_box.fields' should be an array");

        $expectedOptionsArray = [
            'red' => 'Red',
            'blue' => 'Blue',
            'green' => 'Green'
        ];
        $this->assertEquals(
            $expectedOptionsArray,
            $metaBoxSelectField['options'],
            "'options' in 'meta_box.fields' should match the original key-value array"
        );
    }

    public function testAttributesPropertyForTextField() {
        // Sample new format JSON with a text field and attributes
        $newJson = json_decode('{
            "$schema": "https://schemas.metabox.io/field-group.json",
            "id": "test-text-box",
            "title": "Test Text Box",
            "fields": [
                {
                    "id": "phone_number",
                    "type": "text",
                    "name": "Phone Number",
                    "attributes": {
                        "type": "tel",
                        "pattern": "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                        "data-test": "phone"
                    }
                }
            ],
            "modified": 1741272808
        }', true);

        $unparser = new MetaBox($newJson);
        $unparser->unparse();
        $result = $unparser->get_settings();

        // Check top-level fields
        $this->assertArrayHasKey('fields', $result, "Result should have 'fields' key");
        $this->assertIsArray($result['fields'], "'fields' should be an array");
        $this->assertArrayHasKey('phone_number', $result['fields'], "'fields' should use 'phone_number' as key");

        // Check fields.attributes (UUID-keyed array of objects)
        $textField = $result['fields']['phone_number'];
        $this->assertEquals('text', $textField['type'], "Field type should be 'text'");
        $this->assertArrayHasKey('attributes', $textField, "Text field should have 'attributes'");
        $this->assertIsArray($textField['attributes'], "'attributes' in 'fields' should be an array");
        $this->assertFalse(
            array_key_exists(0, $textField['attributes']),
            "'attributes' in 'fields' should not have numeric keys"
        );

        // Check attributes structure and values
        $originalAttributes = [
            'type' => 'tel',
            'pattern' => '[0-9]{3}-[0-9]{3}-[0-9]{4}',
            'data-test' => 'phone'
        ];
        $this->assertCount(
            count($originalAttributes),
            $textField['attributes'],
            "'attributes' should have the same number of entries as the original"
        );

        foreach ($textField['attributes'] as $uuid => $attr) {
            $this->assertIsString($uuid, "Attribute key should be a string (UUID)");
            $this->assertArrayHasKey('id', $attr, "Attribute should have 'id'");
            $this->assertArrayHasKey('key', $attr, "Attribute should have 'key'");
            $this->assertArrayHasKey('value', $attr, "Attribute should have 'value'");
            $this->assertEquals($uuid, $attr['id'], "'id' should match the UUID key");
            $this->assertArrayHasKey($attr['key'], $originalAttributes, "Attribute 'key' should exist in original");
            $this->assertEquals(
                $originalAttributes[$attr['key']],
                $attr['value'],
                "Attribute 'value' should match original value for key '{$attr['key']}'"
            );
        }

        // Check meta_box.fields
        $this->assertArrayHasKey('meta_box', $result, "Result should have 'meta_box'");
        $this->assertArrayHasKey('fields', $result['meta_box'], "'meta_box' should have 'fields'");
        $this->assertIsArray($result['meta_box']['fields'], "'meta_box.fields' should be an array");
        $this->assertTrue(
            array_key_exists(0, $result['meta_box']['fields']),
            "'meta_box.fields' should have numeric keys"
        );

        // Check meta_box.fields attributes (simple key-value array)
        $metaBoxTextField = $result['meta_box']['fields'][0];
        $this->assertEquals('text', $metaBoxTextField['type'], "Meta box field type should be 'text'");
        $this->assertArrayHasKey('attributes', $metaBoxTextField, "Meta box text field should have 'attributes'");
        $this->assertIsArray($metaBoxTextField['attributes'], "'attributes' in 'meta_box.fields' should be an array");
        $this->assertEquals(
            $originalAttributes,
            $metaBoxTextField['attributes'],
            "'attributes' in 'meta_box.fields' should match the original key-value array"
        );
    }
}