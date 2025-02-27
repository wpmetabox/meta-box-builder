<?php
use MetaBox\Support\Arr;
use PHPUnit\Framework\TestCase;
use MBB\Normalizer;

class UnparserTest extends TestCase {
	protected $json;

	protected function setUp(): void {
		$json       = file_get_contents( dirname( __DIR__ ) . '/examples/contact.json' );
		$this->json = json_decode( $json, true );
	}

	/**
	 * Test if the json has required fields
	 * 
	 * @group failing
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
	 * @group failing
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
	 * @group passed
	 * 
	 * All fields should have id, _id, name, and type
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
	 * @group failing
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
	 * @group failing
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
	 * @group failing
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
	 * Test group field property
	 * 
	 * @group failing
	 */
	public function testGroupField() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$group = $fields['group'];

		// Other test already handle required fields for 
		// generic fields so we only checks for group specific
		// fields
		$required_group_props = [ 
			'group_title',
			'fields',
		];

		foreach ( $required_group_props as $prop ) {
			$this->assertArrayHasKey( $prop, $group );
		}

		$this->assertIsArray( $group['fields'] );
		// Check if group fields is key value array
		$keys = array_keys( $group['fields'] );
		foreach ( $keys as $key ) {
			$this->assertIsString( $key );
		}

		// Check if all fields in group have required fields
		foreach ( $group['fields'] as $field ) {
			$field_keys = array_keys( $field );

			$required_fields = [ 
				'id',
				'_id',
				'name',
				'type',
				'save_field',
			];

			foreach ( $required_fields as $required_field ) {
				$this->assertContains( $required_field, $field_keys );
			}
		}
	}

	/**
	 * Test admin columns property
	 * 
	 * @group failing
	 */
	public function testAdminColumnProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$adminColumn = $fields['admin_column'];

		$this->assertIsArray( $adminColumn );
		$this->assertArrayHasKey( 'admin_columns', $adminColumn );

		// Has required fields
		$required_fields_and_type = [ 
			'enable' => 'bool',
			'position' => 'array',
			'position.type' => 'string',
			'position.column' => 'string',
			'title' => 'string',
			'before' => 'string',
			'after' => 'string',
			'sort' => 'bool',
			'searchable' => 'bool',
			'filterable' => 'bool',
			'link' => 'bool',
		];

		foreach ( $required_fields_and_type as $key => $type ) {
			$this->assertEquals( gettype( Arr::get( $adminColumn['admin_columns'], $key ) ), $type );
		}
	}

	public function testTooltipProperty() {
		$normalized = Normalizer::normalize( $this->json );
		$fields     = $normalized['fields'];

		$tooltipField = $fields['tooltip'];

		$this->assertArrayHasKey( 'tooltip', $tooltipField );
		$this->assertIsArray( $tooltipField['tooltip'] );

		$required_fields_and_type = [ 
			'enable' => 'bool',
			'icon' => 'string',
			'position' => 'string',
			'content' => 'string',
		];

		foreach ( $required_fields_and_type as $key => $type ) {
			$this->assertEquals( gettype( Arr::get( $tooltipField['tooltip'], $key ) ), $type );
		}
	}

}
