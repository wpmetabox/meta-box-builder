<?php

use MBB\Duplicate;
use MBB\JsonService;
use MBB\RestApi\Save;

class DuplicateTest extends WP_UnitTestCase {
	/** @var Duplicate */
	private $duplicator;

	/** @var int[] */
	private $post_ids = [];

	public function set_up(): void {
		parent::set_up();
		$this->duplicator = new Duplicate();
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'administrator' ] ) );
	}

	public function tear_down(): void {
		foreach ( $this->post_ids as $post_id ) {
			wp_delete_post( $post_id, true );
		}
		parent::tear_down();
	}

	public function test_duplicate_field_group_keeps_field_ids(): void {
		$fields = [
			[
				'id'     => 'group_field',
				'type'   => 'group',
				'name'   => 'Group',
				'clone'  => true,
				'fields' => [
					[
						'id'    => 'nested_text',
						'type'  => 'text',
						'name'  => 'Text',
						'clone' => true,
					],
				],
			],
		];
		$meta    = [
			'settings' => [ 'id' => 'group-test' ],
			'fields'   => $fields,
			'meta_box' => [
				'id'     => 'group-test',
				'title'  => 'Group Test',
				'fields' => $fields,
			],
		];
		$post_id = $this->create_post( 'meta-box', 'group-test', 'Group Test', $meta );
		$copy_id = $this->copy( $post_id );

		$copy = get_post( $copy_id );
		$this->assertSame( 'draft', $copy->post_status );
		$this->assertSame( 'Group Test (Copy)', $copy->post_title );
		$this->assertSame( 'group-test_copy', $copy->post_name );
		$this->assertSame( 'group-test_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
		$this->assertSame( 'group-test_copy', get_post_meta( $copy_id, 'meta_box', true )['id'] );
		$this->assertSame( 'Group Test (Copy)', get_post_meta( $copy_id, 'meta_box', true )['title'] );
		$this->assertSame( $fields, get_post_meta( $copy_id, 'fields', true ) );
		$this->assertSame( $fields, get_post_meta( $copy_id, 'meta_box', true )['fields'] );
		$this->assert_original( $post_id, 'group-test', 'Group Test', $meta );

		$second_id = $this->copy( $post_id );
		$this->assertSame( 'group-test_copy_2', get_post( $second_id )->post_name );
		$this->assertSame( $fields, get_post_meta( $second_id, 'fields', true ) );
		$this->assert_original( $post_id, 'group-test', 'Group Test', $meta );
	}

	public function test_duplicate_settings_page(): void {
		$meta    = [
			'settings'      => [
				'id'          => 'theme-options',
				'menu_title'  => 'Theme Options',
				'option_name' => 'theme-options',
			],
			'settings_page' => [
				'id'          => 'theme-options',
				'menu_title'  => 'Theme Options',
				'option_name' => 'theme-options',
			],
		];
		$post_id = $this->create_post( 'mb-settings-page', 'theme-options', 'Theme Options', $meta );
		$copy_id = $this->copy( $post_id );

		$settings = get_post_meta( $copy_id, 'settings', true );
		$page     = get_post_meta( $copy_id, 'settings_page', true );
		$this->assertSame( 'theme-options_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'draft', get_post( $copy_id )->post_status );
		$this->assertSame( 'theme-options_copy', $settings['id'] );
		$this->assertSame( 'Theme Options', $settings['menu_title'] );
		$this->assertSame( 'theme-options_copy', $settings['option_name'] );
		$this->assertSame( 'theme-options_copy', $page['id'] );
		$this->assertSame( 'Theme Options', $page['menu_title'] );
		$this->assertSame( 'theme-options_copy', $page['option_name'] );
		$this->assert_original( $post_id, 'theme-options', 'Theme Options', $meta );

		$custom = $meta;
		foreach ( [ 'settings', 'settings_page' ] as $key ) {
			$custom[ $key ]['id']          = 'theme-custom';
			$custom[ $key ]['option_name'] = 'site-options';
		}
		$custom_copy = $this->copy( $this->create_post( 'mb-settings-page', 'theme-custom', 'Theme Options', $custom ) );
		$this->assertSame( 'theme-custom_copy', get_post_meta( $custom_copy, 'settings', true )['option_name'] );
		$this->assertSame( 'theme-custom_copy', get_post_meta( $custom_copy, 'settings_page', true )['option_name'] );

		$renamed = $meta;
		foreach ( [ 'settings', 'settings_page' ] as $key ) {
			$renamed[ $key ]['id']          = 'theme-options-new';
			$renamed[ $key ]['option_name'] = 'theme-options';
		}
		$renamed_copy = $this->copy( $this->create_post( 'mb-settings-page', 'theme-options-new', 'Theme Options', $renamed ) );
		$this->assertSame( 'theme-options-new_copy', get_post_meta( $renamed_copy, 'settings', true )['option_name'] );
		$this->assertSame( 'theme-options-new_copy', get_post_meta( $renamed_copy, 'settings_page', true )['option_name'] );
	}

	public function test_duplicate_relationship(): void {
		$meta    = [
			'settings'     => [ 'id' => 'posts-to-pages' ],
			'relationship' => [
				'id'   => 'posts-to-pages',
				'from' => 'post',
				'to'   => 'page',
			],
		];
		$post_id = $this->create_post( 'mb-relationship', 'posts-to-pages', 'Posts to Pages', $meta );
		$copy_id = $this->copy( $post_id );

		$relationship = get_post_meta( $copy_id, 'relationship', true );
		$this->assertSame( 'posts-to-pages_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'posts-to-pages_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
		$this->assertSame( 'posts-to-pages_copy', $relationship['id'] );
		$this->assertSame( 'post', $relationship['from'] );
		$this->assertSame( 'page', $relationship['to'] );
		$this->assert_original( $post_id, 'posts-to-pages', 'Posts to Pages', $meta );
	}

	public function test_duplicate_model_gets_its_own_table(): void {
		$meta    = [
			'settings' => [
				'slug'   => 'book',
				'table'  => 'books',
				'labels' => [ 'name' => 'Books' ],
			],
			'model'    => [
				'id'    => 'book',
				'name'  => 'book',
				'table' => 'books',
			],
		];
		$post_id = $this->create_post( 'mb-model', 'book', 'Books', $meta );
		$copy_id = $this->copy( $post_id );

		$settings = get_post_meta( $copy_id, 'settings', true );
		$model    = get_post_meta( $copy_id, 'model', true );
		$this->assertSame( 'book_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'book_copy', $settings['slug'] );
		$this->assertSame( 'book_copy', $settings['table'] );
		$this->assertSame( 'Books', $settings['labels']['name'] );
		$this->assertSame( 'book_copy', $model['id'] );
		$this->assertSame( 'book_copy', $model['name'] );
		$this->assertSame( 'book_copy', $model['table'] );
		$this->assert_original( $post_id, 'book', 'Books', $meta );
	}

	public function test_duplicate_model_skips_a_table_another_model_uses(): void {
		$meta    = [
			'settings' => [
				'slug'  => 'book',
				'table' => 'book_copy',
			],
			'model'    => [
				'id'    => 'book',
				'name'  => 'book',
				'table' => 'book_copy',
			],
		];
		$post_id = $this->create_post( 'mb-model', 'book', 'Books', $meta );
		$copy_id = $this->copy( $post_id );

		$this->assertSame( 'book_copy_2', get_post_meta( $copy_id, 'settings', true )['table'] );
		$this->assertSame( 'book_copy_2', get_post_meta( $copy_id, 'model', true )['table'] );
		$this->assertSame( 'book_copy', get_post_meta( $post_id, 'model', true )['table'] );
	}

	public function test_duplicate_model_skips_an_existing_database_table(): void {
		global $wpdb;

		// The test suite turns CREATE TABLE into a temporary table, which SHOW TABLES does not list.
		remove_filter( 'query', [ $this, '_create_temporary_tables' ] );
		remove_filter( 'query', [ $this, '_drop_temporary_tables' ] );
		$wpdb->query( 'DROP TABLE IF EXISTS book_copy' );
		$wpdb->query( 'CREATE TABLE book_copy (id bigint unsigned NOT NULL)' );

		try {
			$post_id = $this->create_post( 'mb-model', 'book', 'Books', [
				'settings' => [
					'slug'  => 'book',
					'table' => 'books',
				],
				'model'    => [
					'id'    => 'book',
					'name'  => 'book',
					'table' => 'books',
				],
			] );
			$copy_id = $this->copy( $post_id );

			$this->assertSame( 'book_copy', get_post( $copy_id )->post_name );
			$this->assertSame( 'book_copy_2', get_post_meta( $copy_id, 'settings', true )['table'] );
			$this->assertSame( 'book_copy_2', get_post_meta( $copy_id, 'model', true )['table'] );
		} finally {
			$wpdb->query( 'DROP TABLE IF EXISTS book_copy' );
			add_filter( 'query', [ $this, '_create_temporary_tables' ] );
			add_filter( 'query', [ $this, '_drop_temporary_tables' ] );
		}
	}

	public function test_duplicate_skips_id_used_by_local_json(): void {
		$dir = sys_get_temp_dir() . '/mbb-duplicate-json';
		wp_mkdir_p( $dir );
		$filter = static function () use ( $dir ) {
			return [ $dir ];
		};
		add_filter( 'mb_json_paths', $filter );
		file_put_contents( $dir . '/book_copy.json', wp_json_encode( [
			'$schema' => 'https://schemas.metabox.io/field-group.json',
			'id'      => 'book_copy',
			'title'   => 'Book Copy',
			'fields'  => [],
		] ) );
		JsonService::clear_cache();

		try {
			$post_id = $this->create_post( 'meta-box', 'book', 'Book', [
				'settings' => [ 'id' => 'book' ],
				'fields'   => [],
				'meta_box' => [ 'id' => 'book' ],
			] );
			$copy_id = $this->copy( $post_id );

			$this->assertSame( 'book_copy_2', get_post( $copy_id )->post_name );
			$this->assertSame( 'book_copy_2', get_post_meta( $copy_id, 'settings', true )['id'] );
			$this->assertSame( 'book', get_post( $post_id )->post_name );
		} finally {
			wp_delete_file( $dir . '/book_copy.json' );
			remove_filter( 'mb_json_paths', $filter );
			JsonService::clear_cache();
		}
	}

	public function test_duplicate_trashed_post_uses_the_slug_from_before_trash(): void {
		$post_id = $this->create_post( 'meta-box', 'foo', 'Foo', [
			'settings' => [ 'id' => 'foo' ],
			'fields'   => [],
			'meta_box' => [ 'id' => 'foo' ],
		] );
		wp_trash_post( $post_id );

		$copy_id = $this->copy( $post_id );

		$this->assertSame( 'foo__trashed', get_post( $post_id )->post_name );
		$this->assertSame( 'foo', get_post_meta( $post_id, 'settings', true )['id'] );
		$this->assertSame( 'foo_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'foo_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
	}

	public function test_saving_copy_does_not_change_original(): void {
		$fields  = [
			[
				'id'     => 'group_field',
				'type'   => 'group',
				'name'   => 'Group',
				'fields' => [
					[
						'id'   => 'nested_text',
						'type' => 'text',
						'name' => 'Text',
					],
				],
			],
		];
		$meta    = [
			'settings' => [ 'id' => 'save-group' ],
			'fields'   => $fields,
			'meta_box' => [
				'id'     => 'save-group',
				'fields' => $fields,
			],
		];
		$post_id = $this->create_post( 'meta-box', 'save-group', 'Save Group', $meta );
		$copy_id = $this->copy( $post_id );

		$request = new WP_REST_Request( 'POST', '/mbb/save' );
		$request->set_param( 'post_id', $copy_id );
		$request->set_param( 'post_title', 'Save Group (Copy)' );
		$request->set_param( 'post_name', 'save-group_copy' );
		$request->set_param( 'fields', get_post_meta( $copy_id, 'fields', true ) );
		$request->set_param( 'settings', get_post_meta( $copy_id, 'settings', true ) );

		$result = ( new Save() )->save( $request );

		$this->assertTrue( $result['success'] );
		$this->assertSame( 'save-group_copy', get_post( $copy_id )->post_name );
		$saved_fields = get_post_meta( $copy_id, 'fields', true );
		$this->assertSame( 'group_field', $saved_fields[0]['id'] );
		$this->assertSame( 'nested_text', $saved_fields[0]['fields'][0]['id'] );
		$this->assert_original( $post_id, 'save-group', 'Save Group', $meta );
	}

	public function test_duplicate_without_slug_reads_id_from_meta(): void {
		$post_id = $this->track( wp_insert_post( [
			'post_type'   => 'meta-box',
			'post_status' => 'draft',
			'post_title'  => 'No Slug',
			'post_name'   => '',
		] ) );
		update_post_meta( $post_id, 'settings', [ 'id' => 'from-meta' ] );
		update_post_meta( $post_id, 'fields', [] );
		update_post_meta( $post_id, 'meta_box', [ 'id' => 'from-meta' ] );

		$copy_id = $this->copy( $post_id );

		$this->assertSame( '', get_post( $post_id )->post_name );
		$this->assertSame( 'from-meta', get_post_meta( $post_id, 'settings', true )['id'] );
		$this->assertSame( 'from-meta_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'from-meta_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
		$this->assertSame( 'from-meta_copy', get_post_meta( $copy_id, 'meta_box', true )['id'] );
	}

	public function test_row_action_includes_duplicate_link(): void {
		$post_id = $this->create_post( 'meta-box', 'row-group', 'Row Group', [] );
		$actions = $this->duplicator->add_duplicate_link( [], get_post( $post_id ) );

		$this->assertArrayHasKey( 'duplicate', $actions );
		$this->assertStringContainsString( 'Duplicate', $actions['duplicate'] );

		preg_match( '/href="([^"]+)"/', $actions['duplicate'], $matches );
		$href  = htmlspecialchars_decode( $matches[1] );
		$query = [];
		wp_parse_str( (string) wp_parse_url( $href, PHP_URL_QUERY ), $query );

		$this->assertSame( 'mbb-duplicate', $query['action'] );
		$this->assertSame( (string) $post_id, $query['post'] );
		$this->assertNotFalse( wp_verify_nonce( $query['_wpnonce'], 'mbb-duplicate_' . $post_id ) );
	}

	public function test_duplicate_ignores_array_query_args(): void {
		global $wpdb;

		$_GET['action'] = [ 'mbb-duplicate' ];
		$_GET['post']   = [ '1' ];
		$before         = (int) $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts" );

		$this->duplicator->duplicate();

		unset( $_GET['action'], $_GET['post'] );
		$this->assertSame( $before, (int) $wpdb->get_var( "SELECT COUNT(*) FROM $wpdb->posts" ) );
	}

	public function test_duplicate_rejects_empty_post_id(): void {
		$_GET['action']       = 'mbb-duplicate';
		$_GET['post']         = '0';
		$_REQUEST['_wpnonce'] = wp_create_nonce( 'mbb-duplicate_0' );

		$this->expectException( WPDieException::class );
		$this->expectExceptionMessage( 'not allowed' );

		try {
			$this->duplicator->duplicate();
		} finally {
			unset( $_GET['action'], $_GET['post'], $_REQUEST['_wpnonce'] );
		}
	}

	private function create_post( string $post_type, string $name, string $title, array $meta ): int {
		$post_id = wp_insert_post( [
			'post_type'   => $post_type,
			'post_status' => 'publish',
			'post_name'   => $name,
			'post_title'  => $title,
		] );
		foreach ( $meta as $key => $value ) {
			update_post_meta( $post_id, $key, $value );
		}

		return $this->track( (int) $post_id );
	}

	private function copy( int $post_id ): int {
		return $this->track( $this->duplicator->duplicate_post( get_post( $post_id ) ) );
	}

	private function track( int $post_id ): int {
		$this->post_ids[] = $post_id;
		return $post_id;
	}

	private function assert_original( int $post_id, string $name, string $title, array $meta ): void {
		$post = get_post( $post_id );
		$this->assertSame( $name, $post->post_name );
		$this->assertSame( $title, $post->post_title );
		$this->assertSame( 'publish', $post->post_status );
		foreach ( $meta as $key => $value ) {
			$this->assertSame( $value, get_post_meta( $post_id, $key, true ) );
		}
	}
}
