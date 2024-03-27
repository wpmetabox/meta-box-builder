<?php
namespace MBB\RestApi;

use MBB\Extensions\Blocks as BlockExtension;
use MBBParser\Parsers\Settings;

class Blocks extends Base {
	public function is_future_path_writable( $request ) {
		$path = $request->get_param( 'path' );

		// Parse the path to get the correct path
		$parser = new Settings();
		$path   = $parser->replace_variables( $path );

		$is_writable = BlockExtension::is_future_path_writable( $path );

		return new \WP_REST_Response( $is_writable );
	}
}
