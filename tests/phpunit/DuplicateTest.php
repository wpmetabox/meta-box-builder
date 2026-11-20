<?php

use MBB\Duplicate;
use MBB\JsonService;
use MBB\RestApi\Save;

class DuplicateTest extends WP_UnitTestCase {
	/** @var Duplicate */
	private $duplicator;

	public function set_up(): void {
		parent::set_up();
		$this->duplicator = new Duplicate();
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'administrator' ] ) );
	}

	public function test_duplicate_field_group_keeps_field_ids(): void {
		$fields  = [
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

		$shared = $meta;
		foreach ( [ 'settings', 'settings_page' ] as $key ) {
			$shared[ $key ]['id']          = 'theme';
			$shared[ $key ]['option_name'] = 'theme_copy';
		}
		$shared_id   = $this->create_post( 'mb-settings-page', 'theme', 'Theme', $shared );
		$shared_copy = $this->copy( $shared_id );
		$this->assertSame( 'theme_copy_2', get_post( $shared_copy )->post_name );
		$this->assertSame( 'theme_copy_2', get_post_meta( $shared_copy, 'settings', true )['option_name'] );
		$this->assertSame( 'theme_copy_2', get_post_meta( $shared_copy, 'settings_page', true )['option_name'] );
		$this->assertSame( 'theme_copy', get_post_meta( $shared_id, 'settings', true )['option_name'] );
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

	public function test_duplicate_skips_id_when_renamed_json_uses_both_file_names(): void {
		$dir = sys_get_temp_dir() . '/mbb-duplicate-json';
		wp_mkdir_p( $dir );
		$filter = static function () use ( $dir ) {
			return [ $dir ];
		};
		add_filter( 'mb_json_paths', $filter );
		file_put_contents( $dir . '/book_copy.json', wp_json_encode( [
			'$schema' => 'https://schemas.metabox.io/field-group.json',
			'id'      => 'book',
			'title'   => 'Book',
			'fields'  => [],
		] ) );
		file_put_contents( $dir . '/field-group-book_copy.json', wp_json_encode( [
			'$schema' => 'https://schemas.metabox.io/field-group.json',
			'id'      => 'other',
			'title'   => 'Other',
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
		} finally {
			wp_delete_file( $dir . '/book_copy.json' );
			wp_delete_file( $dir . '/field-group-book_copy.json' );
			remove_filter( 'mb_json_paths', $filter );
			JsonService::clear_cache();
		}
	}

	public function test_duplicate_gives_the_copy_its_own_function_name(): void {
		$post_id = $this->create_post( 'meta-box', 'theme-options', 'Theme Options', [
			'settings' => [
				'id'            => 'theme-options',
				'function_name' => 'register_theme_options',
			],
			'fields'   => [],
			'meta_box' => [ 'id' => 'theme-options' ],
		] );
		$copy_id = $this->copy( $post_id );

		$this->assertSame( 'theme_options_copy', get_post_meta( $copy_id, 'settings', true )['function_name'] );
		$this->assertSame( 'register_theme_options', get_post_meta( $post_id, 'settings', true )['function_name'] );

		$plain_id = $this->create_post( 'meta-box', 'plain', 'Plain', [
			'settings' => [ 'id' => 'plain' ],
			'fields'   => [],
			'meta_box' => [ 'id' => 'plain' ],
		] );
		$this->assertArrayNotHasKey( 'function_name', get_post_meta( $this->copy( $plain_id ), 'settings', true ) );

		$model_id = $this->create_post( 'mb-model', 'fnbook', 'Books', [
			'settings' => [
				'slug'          => 'fnbook',
				'table'         => 'books',
				'function_name' => 'register_books',
			],
			'model'    => [
				'id'    => 'fnbook',
				'name'  => 'fnbook',
				'table' => 'books',
			],
		] );
		$this->assertSame( 'fnbook_copy', get_post_meta( $this->copy( $model_id ), 'settings', true )['function_name'] );
	}

	public function test_duplicate_field_group_gets_its_own_custom_table(): void {
		global $wpdb;

		$meta    = [
			'settings' => [
				'id'           => 'book',
				'custom_table' => [
					'enable' => true,
					'create' => true,
					'name'   => 'books',
					'prefix' => false,
				],
			],
			'fields'   => [],
			'meta_box' => [
				'id'    => 'book',
				'table' => 'books',
			],
		];
		$post_id = $this->create_post( 'meta-box', 'book', 'Books', $meta );
		$copy_id = $this->copy( $post_id );

		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'settings', true )['custom_table']['name'] );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'meta_box', true )['table'] );
		$this->assertSame( 'books', get_post_meta( $post_id, 'settings', true )['custom_table']['name'] );

		$prefixed                                       = $meta;
		$prefixed['settings']['id']                     = 'prefixed';
		$prefixed['settings']['custom_table']['prefix'] = true;
		$prefixed['meta_box']['id']                     = 'prefixed';
		$prefixed['meta_box']['table']                  = $wpdb->prefix . 'books';
		$prefixed_copy                                  = $this->copy( $this->create_post( 'meta-box', 'prefixed', 'Books', $prefixed ) );
		$this->assertSame( 'prefixed_copy', get_post_meta( $prefixed_copy, 'settings', true )['custom_table']['name'] );
		$this->assertSame( $wpdb->prefix . 'prefixed_copy', get_post_meta( $prefixed_copy, 'meta_box', true )['table'] );

		$taken                                     = $meta;
		$taken['settings']['id']                   = 'taken';
		$taken['settings']['custom_table']['name'] = 'shelf_copy';
		$taken['meta_box']['id']                   = 'taken';
		$taken['meta_box']['table']                = 'shelf_copy';
		$this->create_post( 'meta-box', 'taken', 'Taken', $taken );
		$shelf                   = $meta;
		$shelf['settings']['id'] = 'shelf';
		$shelf['meta_box']['id'] = 'shelf';
		$skipped                 = $this->copy( $this->create_post( 'meta-box', 'shelf', 'Shelf', $shelf ) );
		$this->assertSame( 'shelf_copy', get_post( $skipped )->post_name );
		$this->assertSame( 'shelf_copy_2', get_post_meta( $skipped, 'settings', true )['custom_table']['name'] );

		$disabled                                       = $meta;
		$disabled['settings']['id']                     = 'disabled';
		$disabled['settings']['custom_table']['enable'] = false;
		$disabled['meta_box']['id']                     = 'disabled';
		$disabled_copy                                  = $this->copy( $this->create_post( 'meta-box', 'disabled', 'Disabled', $disabled ) );
		$this->assertSame( 'books', get_post_meta( $disabled_copy, 'settings', true )['custom_table']['name'] );

		$external                                       = $meta;
		$external['settings']['id']                     = 'external';
		$external['settings']['custom_table']['create'] = false;
		$external['meta_box']['id']                     = 'external';
		$external_copy                                  = $this->copy( $this->create_post( 'meta-box', 'external', 'External', $external ) );
		$this->assertSame( 'books', get_post_meta( $external_copy, 'settings', true )['custom_table']['name'] );
		$this->assertSame( 'books', get_post_meta( $external_copy, 'meta_box', true )['table'] );

		$unnamed                                     = $meta;
		$unnamed['settings']['id']                   = 'unnamed';
		$unnamed['settings']['custom_table']['name'] = '';
		$unnamed['meta_box']['id']                   = 'unnamed';
		$unnamed['meta_box']['table']                = '';
		$unnamed_copy                                = $this->copy( $this->create_post( 'meta-box', 'unnamed', 'Unnamed', $unnamed ) );
		$this->assertSame( '', get_post_meta( $unnamed_copy, 'settings', true )['custom_table']['name'] );
		$this->assertSame( '', get_post_meta( $unnamed_copy, 'meta_box', true )['table'] );
	}

	public function test_duplicate_model_keeps_the_table_prefix(): void {
		global $wpdb;

		$post_id = $this->create_post( 'mb-model', 'prefbook', 'Books', [
			'settings' => [
				'slug'   => 'prefbook',
				'table'  => 'books',
				'prefix' => true,
			],
			'model'    => [
				'id'    => 'prefbook',
				'name'  => 'prefbook',
				'table' => $wpdb->prefix . 'books',
			],
		] );
		$copy_id = $this->copy( $post_id );

		$this->assertSame( 'prefbook_copy', get_post_meta( $copy_id, 'settings', true )['table'] );
		$this->assertSame( $wpdb->prefix . 'prefbook_copy', get_post_meta( $copy_id, 'model', true )['table'] );
	}

	public function test_duplicate_refreshes_modified_time(): void {
		$post_id = $this->create_post( 'meta-box', 'stale', 'Stale', [
			'settings' => [
				'id'       => 'stale',
				'modified' => 1,
			],
			'fields'   => [],
			'meta_box' => [
				'id'       => 'stale',
				'modified' => 1,
			],
		] );
		$before  = time();
		$copy_id = $this->copy( $post_id );

		$settings = get_post_meta( $copy_id, 'settings', true );
		$meta_box = get_post_meta( $copy_id, 'meta_box', true );
		$this->assertGreaterThanOrEqual( $before, $settings['modified'] );
		$this->assertGreaterThanOrEqual( $before, $meta_box['modified'] );
		$this->assertSame( 1, get_post_meta( $post_id, 'settings', true )['modified'] );
		$this->assertSame( 1, get_post_meta( $post_id, 'meta_box', true )['modified'] );
	}

	public function test_duplicate_skips_a_slug_trash_will_restore(): void {
		$post_id = $this->create_post( 'meta-box', 'restore', 'Restore', [
			'settings' => [ 'id' => 'restore' ],
			'fields'   => [],
			'meta_box' => [ 'id' => 'restore' ],
		] );
		$first   = $this->copy( $post_id );
		wp_trash_post( $first );
		$second = $this->copy( $post_id );

		$this->assertSame( 'restore_copy_2', get_post( $second )->post_name );
		$this->assertSame( 'restore_copy_2', get_post_meta( $second, 'settings', true )['id'] );

		wp_untrash_post( $first );

		$this->assertSame( 'restore_copy', get_post( $first )->post_name );
		$this->assertSame( 'restore_copy', get_post_meta( $first, 'settings', true )['id'] );
		$this->assertSame( 'restore_copy_2', get_post( $second )->post_name );
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
		$post_id = wp_insert_post( [
			'post_type'   => 'meta-box',
			'post_status' => 'draft',
			'post_title'  => 'No Slug',
			'post_name'   => '',
		] );
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
		$href  = htmlspecialchars_decode( $matches[1], ENT_QUOTES );
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
		$this->expectException( WPDieException::class );
		$this->expectExceptionMessage( 'not allowed' );
		$this->request_duplicate( '0', wp_create_nonce( 'mbb-duplicate_0' ) );
	}

	public function test_duplicate_rejects_user_without_permission(): void {
		$post_id = $this->create_post( 'meta-box', 'secure', 'Secure', [] );
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'subscriber' ] ) );

		$this->assertArrayNotHasKey( 'duplicate', $this->duplicator->add_duplicate_link( [], get_post( $post_id ) ) );
		$this->expectException( WPDieException::class );
		$this->request_duplicate( (string) $post_id, wp_create_nonce( 'mbb-duplicate_' . $post_id ) );
	}

	public function test_duplicate_rejects_wrong_nonce(): void {
		$post_id = $this->create_post( 'meta-box', 'nonce', 'Nonce', [] );
		$this->expectException( WPDieException::class );
		$this->request_duplicate( (string) $post_id, 'wrong' );
	}

	private function request_duplicate( string $post_id, string $nonce ): void {
		$_GET['action']       = 'mbb-duplicate';
		$_GET['post']         = $post_id;
		$_REQUEST['_wpnonce'] = $nonce;

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

		return (int) $post_id;
	}

	private function copy( int $post_id ): int {
		return $this->duplicator->duplicate_post( get_post( $post_id ) );
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
