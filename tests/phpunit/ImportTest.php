<?php
use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertFalse;

class ImportTest extends TestCase {
    protected $json;

	protected function setUp(): void {
		$json       = file_get_contents( dirname( __DIR__ ) . '/contact.json' );
		$this->json = json_decode( $json, true );
	}

    public function testImportDataShouldHaveRequiredFields() {
        $required_fields = [
            'id',
            'title',
            'fields',
        ];

        $keys = array_keys( $this->json );

        foreach ( $required_fields as $field ) {
            $this->assertContains( $field, $keys );
        }
    }

    public function testImportDataShouldNotHaveRedundantFields() {
        $redundant_fields = [
            'meta_box',
            'settings',
        ];

        $keys = array_keys( $this->json );

        foreach ( $redundant_fields as $field ) {
            $this->assertNotContains( $field, $keys );
        }
    }

    /**
     * All fields should have id and type
     * @return void
     */
    public function testImportFieldsFormat() {
        $fields = $this->json['fields'];

        foreach ( $fields as $field ) {
            $this->assertArrayHasKey( 'id', $field );
            $this->assertArrayHasKey( 'type', $field );
        }
    }
}
