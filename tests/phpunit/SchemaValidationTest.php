<?php
use Opis\JsonSchema\Validator;
use PHPUnit\Framework\TestCase;

class SchemaValidationTest extends TestCase {
	private function schema_dir(): ?string {
		$candidates = array_filter( [
			getenv( 'MBB_SCHEMA_DIR' ) ?: null,
			dirname( __DIR__, 6 ) . '/schema',
		] );

		foreach ( $candidates as $dir ) {
			if ( is_dir( $dir ) && file_exists( $dir . '/field-group.json' ) ) {
				return $dir;
			}
		}

		return null;
	}

	private function validate_file( string $schema_file, string $data_file ): void {
		$schema_dir = $this->schema_dir();
		if ( ! $schema_dir ) {
			$this->markTestSkipped( 'Schema directory not found. Set MBB_SCHEMA_DIR to run this test.' );
		}

		$schema = json_decode( file_get_contents( $schema_dir . '/' . $schema_file ) );
		$data   = json_decode( file_get_contents( $data_file ) );

		$validator = new Validator();
		$result    = $validator->validate( $data, $schema );

		$this->assertTrue(
			$result->isValid(),
			$result->isValid() ? '' : (string) json_encode( $result->error(), JSON_PRETTY_PRINT )
		);
	}

	public function testModelFieldExampleMatchesFieldGroupSchema(): void {
		$this->validate_file( 'field-group.json', __DIR__ . '/../examples/model.json' );
	}

	public function testRelationshipModelExampleMatchesRelationshipsSchema(): void {
		$this->validate_file( 'relationships.json', __DIR__ . '/../examples/relationship-model.json' );
	}
}
