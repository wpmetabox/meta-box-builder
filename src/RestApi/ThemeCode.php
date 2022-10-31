<?php
namespace MBB\RestApi;

use WP_REST_Server;
use WP_REST_Request;

class ThemeCode {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		register_rest_route( 'mbb', 'theme-code-generate', [
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => [ $this, 'generate' ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	public function generate( WP_REST_Request $request ) {
		$settings = !empty( $request->get_param('settings') ) ? json_decode( $request->get_param('settings'), true ) : [];
		
		$fields = !empty( $request->get_param('fields') ) ? json_decode( $request->get_param('fields'), true ) : [];
		if( empty( $fields ) || empty( $settings ) ){
			return '';
		}

		$parser = new Parser( $settings );
		$parser->parse();
		
		$settings = $parser->get_settings();
		$settings['fields'] = $fields;

		$encoder = new Encoder( $settings );
		$encoder->encode();

		return $encoder->get_encoded_string();
	}	
}