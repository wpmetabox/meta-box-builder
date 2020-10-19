<?php
namespace MBB\Api;

use WP_REST_Server;

class Fields {
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		$methods = get_class_methods( $this );
		$methods = array_diff( $methods, [ '__construct', 'register_routes', 'register_route' ] );
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

	public function get_field_types() {
		return [
			'Basic' => [
				'button' => 'Button',
				// button_group
				'checkbox'        => 'Checkbox',
				'checkbox_list'   => 'Checkbox List',
				'email'           => 'Email',
				'hidden'          => 'Hidden',
				'number'          => 'Number',
				'password'        => 'Password',
				'radio'           => 'Radio',
				'range'           => 'Range',
				'select'          => 'Select',
				'select_advanced' => 'Select Advanced',
				'text'            => 'Text',
				'textarea'        => 'Textarea',
				'url'             => 'URL',
			],
			'Advanced' => [
				'autocomplete' => 'Autocomplete',
				// background
				'color' => 'Color Picker',
				// custom_html
				'date'          => 'Date',
				'datetime'      => 'Date Time',
				'fieldset_text' => 'Fieldset Text',
				'map'           => 'Google Maps',
				// key_value
				'image_select' => 'Image Select',
				'oembed' => 'oEmbed',
				// osm
				'slider' => 'Slider',
				// switch
				'text_list' => 'Text List',
				'time' => 'Time',
				'wysiwyg' => 'WYSIWYG',
			],
			'WordPress' => [
				'post' => 'Post',
				// sidebar
				'taxonomy'          => 'Taxonomy',
				'taxonomy_advanced' => 'Taxonomy Advanced',
				'user'              => 'User',
			],
			'Upload' => [
				'file' => 'File',
				'file_advanced' => 'File Advanced',
				// file_upload
				'file_input'     => 'File Input',
				'image'          => 'Image',
				'image_advanced' => 'Image Advanced',
				// image_upload
				// single_image
				'video' => 'Video',
			],
			'Layout' => [
				'divider' => 'Divider',
				'heading' => 'Heading',
				'group'   => 'Group',
			],
		];
	}

