<?php
namespace MBB\RestApi;

use WP_REST_Server;
use ReflectionMethod;
use RWMB_Post_Field;
use RWMB_Taxonomy_Field;
use RWMB_User_Field;
use MBB\Helpers\Data;
use MetaBox\Support\Arr;
use MBB\JsonService;
use MBB\LocalJson;

class Base {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		$public_methods = $this->get_public_methods();
		$public_methods = array_diff( $public_methods, [ '__construct', 'register_routes', 'has_permission' ] );
		array_walk( $public_methods, [ $this, 'register_route' ] );
	}

	private function register_route( $method ): void {
		$route   = str_replace( [ 'get_', '_' ], [ '', '-' ], $method );
		$methods = str_starts_with( $method, 'set_' ) ? WP_REST_Server::EDITABLE : WP_REST_Server::READABLE;

		register_rest_route( 'mbb', $route, [ 
			'methods' => $methods,
			'callback' => [ $this, $method ],
			'permission_callback' => [ $this, 'has_permission' ],
		] );
	}

	public function has_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get all public methods of the class.
	 * 
	 * @return string[]
	 */
	private function get_public_methods(): array {
		$methods = get_class_methods( $this );

		return array_filter( $methods, function ($method) {
			$reflect = new ReflectionMethod( $this, $method );
			return $reflect->isPublic();
		} );
	}

	protected function get_posts( $s, $name = '', $post_types = '' ) {
		$post_types = Arr::from_csv( $post_types );

		$field = [ 
			'id' => 'mbb_api_post',
			'type' => 'post',
			'clone' => false,
			'query_args' => [ 
				's' => $s,
				'post_type' => $post_types,
				'post_status' => 'any',
				'posts_per_page' => 10,
				'orderby' => 'post_title',
				'order' => 'ASC',
			],
		];

		$data = RWMB_Post_Field::query( null, $field );

		return array_values( $data );
	}

	protected function get_terms( $s, $taxonomy ) {
		$field = [ 
			'id' => 'mbb_api_term',
			'type' => 'taxonomy',
			'clone' => false,
			'query_args' => [ 
				'taxonomy' => $taxonomy,
				'name__like' => $s,
				'orderby' => 'name',
				'number' => 10,
			],
		];

		$data = RWMB_Taxonomy_Field::query( null, $field );
		return array_values( $data );
	}

	protected function get_users( $s ) {
		$field = [ 
			'id' => 'mbb_api_user',
			'type' => 'user',
			'clone' => false,
			'display_field' => 'display_name',
			'query_args' => [ 
				'search' => "*{$s}*",
				'number' => 10,
				'orderby' => 'display_name',
				'order' => 'ASC',
			],
		];

		$data = RWMB_User_Field::query( null, $field );
		return array_values( $data );
	}

	protected function get_user_roles( $s ) {
		global $wp_roles;

		$roles = $wp_roles->roles;
		$data  = [];
		foreach ( $roles as $key => $role ) {
			if ( empty( $s ) || false !== strpos( $role['name'], $s ) ) {
				$data[] = [ 
					'value' => $key,
					'label' => $role['name'],
				];
			}
		}
		return $data;
	}

	protected function get_templates( $s ) {
		$templates = Data::get_templates();

		// Group templates by file, which eliminates duplicates templates for multiple post types.
		$items = [];
		foreach ( $templates as $template ) {
			if ( empty( $s ) || false !== strpos( strtolower( $template['name'] ), $s ) ) {
				$items[ $template['file'] ] = $template['name'];
			}
		}

		$data = [];
		foreach ( $items as $id => $name ) {
			$data[] = [ 
				'value' => $id,
				'label' => $name,
			];
		}
		return $data;
	}

	protected function get_formats( $s ) {
		$items = Data::get_post_formats();
		$data  = [];
		foreach ( $items as $name ) {
			if ( empty( $s ) || false !== strpos( $name, $s ) ) {
				$data[] = [ 
					'value' => $name,
					'label' => ucfirst( $name ),
				];
			}
		}
		return $data;
	}

	/**
	 * Get local json data, including sync status.
	 * 
	 * @return array
	 */
	public function get_json_data( \WP_REST_Request $request ): array {
		$params = $request->get_params();
		$json   = JsonService::get_json( $params );

		return $json;
	}

	public function set_json_data( \WP_REST_Request $request ): \WP_REST_Response {
		$params = $request->get_params();

		foreach ( ['id', 'use'] as $param ) {
			if ( ! isset( $params[$param] ) ) {
				return new \WP_REST_Response( [ 
					'success' => false,
					'message' => ucfirst($param) . ' is required',
				], 400 );
			}
		}

		$use = $params['use'];

		$res = call_user_func( [ LocalJson::class, 'use_' . $use ], $params['id'] );

		return new \WP_REST_Response( [ 
			'success' => true,
		], 200 );
	}
}
