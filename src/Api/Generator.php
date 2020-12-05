<?php
namespace MBB\Api;

use WP_REST_Server;
use WP_REST_Request;
use Riimu\Kit\PHPEncoder\PHPEncoder;

class Generator {
	private $encoded_string;
	private $text_domain = 'your-text-domain';
	private $prefix = '';
	private $function_name = 'your_prefix_register_meta_boxes';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		register_rest_route( 'mbb', 'generate', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'generate' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	public function generate( WP_REST_Request $request ) {
		$settings = $request->get_json_params();
		$encoder = new PHPEncoder();
		$this->encoded_string = $encoder->encode( $settings, [
			'array.base'  => 4,
			'array.align' => true,
		] );

		$this->wrap_function_call();

		return $this->encoded_string;
	}

	private function wrap_function_call() {
		$this->encoded_string = sprintf(
			'<?php
add_filter( \'rwmb_meta_boxes\', \'%1$s\' );
function %1$s( $meta_boxes ) {
    $prefix = \'%3$s\';
    $meta_boxes[] = %2$s;
    return $meta_boxes;
}',
			$this->function_name,
			$this->encoded_string,
			$this->prefix
		);
		return $this;
	}
}