	public function get_fields() {
		// General tab.
		$id = [
			'component' => 'Input',
			'props'     => [
				'label'    => __( 'ID', 'meta-box-builder' ),
				'required' => true,
				'tooltip'  => __( 'Must be unique, will be used as meta key when saving to the database. Recommended to use only lowercase letters, numbers, and underscores.', 'meta-box-builder' ),
			],
		];
		$name = [
			'component' => 'Name',
			'props'     => [
				'label'   => __( 'Label', 'meta-box-builder' ),
				'tooltip' => __( 'Optional. Leave empty to make the input 100% width.', 'meta-box-builder' ),
			],
		];
		$std = [
			'component' => 'Input',
			'props'     => [
				'label' => __( 'Default value', 'meta-box-builder' ),
			],
		];
		$std_textarea = [
			'component' => 'Textarea',
			'props'     => [
				'label' => __( 'Default value' ),
			],
		];
		$desc = [
			'component' => 'Input',
			'props'     => [
				'label' => __( 'Description', 'meta-box-builder' ),
			],
		];
		$size = [
			'component' => 'Input',
			'props'     => [
				'type'  => 'number',
				'label' => __( 'Size of the input box', 'meta-box-builder' ),
			],
		];
		$placeholder = [
			'component' => 'Input',
			'props'     => [
				'label' => __( 'Placeholder', 'meta-box-builder' ),
			],
		];
		$max_file_uploads = [
			'component' => 'Input',
			'props'     => [
				'type'    => 'number',
				'label'   => __( 'Maximum number of files', 'meta-box-builder' ),
				'tooltip' => __( 'Leave empty for unlimited uploads', 'meta-box-builder' ),
			],
		];
		$inline_date = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Inline', 'meta-box-builder' ),
				'tooltip' => __( 'Display the date picker inline with the input. Do not require to click the input field to trigger the date picker.', 'meta-box-builder' ),
			],
		];
		$min = [
			'component' => 'Input',
			'props'     => [
				'type'  => 'number',
				'label' => __( 'Minumum value', 'meta-box-builder' ),
			],
		];
		$max = [
			'component' => 'Input',
			'props'     => [
				'type'  => 'number',
				'label' => __( 'Maximum value', 'meta-box-builder' ),
			],
		];
		$timestamp = [
			'component' => 'Checkbox',
			'props'     => [
				'label' => __( 'Save value as timestamp', 'meta-box-builder' ),
			],
		];
		$options = [
			'component' => 'Textarea',
			'props'     => [
				'label'   => __( 'Choices', 'meta-box-builder' ),
				'tooltip' => __( "Enter each choice on a line. For more control, you may specify both a value and label like 'red: Red' (without quotes)", 'meta-box-builder' ),
			],
		];
		$clone = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Cloneable', 'meta-box-builder' ),
				'tooltip' => __( 'Make field cloneable (repeatable)', 'meta-box-builder' ),
				'setting' => 'clone',
			],
		];
		$sort_clone = [
			'component' => 'Checkbox',
			'props'     => [
				'label'     => __( 'Sortable', 'meta-box-builder' ),
				'tooltip'   => __( 'Allows to drag-and-drop reorder clones', 'meta-box-builder' ),
				'className' => 'clone-setting',
			],
		];
		$clone_default = [
			'component' => 'Checkbox',
			'props'     => [
				'label'     => __( 'Clone default value', 'meta-box-builder' ),
				'className' => 'clone-setting',
			],
		];
		$clone_as_multiple = [
			'component' => 'Checkbox',
			'props'     => [
				'label'     => __( 'Clone as multiple', 'meta-box-builder' ),
				'tooltip'   =>  __( 'Save clones in multiple rows in the database', 'meta-box-builder' ),
				'className' => 'clone-setting',
			],
		];
		$max_clone = [
			'component' => 'Input',
			'props'     => [
				'type'      => 'number',
				'label'     => __( 'Maximum number of clones', 'meta-box-builder' ),
				'tooltip'   => __( 'Leave empty for unlimited clones', 'meta-box-builder' ),
				'className' => 'clone-setting',
			],
		];
		$add_button = [
			'component' => 'Input',
			'props'     => [
				'label'     => __( 'Add more text', 'meta-box-builder' ),
				'tooltip'   => __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ),
				'className' => 'clone-setting',
			],
		];

		// Advanced tab.
		$before = [
			'component' => 'Textarea',
			'props'     => [
				'label'   => __( 'Before', 'meta-box-builder' ),
				'tooltip' => __( 'Custom HTML displayed before the field output', 'meta-box-builder' ),
			],
		];
		$after = [
			'component' => 'Textarea',
			'props'     => [
				'label'   => __( 'After', 'meta-box-builder' ),
				'tooltip' => __( 'Custom HTML displayed after the field output', 'meta-box-builder' ),
			],
		];
		$class = [
			'component' => 'Input',
			'props'     => [
				'label' => __( 'Custom CSS class', 'meta-box-builder' ),
			],
		];
		$attributes = [
			'component' => 'KeyValue',
			'props'     => [
				'link'  => 'https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes',
				'label' => __( 'Custom settings', 'meta-box-builder' ),
			],
		];
		$advanced = compact( 'before', 'after', 'class', 'attributes' );

		return [
			'text' => [
				'general' => [
					'id'                => $id,
					'type'              => 'text',
					'name'              => $name,
					'desc'              => $desc,
					'std'               => $std,
					'placeholder'       => $placeholder,
					'size'              => $size,
					'clone'             => $clone,
					'sort_clone'        => $sort_clone,
					'clone_default'     => $clone_default,
					'clone_as_multiple' => $clone_as_multiple,
					'max_clone'         => $max_clone,
					'add_button'        => $add_button,
				],
				'advanced' => $advanced,
			],
			'number' => [
				'general' => [
					'id'          => $id,
					'type'        => 'number',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'min'         => $min,
					'max'         => $max,
					'step'        => '',
					'placeholder' => $placeholder,
					'clone'       => $clone,
				],
				'advanced' => $advanced,
			],
			'url' => [
				'general' => [
					'id'          => $id,
					'type'        => 'url',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
					'clone'       => $clone
				],
				'advanced' => $advanced,
			],
			'email' => [
				'general' => [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'email',
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
					'clone'       => $clone
				],
				'advanced' => $advanced,
			],
			'range' => [
				'general' => [
					'id'    => $id,
					'name'  => $name,
					'type'  => 'range',
					'desc'  => $desc,
					'std'   => $std,
					'min'   => $min,
					'max'   => $max,
					'step'  => 1,
					'clone' => $clone
				],
				'advanced' => $advanced,
			],
			'text_list' => [
				'general' => [
					'id'      => $id,
					'type'    => 'text_list',
					'name'    => $name,
					'desc'    => $desc,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'label'            => __( 'Inputs', 'meta-box-builder' ),
							'keyPlaceholder'   => __( 'Placeholder', 'meta-box-builder' ),
							'valuePlaceholder' => __( 'Label', 'meta-box-builder' ),
						],
					],
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'checkbox' => [
				'general' => [
					'id'   => $id,
					'name' => $name,
					'type' => 'checkbox',
					'desc' => $desc,
					'std'  => [
						'component' => 'Checkbox',
						'props'     => [
							'label' => __( 'Checked by default', 'meta-box-builder' ),
						],
					],
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'checkbox_list' => [
				'general' => [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'checkbox_list',
					'desc'    => $desc,
					'options' => $options,
					'std'     => $std_textarea,
					'clone'   => $clone,
				],
				'advanced' => $advanced,
			],
			'button' => [
				'general' => [
					'id'   => $id,
					'type' => 'button',
					'name' => $name,
					'desc' => $desc,
					'std'  => [
						'component' => 'Input',
						'props'     => [
							'label' => __( 'Button text', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'password' => [
				'general' => [
					'id'          => $id,
					'type'        => 'password',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
					'clone'       => $clone,
				],
				'advanced' => $advanced,
			],
			'radio' => [
				'general' => [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'radio',
					'desc'    => $desc,
					'options' => $options,
					'inline'  => true,
					'clone'   => $clone,
				],
				'advanced' => $advanced,
			],
			'select' => [
				'general' => [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'select',
					'desc'        => $desc,
					'options'     => $options,
					'std'         => $std,
					'placeholder' => $placeholder,
					'multiple'    => false,
					'clone'       => $clone,
				],
				'advanced' => $advanced,
			],
			'select_advanced' => [
				'general' => [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'select_advanced',
					'desc'        => $desc,
					'options'     => $options,
					'std'         => $std,
					'placeholder' => $placeholder,
					'multiple'    => false,
					'clone'       => $clone,
					'js_options'  => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://select2.org/configuration',
							'label' => __( 'Select2 options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'textarea' => [
				'general' => [
					'id'          => $id,
					'type'        => 'textarea',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std_textarea,
					'placeholder' => $placeholder,
					'rows'        => [
						'component' => 'Input',
						'props'     => [
							'type'  => 'number',
							'label' => __( 'Rows', 'meta-box-builder' ),
						],
					],
					'cols' => [
						'component' => 'Input',
						'props'     => [
							'type'  => 'number',
							'label' => __( 'Columns', 'meta-box-builder' ),
						],
					],
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'hidden' => [
				'general' => [
					'id'   => $id,
					'type' => 'hidden',
					'std'  => $std,
				],
				'advanced' => $advanced,
			],
			'image_select' => [
				'general' => [
					'id'       => $id,
					'type'     => 'image_select',
					'name'     => $name,
					'desc'     => $desc,
					'std'      => $std,
					'options'  => $options,
					'multiple' => false,
					'clone'    => $clone,
				],
				'advanced' => $advanced,
			],
			'color' => [
				'general' => [
					'id'    => $id,
					'name'  => $name,
					'type'  => 'color',
					'desc'  => $desc,
					'std'   => $std,
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'oembed' => [
				'general' => [
					'id'          => $id,
					'type'        => 'oembed',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
					'clone'       => $clone,
				],
				'advanced' => $advanced,
			],
			'slider' => [
				'general' => [
					'id'     => $id,
					'type'   => 'slider',
					'name'   => $name,
					'desc'   => $desc,
					'std'    => $std,
					'prefix' => [
						'component' => 'Input',
						'props'     => [
							'label'   => __( 'Prefix', 'meta-box-builder' ),
							'tooltip' => __( 'Text displayed before the field value', 'meta-box-builder' ),
						],
					],
					'suffix' => [
						'component' => 'Input',
						'props'     => [
							'label'   => __( 'Suffix', 'meta-box-builder' ),
							'tooltip' => __( 'Text displayed after the field value', 'meta-box-builder' ),
						],
					],
					'clone'      => $clone,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/slider',
							'label' => __( 'jQueryUI slider options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'wysiwyg' => [
				'general' => [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'wysiwyg',
					'desc'    => $desc,
					'std'     => $std_textarea,
					'raw'     => false,
					'clone'   => $clone,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'link'  => 'https://developer.wordpress.org/reference/functions/wp_editor/',
							'label' => __( 'Editor options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'autocomplete' => [
				'general' => [
					'id'      => $id,
					'type'    => 'autocomplete',
					'name'    => $name,
					'desc'    => $desc,
					'options' => $options,
					'size'    => $size,
					'clone'   => $clone,
				],
				'advanced' => $advanced,
			],
			'fieldset_text' => [
				'general' => [
					'id'      => $id,
					'type'    => 'fieldset_text',
					'name'    => $name,
					'desc'    => $desc,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'label'            => __( 'Inputs', 'meta-box-builder' ),
							'valuePlaceholder' => __( 'Enter label', 'meta-box-builder' ),
						],
					],
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'map' => [
				'general' => [
					'id'   => $id,
					'type' => 'map',
					'name' => $name,
					'desc' => $desc,
					'std'  => [
						'component' => 'Input',
						'props'     => [
							'label'   => __( 'Default location', 'meta-box-builder' ),
							'tooltip' => __( 'Format: latitude,longitude[, zoom]. Zoom is optional.', 'meta-box-builder' ),
						],
					],
					'api_key'       => '',
					'address_field' => '',
					'region'        => '',
					'clone'         => $clone,
				],
				'advanced' => $advanced,
			],
			'group' => [
				'general' => [
					'id'    => $id,
					'type'  => 'group',
					'name'  => $name,
					'desc'  => $desc,
					'clone' => $clone,
				],
				'advanced' => $advanced,
			],
			'heading' => [
				'general' => [
					'type' => 'heading',
					'name' => $name,
					'desc' => $desc,
				],
				'advanced' => $advanced,
			],
			'divider' => [
				'general' => [
					'type'   => 'divider',
					'before' => $before,
					'after'  => $after,
				]
			],
			'date' => [
				'general' => [
					'id'         => $id,
					'type'       => 'date',
					'name'       => $name,
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'inline'     => $inline_date,
					'timestamp'  => $timestamp,
					'clone'      => $clone,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'datetime' => [
				'general' => [
					'id'         => $id,
					'type'       => 'datetime',
					'name'       => $name,
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'inline'     => $inline_date,
					'timestamp'  => $timestamp,
					'clone'      => $clone,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'time' => [
				'general' => [
					'id'         => $id,
					'name'       => $name,
					'type'       => 'time',
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'clone'      => $clone,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'http://trentrichardson.com/examples/timepicker',
							'label' => __( 'Time picker options', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'post' => [
				'general' => [
					'id'         => $id,
					'type'       => 'post',
					'name'       => $name,
					'desc'       => $desc,
					'post_type'  => 'post',
					'field_type' => 'select_advanced',
					'parent'     => [
						'component' => 'Checkbox',
						'props'     => [
							'label'   => __( 'Set as parent', 'meta-box-builder' ),
							'tooltip' => __( 'Set the selected post as the parent for the current being edited post.', 'meta-box-builder' ),
						],
					],
					'placeholder' => $placeholder,
					'clone'       => $clone,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/classes/wp_query/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting posts. Same as in the WP_Query class.', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'taxonomy' => [
				'general' => [
					'id'          => $id,
					'type'        => 'taxonomy',
					'name'        => $name,
					'desc'        => $desc,
					'taxonomy'    => 'category',
					'field_type'  => 'select_advanced',
					'placeholder' => $placeholder,
					'clone'       => $clone,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'taxonomy_advanced' => [
				'general' => [
					'id'          => $id,
					'type'        => 'taxonomy_advanced',
					'name'        => $name,
					'desc'        => $desc,
					'taxonomy'    => 'category',
					'field_type'  => 'select_advanced',
					'placeholder' => $placeholder,
					'clone'       => $clone,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'user' => [
				'general' => [
					'id'          => $id,
					'type'        => 'user',
					'name'        => $name,
					'desc'        => $desc,
					'field_type'  => 'select_advanced',
					'placeholder' => $placeholder,
					'clone'       => $clone,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://codex.wordpress.org/Function_Reference/get_users',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting user. Same as in the get_user() function.', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => $advanced,
			],
			'file' => [
				'general' => [
					'id'               => $id,
					'type'             => 'file',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete'     => false,
					'clone'            => $clone,
				],
				'advanced' => $advanced,
			],
			'file_input' => [
				'general' => [
					'id'          => $id,
					'type'        => 'file_input',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
					'clone'       => $clone,
				],
				'advanced' => $advanced,
			],
			'file_advanced' => [
				'general' => [
					'id'               => $id,
					'type'             => 'file_advanced',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'mime_type'        => '',
					'max_status'       => true,
					'force_delete'     => false,
					'clone'            => $clone,
				],
				'advanced' => $advanced,
			],
			'image_advanced' => [
				'general' => [
					'id'               => $id,
					'type'             => 'image_advanced',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'max_status'       => false,
					'force_delete'     => false,
					'clone'            => $clone,
				],
				'advanced' => $advanced,
			],
			'image' => [
				'general' => [
					'id'               => $id,
					'type'             => 'image',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete'     => false,
					'clone'            => $clone,
				],
				'advanced' => $advanced,
			],
			'video' => [
				'general' => [
					'id'               => $id,
					'type'             => 'video',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => 4,
					'max_status'       => false,
					'force_delete'     => false,
					'clone'            => $clone,
				],
				'advanced' => $advanced,
			]
		];
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}
}