<?php
namespace MBB\Abilities;

use MBB\RestApi\Save;
use MBB\JsonService;
use MBB\LocalJson;
use MBBParser\Unparsers\MetaBox;
use MBBParser\Unparsers\Field as FieldUnparser;
use WP_REST_Request;
use WP_Error;

class FieldGroupAbilities {
	private const CATEGORY = 'meta-box';

	public function __construct() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}
		add_action( 'wp_abilities_api_categories_init', [ $this, 'register_category' ] );
		add_action( 'wp_abilities_api_init', [ $this, 'register_abilities' ] );
	}

	public function register_category(): void {
		if ( wp_has_ability_category( self::CATEGORY ) ) {
			return;
		}

		wp_register_ability_category( self::CATEGORY, [
			'label' => __( 'Meta Box', 'meta-box-builder' ),
		] );
	}

	public function register_abilities(): void {
		$this->register_list_field_groups();
		$this->register_get_field_group();
		$this->register_create_field_group();
		$this->register_update_field_group();
		$this->register_delete_field_group();
		$this->register_list_fields();
		$this->register_get_field();
		$this->register_create_field();
		$this->register_update_field();
		$this->register_delete_field();
	}

	private function register_list_field_groups(): void {
		wp_register_ability( 'meta-box/list-field-groups', [
			'label'               => __( 'List field groups', 'meta-box-builder' ),
			'description'         => __( 'List all custom field groups stored in the database.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'search'   => [
						'type'        => 'string',
						'description' => __( 'Search field group titles.', 'meta-box-builder' ),
					],
					'status'   => [
						'type'        => 'string',
						'description' => __( 'Post status to filter by.', 'meta-box-builder' ),
						'enum'        => [ 'publish', 'draft', 'pending', 'trash', 'any' ],
						'default'     => 'publish',
					],
					'per_page' => [
						'type'    => 'integer',
						'default' => 20,
					],
					'page'     => [
						'type'    => 'integer',
						'default' => 1,
					],
				],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'field_groups' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'          => [ 'type' => 'integer' ],
								'title'       => [ 'type' => 'string' ],
								'slug'        => [ 'type' => 'string' ],
								'status'      => [ 'type' => 'string' ],
								'field_count' => [ 'type' => 'integer' ],
								'created_at'  => [ 'type' => 'string' ],
								'modified_at' => [ 'type' => 'string' ],
							],
						],
					],
					'total'        => [ 'type' => 'integer' ],
					'total_pages'  => [ 'type' => 'integer' ],
				],
			],
			'execute_callback'    => [ $this, 'list_field_groups' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_get_field_group(): void {
		wp_register_ability( 'meta-box/get-field-group', [
			'label'               => __( 'Get field group', 'meta-box-builder' ),
			'description'         => __( 'Get a field group with all its fields and settings.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'id' => [
						'type'        => 'integer',
						'description' => __( 'The field group post ID.', 'meta-box-builder' ),
					],
				],
				'required'   => [ 'id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'id'          => [ 'type' => 'integer' ],
					'title'       => [ 'type' => 'string' ],
					'slug'        => [ 'type' => 'string' ],
					'status'      => [ 'type' => 'string' ],
					'fields'      => [
						'type'  => 'array',
						'items' => [ 'type' => 'object' ],
					],
					'settings'    => [ 'type' => 'object' ],
					'created_at'  => [ 'type' => 'string' ],
					'modified_at' => [ 'type' => 'string' ],
				],
			],
			'execute_callback'    => [ $this, 'get_field_group' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_create_field_group(): void {
		wp_register_ability( 'meta-box/create-field-group', [
			'label'               => __( 'Create field group', 'meta-box-builder' ),
			'description'         => __( 'Create a new field group.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'title'    => [
						'type'        => 'string',
						'description' => __( 'Field group title.', 'meta-box-builder' ),
					],
					'slug'     => [
						'type'        => 'string',
						'description' => __( 'Field group slug.', 'meta-box-builder' ),
					],
					'status'   => [
						'type'        => 'string',
						'description' => __( 'Post status.', 'meta-box-builder' ),
						'enum'        => [ 'publish', 'draft' ],
					],
					'fields'   => [
						'type'        => 'array',
						'description' => __( 'Array of field definitions. See https://github.com/wpmetabox/schema/blob/main/field-group.json for full schema.', 'meta-box-builder' ),
						'items'       => [
							'type'                 => 'object',
							'additionalProperties' => true,
						],
					],
					'settings' => [
						'type' => 'object',
					],
				],
				'required'   => [ 'title' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
					'id'      => [ 'type' => 'integer' ],
				],
			],
			'execute_callback'    => [ $this, 'create_field_group' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => false,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_update_field_group(): void {
		wp_register_ability( 'meta-box/update-field-group', [
			'label'               => __( 'Update field group', 'meta-box-builder' ),
			'description'         => __( 'Update an existing field group.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'id'       => [
						'type'        => 'integer',
						'description' => __( 'The field group post ID.', 'meta-box-builder' ),
					],
					'title'    => [
						'type'        => 'string',
						'description' => __( 'Field group title.', 'meta-box-builder' ),
					],
					'slug'     => [
						'type'        => 'string',
						'description' => __( 'Field group slug.', 'meta-box-builder' ),
					],
					'status'   => [
						'type'        => 'string',
						'description' => __( 'Post status.', 'meta-box-builder' ),
						'enum'        => [ 'publish', 'draft' ],
					],
					'fields'   => [
						'type'        => 'array',
						'description' => __( 'Array of field definitions. See https://github.com/wpmetabox/schema/blob/main/field-group.json for full schema.', 'meta-box-builder' ),
						'items'       => [
							'type'                 => 'object',
							'additionalProperties' => true,
						],
					],
					'settings' => [
						'type' => 'object',
					],
				],
				'required'   => [ 'id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
					'id'      => [ 'type' => 'integer' ],
				],
			],
			'execute_callback'    => [ $this, 'update_field_group' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_delete_field_group(): void {
		wp_register_ability( 'meta-box/delete-field-group', [
			'label'               => __( 'Delete field group', 'meta-box-builder' ),
			'description'         => __( 'Delete a field group. Supports trashing or permanent deletion.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'id'    => [
						'type' => 'integer',
					],
					'force' => [
						'type'    => 'boolean',
						'default' => false,
					],
				],
				'required'   => [ 'id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback'    => [ $this, 'delete_field_group' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => false,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_list_fields(): void {
		wp_register_ability( 'meta-box/list-fields', [
			'label'               => __( 'List fields', 'meta-box-builder' ),
			'description'         => __( 'List all fields within a specific field group.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'field_group_id' => [
						'type' => 'integer',
					],
				],
				'required'   => [ 'field_group_id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'fields'   => [
						'type'  => 'array',
						'items' => [ 'type' => 'object' ],
					],
					'settings' => [ 'type' => 'object' ],
				],
			],
			'execute_callback'    => [ $this, 'list_fields' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_get_field(): void {
		wp_register_ability( 'meta-box/get-field', [
			'label'               => __( 'Get field', 'meta-box-builder' ),
			'description'         => __( 'Get a single field definition from a field group by its field ID.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'field_group_id' => [
						'type' => 'integer',
					],
					'field_id'       => [
						'type'        => 'string',
						'description' => __( 'The field ID (without prefix).', 'meta-box-builder' ),
					],
				],
				'required'   => [ 'field_group_id', 'field_id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'field' => [ 'type' => 'object' ],
				],
			],
			'execute_callback'    => [ $this, 'get_field' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_create_field(): void {
		wp_register_ability( 'meta-box/create-field', [
			'label'               => __( 'Create field', 'meta-box-builder' ),
			'description'         => __( 'Add a new field to a field group.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'field_group_id' => [
						'type' => 'integer',
					],
					'field'          => [
						'type'                 => 'object',
						'description'          => __( 'Field definition. Must include id, type. Accepts all Meta Box field properties (e.g. options, std, placeholder, required, desc, clone, etc.). See https://github.com/wpmetabox/schema/blob/main/field-group.json for full schema.', 'meta-box-builder' ),
						'properties'           => [
							'id'   => [ 'type' => 'string' ],
							'type' => [ 'type' => 'string' ],
							'name' => [ 'type' => 'string' ],
						],
						'additionalProperties' => true,
					],
				],
				'required'   => [ 'field_group_id', 'field' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback'    => [ $this, 'create_field' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => false,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_update_field(): void {
		wp_register_ability( 'meta-box/update-field', [
			'label'               => __( 'Update field', 'meta-box-builder' ),
			'description'         => __( 'Update an existing field in a field group. Use field_id to identify the field to update. The field.id in the field object can be changed to rename the field.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'field_group_id' => [
						'type' => 'integer',
					],
					'field_id'       => [
						'type'        => 'string',
						'description' => __( 'The current field ID to identify which field to update.', 'meta-box-builder' ),
					],
					'field'          => [
						'type'                 => 'object',
						'description'          => __( 'Field definition. Accepts all Meta Box field properties. The id property can be changed to rename the field. See https://github.com/wpmetabox/schema/blob/main/field-group.json for full schema.', 'meta-box-builder' ),
						'properties'           => [
							'id'   => [ 'type' => 'string' ],
							'type' => [ 'type' => 'string' ],
							'name' => [ 'type' => 'string' ],
						],
						'additionalProperties' => true,
					],
				],
				'required'   => [ 'field_group_id', 'field_id', 'field' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback'    => [ $this, 'update_field' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	private function register_delete_field(): void {
		wp_register_ability( 'meta-box/delete-field', [
			'label'               => __( 'Delete field', 'meta-box-builder' ),
			'description'         => __( 'Remove a field from a field group by its field ID.', 'meta-box-builder' ),
			'category'            => self::CATEGORY,
			'input_schema'        => [
				'type'       => 'object',
				'properties' => [
					'field_group_id' => [
						'type' => 'integer',
					],
					'field_id'       => [
						'type' => 'string',
					],
				],
				'required'   => [ 'field_group_id', 'field_id' ],
			],
			'output_schema'       => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback'    => [ $this, 'delete_field' ],
			'permission_callback' => [ $this, 'permission_callback' ],
			'meta'                => [
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => false,
				],
				'mcp'         => [
					'public' => true,
					'type'   => 'tool',
				],
			],
		] );
	}

	/**
	 * Execute callbacks.
	 */
	public function list_field_groups( array $input ): array {
		$search   = $input['search'] ?? '';
		$status   = $input['status'] ?? 'publish';
		$per_page = $input['per_page'] ?? 20;
		$page     = $input['page'] ?? 1;

		$args = [
			'post_type'              => 'meta-box',
			'post_status'            => $status,
			'posts_per_page'         => $per_page,
			'paged'                  => $page,
			'no_found_rows'          => false,
			'update_post_term_cache' => false,
		];

		if ( $search ) {
			$args['s'] = $search;
		}

		$query  = new \WP_Query( $args );
		$groups = [];

		foreach ( $query->posts as $post ) {
			if ( ! $this->is_database_only( $post ) ) {
				continue;
			}
			$groups[] = $this->build_field_group_summary( $post );
		}

		return [
			'field_groups' => $groups,
			'total'        => $query->found_posts,
			'total_pages'  => $query->max_num_pages,
		];
	}

	public function get_field_group( array $input ): array {
		$post = get_post( $input['id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return new WP_Error( 'not_found', __( 'Field group not found.', 'meta-box-builder' ) );
		}

		return $this->build_field_group_response( $post );
	}

	public function create_field_group( array $input ): array {
		$unparsed = $this->unparse_input( $input );
		$title    = $unparsed['title'];
		$slug     = $unparsed['slug'];
		$fields   = $unparsed['fields'];
		$settings = $unparsed['settings'];

		$post_id = wp_insert_post( [
			'post_type'   => 'meta-box',
			'post_title'  => $title,
			'post_name'   => $slug ? $slug : sanitize_title( $title ),
			'post_status' => 'publish',
		] );

		if ( is_wp_error( $post_id ) ) {
			return [
				'success' => false,
				'message' => $post_id->get_error_message(),
				'id'      => 0,
			];
		}

		$request = new WP_REST_Request( 'POST', '/mbb/save' );
		$request->set_param( 'post_id', $post_id );
		$request->set_param( 'post_title', $title );
		$request->set_param( 'post_name', $slug );
		$request->set_param( 'fields', $fields );
		$request->set_param( 'settings', $settings );

		$save   = new Save();
		$result = $save->save( $request );

		if ( ! empty( $unparsed['status'] ) && ! empty( $result['success'] ) && $unparsed['status'] !== 'publish' ) {
			wp_update_post( [
				'ID'          => $post_id,
				'post_status' => $unparsed['status'],
			] );
		}

		return array_merge( $result, [ 'id' => $post_id ] );
	}

	public function update_field_group( array $input ): array {
		$post_id = $input['id'];
		$post    = get_post( $post_id );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return [
				'success' => false,
				'message' => __( 'Field group not found.', 'meta-box-builder' ),
			];
		}

		$unparsed = $this->unparse_input( $input );
		$title    = $unparsed['title'] ?: $post->post_title;
		$slug     = $unparsed['slug'] ?: $post->post_name;

		$existing_fields   = get_post_meta( $post->ID, 'fields', true ) ?: [];
		$existing_settings = get_post_meta( $post->ID, 'settings', true ) ?: [];

		$fields   = $this->merge_fields( $existing_fields, $unparsed['fields'] );
		$settings = $this->merge_settings( $existing_settings, $unparsed['settings'] );

		$request = new WP_REST_Request( 'POST', '/mbb/save' );
		$request->set_param( 'post_id', $post_id );
		$request->set_param( 'post_title', $title );
		$request->set_param( 'post_name', $slug );
		$request->set_param( 'fields', $fields );
		$request->set_param( 'settings', $settings );

		$save   = new Save();
		$result = $save->save( $request );

		if ( ! empty( $unparsed['status'] ) && ! empty( $result['success'] ) && $unparsed['status'] !== 'publish' ) {
			wp_update_post( [
				'ID'          => $post_id,
				'post_status' => $unparsed['status'],
			] );
		}

		return array_merge( $result, [ 'id' => $post_id ] );
	}

	public function delete_field_group( array $input ): array {
		$post = get_post( $input['id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return [
				'success' => false,
				'message' => __( 'Field group not found.', 'meta-box-builder' ),
			];
		}

		$force  = $input['force'] ?? false;
		$result = wp_delete_post( $post->ID, $force );

		if ( ! $result ) {
			return [
				'success' => false,
				'message' => __( 'Failed to delete field group.', 'meta-box-builder' ),
			];
		}

		return [
			'success' => true,
			'message' => $force
				? __( 'Field group permanently deleted.', 'meta-box-builder' )
				: __( 'Field group moved to trash.', 'meta-box-builder' ),
		];
	}

	public function list_fields( array $input ): array {
		$post = get_post( $input['field_group_id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return new WP_Error( 'not_found', __( 'Field group not found.', 'meta-box-builder' ) );
		}

		$fields   = get_post_meta( $post->ID, 'fields', true ) ?: [];
		$settings = get_post_meta( $post->ID, 'settings', true ) ?: [];

		return [
			'fields'   => array_values( $fields ),
			'settings' => $settings,
		];
	}

	public function get_field( array $input ): array {
		$post = get_post( $input['field_group_id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return new WP_Error( 'not_found', __( 'Field group not found.', 'meta-box-builder' ) );
		}

		$fields = get_post_meta( $post->ID, 'fields', true ) ?: [];
		foreach ( $fields as $field ) {
			if ( ( $field['id'] ?? '' ) === $input['field_id'] ) {
				return [ 'field' => $field ];
			}
		}

		return new WP_Error( 'not_found', __( 'Field not found.', 'meta-box-builder' ) );
	}

	public function create_field( array $input ): array {
		$post = get_post( $input['field_group_id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return [
				'success' => false,
				'message' => __( 'Field group not found.', 'meta-box-builder' ),
			];
		}

		$field_data = $this->unparse_field( $input['field'] );
		if ( empty( $field_data['id'] ) || empty( $field_data['type'] ) ) {
			return [
				'success' => false,
				'message' => __( 'Field must have id and type.', 'meta-box-builder' ),
			];
		}

		$fields   = get_post_meta( $post->ID, 'fields', true ) ?: [];
		$settings = get_post_meta( $post->ID, 'settings', true ) ?: [];

		foreach ( $fields as $f ) {
			if ( ( $f['id'] ?? '' ) === $field_data['id'] ) {
				return [
					'success' => false,
					'message' => __( 'Field with this ID already exists. Use update field instead.', 'meta-box-builder' ),
				];
			}
		}

		$fields[] = $field_data;
		Save::parse( $post, $fields, $settings );

		return [
			'success' => true,
			'message' => __( 'Field added successfully.', 'meta-box-builder' ),
		];
	}

	public function update_field( array $input ): array {
		$post = get_post( $input['field_group_id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return [
				'success' => false,
				'message' => __( 'Field group not found.', 'meta-box-builder' ),
			];
		}

		$field_data = $this->unparse_field( $input['field'] );
		$field_id   = $input['field_id'];

		$fields   = get_post_meta( $post->ID, 'fields', true ) ?: [];
		$settings = get_post_meta( $post->ID, 'settings', true ) ?: [];

		$found = false;
		foreach ( $fields as &$f ) {
			if ( ( $f['id'] ?? '' ) === $field_id ) {
				$f     = array_merge( $f, $field_data );
				$found = true;
				break;
			}
		}
		unset( $f );

		if ( ! $found ) {
			return [
				'success' => false,
				'message' => __( 'Field not found. Use create field instead.', 'meta-box-builder' ),
			];
		}

		Save::parse( $post, $fields, $settings );

		return [
			'success' => true,
			'message' => __( 'Field updated successfully.', 'meta-box-builder' ),
		];
	}

	public function delete_field( array $input ): array {
		$post = get_post( $input['field_group_id'] );
		if ( ! $post || $post->post_type !== 'meta-box' ) {
			return [
				'success' => false,
				'message' => __( 'Field group not found.', 'meta-box-builder' ),
			];
		}

		$fields   = get_post_meta( $post->ID, 'fields', true ) ?: [];
		$settings = get_post_meta( $post->ID, 'settings', true ) ?: [];

		$original_count = count( $fields );
		$fields         = array_values( array_filter( $fields, function ( $f ) use ( $input ) {
			return ( $f['id'] ?? '' ) !== $input['field_id'];
		} ) );

		if ( count( $fields ) === $original_count ) {
			return [
				'success' => false,
				'message' => __( 'Field not found.', 'meta-box-builder' ),
			];
		}

		Save::parse( $post, $fields, $settings );

		return [
			'success' => true,
			'message' => __( 'Field deleted successfully.', 'meta-box-builder' ),
		];
	}

	/**
	 * Helpers.
	 */
	public function permission_callback(): bool {
		return current_user_can( 'manage_options' );
	}

	private function is_database_only( \WP_Post $post ): bool {
		if ( ! LocalJson::is_enabled() ) {
			return true;
		}

		$json = JsonService::get_json( [
			'id'        => $post->post_name,
			'post_type' => $post->post_type,
		] );

		return empty( $json );
	}

	private function build_field_group_summary( \WP_Post $post ): array {
		$fields = get_post_meta( $post->ID, 'fields', true ) ?: [];

		return [
			'id'          => $post->ID,
			'title'       => $post->post_title,
			'slug'        => $post->post_name,
			'status'      => $post->post_status,
			'field_count' => count( $fields ),
			'created_at'  => $post->post_date,
			'modified_at' => $post->post_modified,
		];
	}

	private function build_field_group_response( \WP_Post $post ): array {
		$summary = $this->build_field_group_summary( $post );

		return array_merge( $summary, [
			'fields'   => array_values( get_post_meta( $post->ID, 'fields', true ) ?: [] ),
			'settings' => get_post_meta( $post->ID, 'settings', true ) ?: [],
		] );
	}

	/**
	 * Unparse input data from parsed format to builder format.
	 *
	 * Accepts input in the schema format (https://github.com/wpmetabox/schema/blob/main/field-group.json)
	 * and converts it to the builder format used internally.
	 */
	private function unparse_input( array $input ): array {
		$unparser = new MetaBox( $input );
		$unparser->unparse();

		$settings = $unparser->get_settings();

		return [
			'title'    => $settings['post_title'] ?? $input['title'] ?? '',
			'slug'     => $settings['post_name'] ?? $input['slug'] ?? '',
			'fields'   => $settings['fields'] ?? $input['fields'] ?? [],
			'settings' => $settings['settings'] ?? $input['settings'] ?? [],
			'status'   => $settings['post_status'] ?? $input['status'] ?? 'publish',
		];
	}

	/**
	 * Unparse a single field from parsed format to builder format.
	 */
	private function unparse_field( array $field ): array {
		$unparser = new FieldUnparser( $field );
		$unparser->unparse();

		return $unparser->get_settings();
	}

	/**
	 * Merge new settings into existing settings recursively.
	 *
	 * Existing keys not in the new settings are preserved.
	 * Nested arrays are merged recursively.
	 */
	private function merge_settings( array $existing, array $new ): array {
		foreach ( $new as $key => $value ) {
			if ( is_array( $value ) && isset( $existing[ $key ] ) && is_array( $existing[ $key ] ) ) {
				$existing[ $key ] = $this->merge_settings( $existing[ $key ], $value );
			} else {
				$existing[ $key ] = $value;
			}
		}

		return $existing;
	}

	/**
	 * Merge new fields into existing fields by ID.
	 *
	 * Existing fields not in the new list are preserved.
	 * Fields with matching IDs are updated.
	 * New fields are appended.
	 */
	private function merge_fields( array $existing, array $new ): array {
		if ( empty( $new ) ) {
			return $existing;
		}

		$new_by_id = [];
		foreach ( $new as $field ) {
			$id = $field['_id'] ?? $field['id'] ?? '';
			if ( $id ) {
				$new_by_id[ $id ] = $field;
			}
		}

		$merged = [];
		foreach ( $existing as $field ) {
			$id = $field['_id'] ?? $field['id'] ?? '';
			if ( isset( $new_by_id[ $id ] ) ) {
				$merged[] = $new_by_id[ $id ];
				unset( $new_by_id[ $id ] );
			} else {
				$merged[] = $field;
			}
		}

		// Append remaining new fields.
		foreach ( $new_by_id as $field ) {
			$merged[] = $field;
		}

		return $merged;
	}
}
