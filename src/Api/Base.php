<?php
namespace MBB\Api;

use WP_REST_Server;
use ReflectionMethod;

class Base {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$methods = $this->get_public_methods();
		$methods = array_diff( $methods, [ '__construct', 'register_routes', 'has_permission' ] );
		array_walk( $methods, [ $this, 'register_route' ] );
	}

	private function register_route( $method ) {
		$route = str_replace( ['get_', '_'], ['', '-'], $method );
		register_rest_route( 'mbb', $route, [
			'method'              => WP_REST_Server::READABLE,
			'callback'            => [ $this, $method ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	private function get_public_methods() {
		$methods = get_class_methods( $this );
		return array_filter( $methods, function( $method ) {
			$reflect = new ReflectionMethod( $this, $method );
			return $reflect->isPublic();
		} );
	}
}