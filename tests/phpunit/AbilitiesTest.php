<?php

use MBB\Abilities;
use MBB\Helpers\FieldKeys;
use MBB\Registry;
use MBB\RestApi\Fields;

class AbilitiesTest extends WP_UnitTestCase {
	private Abilities $abilities;
	private int $post_id;

	public function set_up(): void {
		parent::set_up();
		if ( empty( FieldKeys::all() ) ) {
			FieldKeys::init( new Fields( new Registry() ) );
		}

		$this->abilities = new Abilities();
		$this->post_id   = wp_insert_post( [
			'post_type'   => 'meta-box',
			'post_title'  => 'Test Field Group',
			'post_name'   => 'test-field-group-' . uniqid(),
			'post_status' => 'publish',
		] );
	}

	public function tear_down(): void {
		parent::tear_down();
		wp_delete_post( $this->post_id, true );
	}

	public function test_update_field_with_string_keys() {
		$this->set_fields( [
			'field_a' => $this->field( 'a', 'A' ),
			'field_b' => $this->field( 'b', 'B' ),
		] );

		$result = $this->abilities->update_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'b',
			'field'          => [
				'id'   => 'b',
				'type' => 'text',
				'name' => 'B updated',
			],
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 0, 1 ], array_keys( $fields ) );
		$this->assertSame( 'A', $fields[0]['name'] );
		$this->assertSame( 'B updated', $fields[1]['name'] );
	}

	public function test_update_field_at_numeric_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->update_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'a',
			'field'          => [
				'id'   => 'a',
				'type' => 'text',
				'name' => 'A updated',
			],
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( 'A updated', $fields[0]['name'] );
		$this->assertSame( 'B', $fields[1]['name'] );
	}

	public function test_update_field_renames_field_at_numeric_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->update_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'a',
			'field'          => [
				'id'   => 'new_a',
				'type' => 'text',
				'name' => 'A renamed',
			],
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'new_a', 'b' ], array_column( $fields, 'id' ) );
		$this->assertSame( 'A renamed', $fields[0]['name'] );
	}

	public function test_update_field_rejects_rename_to_field_at_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->update_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'b',
			'field'          => [
				'id'   => 'a',
				'type' => 'text',
				'name' => 'Duplicate',
			],
		] );

		$this->assertFalse( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'a', 'b' ], array_column( $fields, 'id' ) );
	}

	public function test_delete_field_with_string_keys() {
		$this->set_fields( [
			'field_a' => $this->field( 'a', 'A' ),
			'field_b' => $this->field( 'b', 'B' ),
			'field_c' => $this->field( 'c', 'C' ),
		] );

		$result = $this->abilities->delete_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'b',
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'a', 'c' ], array_column( $fields, 'id' ) );
		$this->assertSame( [ 0, 1 ], array_keys( $fields ) );
	}

	public function test_delete_field_at_numeric_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->delete_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'a',
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'b' ], array_column( $fields, 'id' ) );
	}

	public function test_move_field_with_string_keys() {
		$this->set_fields( [
			'field_a' => $this->field( 'a', 'A' ),
			'field_b' => $this->field( 'b', 'B' ),
			'field_c' => $this->field( 'c', 'C' ),
		] );

		$result = $this->abilities->move_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'c',
			'before'         => 'a',
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'c', 'a', 'b' ], array_column( $fields, 'id' ) );
	}

	public function test_move_field_at_numeric_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->move_field( [
			'field_group_id' => $this->post_id,
			'field_id'       => 'a',
			'after'          => 'b',
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'b', 'a' ], array_column( $fields, 'id' ) );
	}

	public function test_create_field_detects_duplicate_at_numeric_index_zero() {
		$this->set_fields( [ $this->field( 'a', 'A' ), $this->field( 'b', 'B' ) ] );

		$result = $this->abilities->create_field( [
			'field_group_id' => $this->post_id,
			'field'          => [
				'id'   => 'a',
				'type' => 'text',
				'name' => 'Duplicate',
			],
		] );

		$this->assertFalse( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 'a', 'b' ], array_column( $fields, 'id' ) );
	}

	public function test_update_field_group_without_fields_keeps_string_keyed_fields() {
		$this->set_fields( [
			'field_a' => $this->field( 'a', 'A' ),
			'field_b' => $this->field( 'b', 'B' ),
		] );

		$result = $this->abilities->update_field_group( [
			'id'    => $this->post_id,
			'title' => 'Renamed Field Group',
		] );

		$this->assertTrue( $result['success'] );

		$fields = $this->get_fields();
		$this->assertSame( [ 0, 1 ], array_keys( $fields ) );
		$this->assertSame( [ 'a', 'b' ], array_column( $fields, 'id' ) );
	}

	private function set_fields( array $fields ): void {
		update_post_meta( $this->post_id, 'fields', $fields );
		update_post_meta( $this->post_id, 'settings', [] );
	}

	private function get_fields(): array {
		return get_post_meta( $this->post_id, 'fields', true );
	}

	private function field( string $id, string $name ): array {
		return [
			'id'   => $id,
			'type' => 'text',
			'name' => $name,
			'_id'  => 'field_' . $id,
		];
	}
}
