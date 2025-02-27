<?php
use PHPUnit\Framework\TestCase;
use Opis\JsonSchema\{
    Validator,
    ValidationResult,
    Errors\ErrorFormatter,
};

class SchemaTest extends TestCase {
	protected $json;

	protected function setUp(): void {
		$json       = file_get_contents( dirname( __DIR__ ) . '/examples/contact.json' );
		$this->json = json_decode( $json );
	}

	public function testIsValidSchema() {
		// Create a new validator
		$validator = new Validator();
		// Register our schema
		$validator->resolver()->registerFile(
			'https://schemas.metabox.io/field-group.json', 
			dirname( __DIR__ ) . '/contact.json'
		);

		/** @var ValidationResult $result */
		$result = $validator->validate($this->json, 'https://schemas.metabox.io/field-group.json');

		// Check if the schema is valid
		$this->assertTrue($result->isValid(), 'Schema is not valid');
	}
}
