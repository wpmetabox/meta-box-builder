<?php
use MBB\Duplicate;
use MBB\JsonService;
use MBB\LocalJson;
use MBB\RestApi\Save;

class DuplicateTest extends WP_UnitTestCase {
	private Duplicate $duplicator;

	public function set_up(): void {
		parent::set_up();
		$this->duplicator = new Duplicate();
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'administrator' ] ) );
	}

	public function test_copy_is_a_draft_with_a_new_id_and_the_same_fields(): void {
		$fields  = [
			[
				'id'     => 'group_field',
				'type'   => 'group',
				'fields' => [
					[
						'id'   => 'nested_text',
						'type' => 'text',
						'std'  => '^\\d+$',
					],
				],
			],
		];
		$meta    = [
			'settings' => [ 'id' => 'book' ],
			'fields'   => $fields,
			'meta_box' => [
				'id'     => 'book',
				'fields' => $fields,
			],
		];
		$post_id = $this->create_post( 'meta-box', 'book', $meta );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );
		$copy    = get_post( $copy_id );

		$this->assertSame( 'draft', $copy->post_status );
		$this->assertSame( 'Book (Copy)', $copy->post_title );
		$this->assertSame( 'book_copy', $copy->post_name );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'meta_box', true )['id'] );
		$this->assertSame( 'group_field', get_post_meta( $copy_id, 'fields', true )[0]['id'] );
		$this->assertSame( 'nested_text', get_post_meta( $copy_id, 'fields', true )[0]['fields'][0]['id'] );
		$this->assertSame( '^\\d+$', get_post_meta( $copy_id, 'fields', true )[0]['fields'][0]['std'] );
	}

	public function test_second_copy_gets_a_unique_slug(): void {
		$post_id = $this->create_post( 'meta-box', 'book', [
			'settings' => [ 'id' => 'book' ],
			'fields'   => [],
			'meta_box' => [ 'id' => 'book' ],
		] );

		$first  = $this->duplicator->duplicate_post( get_post( $post_id ) );
		$second = $this->duplicator->duplicate_post( get_post( $post_id ) );

		$this->assertSame( 'book_copy', get_post( $first )->post_name );
		$this->assertSame( 'book_copy-2', get_post( $second )->post_name );
		$this->assertSame( 'book_copy-2', get_post_meta( $second, 'settings', true )['id'] );
	}

	public function test_settings_page_drops_the_shared_option_name(): void {
		$post_id = $this->create_post( 'mb-settings-page', 'theme', [
			'settings'      => [
				'id'          => 'theme',
				'option_name' => 'theme',
			],
			'settings_page' => [
				'id'          => 'theme',
				'option_name' => 'theme',
			],
		] );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );

		$this->assertSame( 'theme_copy', get_post_meta( $copy_id, 'settings', true )['id'] );
		$this->assertArrayNotHasKey( 'option_name', get_post_meta( $copy_id, 'settings', true ) );
		$this->assertArrayNotHasKey( 'option_name', get_post_meta( $copy_id, 'settings_page', true ) );
		$this->assertSame( 'theme', get_post_meta( $post_id, 'settings', true )['option_name'] );
	}

	public function test_model_gets_its_own_table(): void {
		$post_id = $this->create_post( 'mb-model', 'book', [
			'settings' => [
				'slug'  => 'book',
				'table' => 'books',
			],
			'model'    => [
				'id'    => 'book',
				'name'  => 'book',
				'table' => 'wp_books',
			],
		] );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );

		$this->assertSame( 'book_copy', get_post( $copy_id )->post_name );
		$this->assertSame( 'draft', get_post( $copy_id )->post_status );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'settings', true )['table'] );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'model', true )['table'] );
		$this->assertSame( 'book_copy', get_post_meta( $copy_id, 'model', true )['name'] );
		$this->assertSame( 'books', get_post_meta( $post_id, 'settings', true )['table'] );
		$this->assertSame( 'wp_books', get_post_meta( $post_id, 'model', true )['table'] );
	}

	public function test_copy_skips_an_id_that_already_has_a_local_json_file(): void {
		$dir  = get_temp_dir() . 'mbb-duplicate-json';
		$file = $dir . '/book_copy.json';
		wp_mkdir_p( $dir );
		file_put_contents( // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
			$file,
			wp_json_encode( [
				'$schema' => 'https://schemas.metabox.io/field-group.json',
				'id'      => 'book_copy',
				'title'   => 'Taken',
				'fields'  => [],
			] )
		);
		$filter = static function () use ( $dir ) {
			return [ $dir ];
		};
		add_filter( 'mb_json_paths', $filter );
		JsonService::clear_cache();

		try {
			$post_id = $this->create_post( 'meta-box', 'book', [
				'settings' => [ 'id' => 'book' ],
				'fields'   => [],
				'meta_box' => [ 'id' => 'book' ],
			] );
			$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );

			$this->assertSame( 'book_copy-2', get_post( $copy_id )->post_name );
			$this->assertSame( 'book_copy-2', get_post_meta( $copy_id, 'settings', true )['id'] );
			$this->assertSame( 'book_copy', LocalJson::read_file( $file )['id'] );
		} finally {
			remove_filter( 'mb_json_paths', $filter );
			wp_delete_file( $file );
			JsonService::clear_cache();
		}
	}

	public function test_copy_keeps_a_backslash_in_the_title(): void {
		$post_id = $this->create_post( 'meta-box', 'regex', [
			'settings' => [ 'id' => 'regex' ],
			'fields'   => [],
			'meta_box' => [ 'id' => 'regex' ],
		] );
		wp_update_post( wp_slash( [
			'ID'         => $post_id,
			'post_title' => 'Regex ^\\d+$',
		] ) );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );

		$this->assertSame( 'Regex ^\\d+$ (Copy)', get_post( $copy_id )->post_title );
	}

	public function test_missing_meta_is_an_empty_array(): void {
		$post_id = $this->create_post( 'meta-box', 'blank', [
			'settings' => [ 'id' => 'blank' ],
			'meta_box' => [ 'id' => 'blank' ],
		] );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );

		$this->assertSame( [], get_post_meta( $copy_id, 'fields', true ) );
	}

	public function test_saving_the_copy_does_not_change_the_original(): void {
		$fields  = [
			[
				'id'   => 'title',
				'type' => 'text',
			],
		];
		$meta    = [
			'settings' => [ 'id' => 'save' ],
			'fields'   => $fields,
			'meta_box' => [
				'id'     => 'save',
				'fields' => $fields,
			],
		];
		$post_id = $this->create_post( 'meta-box', 'save', $meta );
		$copy_id = $this->duplicator->duplicate_post( get_post( $post_id ) );
		$request = new WP_REST_Request( 'POST', '/mbb/save' );
		$request->set_param( 'post_id', $copy_id );
		$request->set_param( 'post_title', 'Save (Copy)' );
		$request->set_param( 'post_name', 'save_copy' );
		$request->set_param( 'fields', get_post_meta( $copy_id, 'fields', true ) );
		$request->set_param( 'settings', get_post_meta( $copy_id, 'settings', true ) );

		$this->assertTrue( ( new Save() )->save( $request )['success'] );
		$this->assertSame( 'save_copy', get_post_meta( $copy_id, 'meta_box', true )['id'] );
		foreach ( $meta as $key => $value ) {
			$this->assertSame( $value, get_post_meta( $post_id, $key, true ) );
		}
	}

	public function test_link_is_hidden_for_trash_and_users_without_permission(): void {
		$post_id = $this->create_post( 'meta-box', 'link', [] );

		$this->assertArrayHasKey( 'duplicate', $this->duplicator->add_link( [], get_post( $post_id ) ) );

		wp_trash_post( $post_id );
		$this->assertArrayNotHasKey( 'duplicate', $this->duplicator->add_link( [], get_post( $post_id ) ) );

		wp_untrash_post( $post_id );
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'subscriber' ] ) );
		$this->assertArrayNotHasKey( 'duplicate', $this->duplicator->add_link( [], get_post( $post_id ) ) );
	}

	public function test_handler_rejects_users_without_permission(): void {
		$post_id = $this->create_post( 'meta-box', 'secure', [] );
		wp_set_current_user( $this->factory()->user->create( [ 'role' => 'subscriber' ] ) );

		$this->expect_die( $post_id, wp_create_nonce( 'mbb_duplicate_' . $post_id ) );
	}

	public function test_handler_rejects_a_wrong_nonce(): void {
		$this->expect_die( $this->create_post( 'meta-box', 'nonce', [] ), 'wrong' );
	}

	public function test_handler_rejects_other_post_types(): void {
		$post_id = $this->factory()->post->create();

		$this->expect_die( $post_id, wp_create_nonce( 'mbb_duplicate_' . $post_id ) );
	}

	private function expect_die( int $post_id, string $nonce ): void {
		$_GET['post']         = (string) $post_id;
		$_REQUEST['_wpnonce'] = $nonce;
		$this->expectException( WPDieException::class );

		try {
			$this->duplicator->duplicate();
		} finally {
			unset( $_GET['post'], $_REQUEST['_wpnonce'] );
		}
	}

	private function create_post( string $post_type, string $name, array $meta ): int {
		$post_id = $this->factory()->post->create( [
			'post_type'  => $post_type,
			'post_name'  => $name,
			'post_title' => ucfirst( $name ),
		] );
		foreach ( $meta as $key => $value ) {
			update_post_meta( $post_id, $key, wp_slash( $value ) );
		}

		return $post_id;
	}
}
