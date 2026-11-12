<?php
use MBB\RestApi\Generator;
use MBB\RestApi\ThemeCode\ThemeCode;

/**
 * Tests for "Get PHP Code" and "Theme code".
 * Each case is a bug reported by users. The generated code must be valid PHP and use the same field IDs as when the field group is saved.
 */
class CodeGeneratorTest extends WP_UnitTestCase {
	private array $fields = [
		'title' => [
			'_id'        => 'title',
			'type'       => 'text',
			'id'         => 'title',
			'name'       => "Multi\nline name",
			'desc'       => "Line 1\nLine 2",
			'validation' => [
				[
					'name'    => 'required',
					'value'   => true,
					'message' => 'Required',
				],
			],
		],
		'color' => [
			'_id'     => 'color',
			'type'    => 'select',
			'id'      => 'color',
			'name'    => 'Color',
			'options' => 'callback: mbb_test_function_not_loaded',
		],
		'info'  => [
			'_id'    => 'info',
			'type'   => 'group',
			'id'     => 'info',
			'name'   => 'Info',
			'clone'  => true,
			'fields' => [
				'phone' => [
					'_id'  => 'phone',
					'type' => 'text',
					'id'   => 'phone',
					'name' => 'Phone',
				],
			],
		],
	];

	private array $settings = [
		'prefix'        => 'mbt_',
		'object_type'   => 'post',
		'post_types'    => [ 'post' ],
		'text_domain'   => 'test-domain',
		'function_name' => 'mbb_test_register_meta_boxes',
		// Strings, as in old field groups.
		'custom_table'  => [
			'enable' => 'true',
			'name'   => 'books',
			'prefix' => 'false',
		],
	];

	private function get_php_code(): string {
		$request = new WP_REST_Request( 'POST', '/mbb/generate' );
		$request->set_body_params( [
			'post_title' => 'Test',
			'post_name'  => 'test',
			'fields'     => $this->fields,
			'settings'   => $this->settings,
		] );
		return ( new Generator() )->generate( $request );
	}

	private function get_theme_code(): array {
		$fields              = array_values( $this->fields );
		$fields[2]['fields'] = array_values( $fields[2]['fields'] );

		$request = new WP_REST_Request( 'POST', '/mbb/theme-code-generate' );
		$request->set_body_params( [
			'fields'   => $fields,
			'settings' => $this->settings,
		] );

		$code = [];
		foreach ( ( new ThemeCode() )->generate( $request ) as $field ) {
			$code[ $field['id'] ] = html_entity_decode( $field['theme_code'], ENT_QUOTES );
		}
		return $code;
	}

	/**
	 * Use php -l to also catch compile errors like "[ , 'page' ]", which token_get_all() does not.
	 */
	private function assertValidPhp( string $code ): void {
		$file = tempnam( sys_get_temp_dir(), 'mbb' );
		file_put_contents( $file, $code ); // phpcs:ignore
		exec( escapeshellarg( PHP_BINARY ) . ' -l ' . escapeshellarg( $file ) . ' 2>&1', $output, $status ); // phpcs:ignore
		unlink( $file ); // phpcs:ignore
		$this->assertSame( 0, $status, implode( "\n", $output ) . "\n" . $code );
	}

	public function testPhpCodeIsValid() {
		$this->assertValidPhp( $this->get_php_code() );
	}

	public function testPhpCodeTranslatesMultilineText() {
		$code = $this->get_php_code();
		$this->assertStringNotContainsString( '{translate}', $code );
		$this->assertStringContainsString( "__( 'Line 1\nLine 2', 'test-domain' )", $code );
	}

	public function testPhpCodeKeepsCallbackNotLoaded() {
		$this->assertStringContainsString( "'options' => mbb_test_function_not_loaded()", $this->get_php_code() );
	}

	public function testPhpCodeValidationUsesPrefixOnce() {
		$code = $this->get_php_code();
		$this->assertStringContainsString( "\$prefix . 'title' => [", $code );
		$this->assertStringNotContainsString( "\$prefix . 'mbt_title'", $code );
	}

	public function testThemeCodeIsValid() {
		foreach ( $this->get_theme_code() as $code ) {
			$this->assertValidPhp( $code );
		}
	}

	public function testThemeCodeGroupSubfieldsHavePrefix() {
		$code = $this->get_theme_code()['info'];
		$this->assertStringContainsString( "\$group[ 'mbt_phone' ]", $code );
	}

	public function testThemeCodeCustomTableArgs() {
		$code = $this->get_theme_code()['title'];
		$this->assertStringContainsString( "rwmb_meta( 'mbt_title', [ 'storage_type' => 'custom_table', 'table' => 'books' ] )", $code );
	}
}
