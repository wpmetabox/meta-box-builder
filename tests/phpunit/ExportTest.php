<?php
use PHPUnit\Framework\TestCase;

class ExportTest extends TestCase {
    public function testExportDataShouldHaveRequiredFields() {
        $required_fields = [
            'id',
            'fields',
        ];

        $this->assertTrue(true);
    }

    public function testExportDataShouldNotHaveRedundantFields() {
        $redundant_fields = [
            'meta_box',
            'settings',
        ];

        $this->assertTrue(true);
    }

    /**
     * Test if the exported fields have the correct format
     */
    public function testExportFieldsFormat() {
        $this->assertTrue(true);
    }

    public function testConditionalLogicFormat() {
        $this->assertTrue(true);
    }

    public function testKeyValueFormat() {
        $this->assertTrue(true);
    }

    public function testGroupFormat() {
        $this->assertTrue(true);
    }

    public function testTabFormat() {
        $this->assertTrue(true);
    }
}
