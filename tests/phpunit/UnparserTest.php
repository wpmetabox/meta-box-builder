<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Group;
use MBB\Normalizer;
use MBBParser\Unparsers\MetaBox;

class UnparserTest extends TestCase {
	protected $json;

	protected function setUp(): void {
		$json       = file_get_contents( dirname( __DIR__ ) . '/examples/contact.json' );
		$this->json = json_decode( $json, true );
	}

	protected function testShouldHaveEmptyData() {
		$unparser = new MetaBox( $this->json );
		$unparser->unparse();

		$this->assertArrayHasKey( 'data', $unparser->get_settings() );
		$this->assertEmpty( $unparser->get_settings()['data'] );
	}
	/**
	 * Test if the json has required fields
	 * 
	 * #[Group('failing')]
	 */
	public function testShouldHaveRequiredFields() {
		$json = Normalizer::normalize( $this->json );

		$required_fields = [ 
			'$schema' => 'string',
			'fields' => 'array',
			'id' => 'string',
			'title' => 'string',
			'version' => 'string',
			'post_title' => 'string',
			'post_name' => 'string',
			'post_date' => 'string',
			'post_status' => 'string',
			'post_content' => 'string',
			'meta_box' => 'array',
			'settings' => 'array',
			'data' => 'array',
		];

		foreach ( $required_fields as $field => $type ) {
			$this->assertEquals( gettype( Arr::get( $json, $field ) ), $type, 'Field ' . $field . ' is not found' );
		}

		$this->assertArrayHasKey( 'post_type', $json );
	}

	/**
	 * #[Group('failing')]
	 */
	public function testFieldsShouldBeKeyValuesArray() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$keys = array_keys( $fields );

		foreach ( $keys as $key ) {
			$this->assertIsString( $key );
		}
	}

	/**
	 * 
	 * All fields should have id, _id, name, and type
	 * 
	 * @return void
	 */
	public function testFieldShouldHaveRequiredFields() {
		$normalized = Normalizer::normalize( $this->json );

		$required_fields = [ 
			'id',
			'_id',
			'name',
			'type',
			'save_field',
		];

		foreach ( $normalized['fields'] as $field ) {
			$field_keys = array_keys( $field );

			foreach ( $required_fields as $required_field ) {
				$this->assertContains( $required_field, $field_keys );
			}
		}
	}

	/**
	 * Option property should be a multilines string 
	 * so its render properly for the builder
	 * 
	 */
	public function testOptionProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$selectField = $fields['gender'];

		$this->assertArrayHasKey( 'options', $selectField );
		$this->assertIsString( $selectField['options'] );
	}

	/**
	 * Option property should be a multilines string 
	 * so its render properly for the builder
	 * 
	 * #[Group('failing')]
	 */
	public function testAttributesProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$phoneField = $fields['phone'];

		$this->assertArrayHasKey( 'attributes', $phoneField );
		$this->assertIsArray( $phoneField['attributes'] );

		// Check if its key value array with key is string and value is 
		// array of id, key, and value
		$keys = array_keys( $phoneField['attributes'] );
		foreach ( $keys as $key ) {
			$this->assertIsString( $key );

			$attribute = $phoneField['attributes'][ $key ];
			$this->assertArrayHasKey( 'id', $attribute );
			$this->assertArrayHasKey( 'key', $attribute );
			$this->assertArrayHasKey( 'value', $attribute );
		}
	}

	/**
	 * Test conditional logic property
	 * 
	 * #[Group('failing')]
	 */
	public function testConditionalLogicProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$phoneField = $fields['phone'];

		$this->assertIsArray( $phoneField['conditional_logic'] );
		$this->assertArrayHasKey( 'type', $phoneField['conditional_logic'] );
		$this->assertArrayHasKey( 'relation', $phoneField['conditional_logic'] );
		$this->assertArrayHasKey( 'when', $phoneField['conditional_logic'] );

		$when = $phoneField['conditional_logic']['when'];
		$this->assertIsArray( $when );
		$criteria = array_keys( $when );

		foreach ( $criteria as $criterion ) {
			$this->assertIsString( $criterion );
			$this->assertIsArray( $when[ $criterion ] );
			$this->assertArrayHasKey( 'id', $when[ $criterion ] );
			$this->assertArrayHasKey( 'value', $when[ $criterion ] );
			$this->assertArrayHasKey( 'operator', $when[ $criterion ] );
			$this->assertArrayHasKey( 'name', $when[ $criterion ] );
		}
	}

	/**
	 * Test admin columns property
	 * 
	 * #[Group('failing')]
	 */
	public function testAdminColumnProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];
		$adminColumn = $fields['admin_column'];
		$this->assertIsArray( $adminColumn );
		$this->assertArrayHasKey( 'admin_columns', $adminColumn );
	}

	public function testTooltipProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];
		$tooltipField = $fields['tooltip'];

		$this->assertArrayHasKey( 'tooltip', $tooltipField );
		$this->assertIsArray( $tooltipField['tooltip'] );
		$this->assertArrayHasKey( 'content', $tooltipField['tooltip'] );
		$this->assertArrayHasKey( 'enable', $tooltipField['tooltip'] );
	}
}
