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

		return [
			'text' => [
				'general' => [
					'id' => $id,
					'type'              => 'text',
					'name'              => 'Text',
					'desc' => $desc,
					'std'               => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone'             => false,
					'sort_clone'        => false,
					'clone_default'     => false,
					'clone_as_multiple' => false,
					'max_clone'         => '',
					'add_button'        => ''
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'number' => [
				'general' => [
					'id' => $id,
					'type' => 'number',
					'name' => 'Number',
					'desc' => $desc,
					'std' => $std,
					'min' => $min,
					'max' => $max,
					'step' => '',
					'placeholder' => $placeholder,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'url' => [
				'general' => [
					'id' => $id,
					'type' => 'url',
					'name' => 'URL',
					'desc' => $desc,
					'std' => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'email' => [
				'general' => [
					'id' => $id,
					'name' => 'Email',
					'type' => 'email',
					'desc' => $desc,
					'std' => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'range' => [
				'general' => [
					'id' => $id,
					'name' => 'Range',
					'type' => 'range',
					'desc' => $desc,
					'std' => $std,
					'min' => $min,
					'max' => $max,
					'step' => 1,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'text_list' => [
				'general' => [
					'id' => $id,
					'type' => 'text_list',
					'name' => 'Text List',
					'desc' => $desc,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'label'            => __( 'Inputs', 'meta-box-builder' ),
							'keyPlaceholder'   => __( 'Placeholder', 'meta-box-builder' ),
							'valuePlaceholder' => __( 'Label', 'meta-box-builder' ),
						],
					],
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'checkbox' => [
				'general' => [
					'id' => $id,
					'name' => 'Checkbox',
					'type' => 'checkbox',
					'desc' => $desc,
					'std' => [
						'component' => 'Checkbox',
						'props'     => [
							'label' => __( 'Checked by default', 'meta-box-builder' ),
						],
					],
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'checkbox_list' => [
				'general' => [
					'id' => $id,
					'name' => 'Checkbox List',
					'type' => 'checkbox_list',
					'desc' => $desc,
					'options' => $options,
					'std' => $std_textarea,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'button' => [
				'general' => [
					'id' => $id,
					'type' => 'button',
					'name' => 'Button',
					'desc' => $desc,
					'std' => [
						'component' => 'Input',
						'props'     => [
							'label' => __( 'Button text', 'meta-box-builder' ),
						],
					],
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'password' => [
				'general' => [
					'id' => $id,
					'type' => 'password',
					'name' => 'Password',
					'desc' => $desc,
					'std' => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'radio' => [
				'general' => [
					'id' => $id,
					'name' => 'Radio',
					'type' => 'radio',
					'desc' => $desc,
					'options' => $options,
					'inline' => true,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'select' => [
				'general' => [
					'id' => $id,
					'name' => 'Select',
					'type' => 'select',
					'desc' => $desc,
					'options' => $options,
					'std' => $std,
					'placeholder' => $placeholder,
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'select_advanced' => [
				'general' => [
					'id' => $id,
					'name' => 'Select Advanced',
					'type' => 'select_advanced',
					'desc' => $desc,
					'options' => $options,
					'std' => $std,
					'placeholder' => $placeholder,
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://select2.org/configuration',
							'label' => __( 'Select2 options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'textarea' => [
				'general' => [
					'id' => $id,
					'type' => 'textarea',
					'name' => 'Textarea',
					'desc' => $desc,
					'std' => $std_textarea,
					'placeholder' => $placeholder,
					'rows' => [
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
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'hidden' => [
				'general' => [
					'id' => $id,
					'type' => 'hidden',
					'std' => $std,
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'image_select' => [
				'general' => [
					'id' => $id,
					'type' => 'image_select',
					'name' => 'Image Select',
					'desc' => $desc,
					'std' => $std,
					'options' => $options,
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'color' => [
				'general' => [
					'id' => $id,
					'name' => 'Color Picker',
					'type' => 'color',
					'desc' => $desc,
					'std' => $std,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'oembed' => [
				'general' => [
					'id' => $id,
					'type' => 'oembed',
					'name' => 'oEmbed',
					'desc' => $desc,
					'std' => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'slider' => [
				'general' => [
					'id' => $id,
					'type' => 'slider',
					'name' => 'Slider',
					'desc' => $desc,
					'std' => $std,
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
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/slider',
							'label' => __( 'jQueryUI slider options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'wysiwyg' => [
				'general' => [
					'id' => $id,
					'name' => 'WYSIWYG',
					'type' => 'wysiwyg',
					'desc' => $desc,
					'std' => $std_textarea,
					'raw' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'link'  => 'https://developer.wordpress.org/reference/functions/wp_editor/',
							'label' => __( 'Editor options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'autocomplete' => [
				'general' => [
					'id' => $id,
					'type' => 'autocomplete',
					'name' => 'Autocomplete',
					'desc' => $desc,
					'options' => $options,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'fieldset_text' => [
				'general' => [
					'id' => $id,
					'type' => 'fieldset_text',
					'name' => 'Fieldset Text',
					'desc' => $desc,
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'label'            => __( 'Inputs', 'meta-box-builder' ),
							'valuePlaceholder' => __( 'Enter label', 'meta-box-builder' ),
						],
					],
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'map' => [
				'general' => [
					'id' => $id,
					'type' => 'map',
					'name' => 'Map',
					'desc' => $desc,
					'std' => [
						'component' => 'Input',
						'props'     => [
							'label'   => __( 'Default location', 'meta-box-builder' ),
							'tooltip' => __( 'Format: latitude,longitude[, zoom]. Zoom is optional.', 'meta-box-builder' ),
						],
					],
					'api_key' => '',
					'address_field' => '',
					'region' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'group' => [
				'general' => [
					'id' => 'group',
					'type' => 'group',
					'name' => 'Group',
					'desc' => $desc,
				],
				'advanced' => [
					'attributes' => $attributes
				]
			],
			'heading' => [
				'general' => [
					'type' => 'heading',
					'name' => 'Heading',
					'desc' => $desc,
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'divider' => [
				'general' => [
					'type' => 'divider',
					'before' => $before,
					'after' => $after,
				]
			],
			'date' => [
				'general' => [
					'id' => $id,
					'type' => 'date',
					'name' => 'Date Picker',
					'desc' => $desc,
					'std' => $std,
					'size' => $size,
					'inline' => $inline_date,
					'timestamp' => $timestamp,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'datetime' => [
				'general' => [
					'id' => $id,
					'type' => 'datetime',
					'name' => 'Date Time Picker',
					'desc' => $desc,
					'std' => $std,
					'size' => $size,
					'inline' => $inline_date,
					'timestamp' => $timestamp,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'time' => [
				'general' => [
					'id' => $id,
					'name' => 'Time Picker',
					'type' => 'time',
					'desc' => $desc,
					'std' => $std,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'http://trentrichardson.com/examples/timepicker',
							'label' => __( 'Time picker options', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'post' => [
				'general' => [
					'id' => $id,
					'type' => 'post',
					'name' => 'Post',
					'desc' => $desc,
					'post_type' => 'post',
					'field_type' => 'select_advanced',
					'parent' => [
						'component' => 'Checkbox',
						'props'     => [
							'label'   => __( 'Set as parent', 'meta-box-builder' ),
							'tooltip' => __( 'Set the selected post as the parent for the current being edited post.', 'meta-box-builder' ),
						],
					],
					'placeholder' => $placeholder,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'query_args' => [
						'component' => 'KeyValue',
						'props' => [
							'link'    => 'https://developer.wordpress.org/reference/classes/wp_query/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting posts. Same as in the WP_Query class.', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'taxonomy' => [
				'general' => [
					'id' => $id,
					'type' => 'taxonomy',
					'name' => 'Taxonomy',
					'desc' => $desc,
					'taxonomy' => 'category',
					'field_type' => 'select_advanced',
					'placeholder' => $placeholder,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'query_args' => [
						'component' => 'KeyValue',
						'props' => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'taxonomy_advanced' => [
				'general' => [
					'id' => $id,
					'type' => 'taxonomy_advanced',
					'name' => 'Taxonomy Advanced',
					'desc' => $desc,
					'taxonomy' => 'category',
					'field_type' => 'select_advanced',
					'placeholder' => $placeholder,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'query_args' => [
						'component' => 'KeyValue',
						'props' => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'user' => [
				'general' => [
					'id' => $id,
					'type' => 'user',
					'name' => 'User',
					'desc' => $desc,
					'field_type' => 'select_advanced',
					'placeholder' => $placeholder,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'query_args' => [
						'component' => 'KeyValue',
						'props' => [
							'link'    => 'https://codex.wordpress.org/Function_Reference/get_users',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting user. Same as in the get_user() function.', 'meta-box-builder' ),
						],
					],
					'attributes' => $attributes
				]
			],
			'file' => [
				'general' => [
					'id' => $id,
					'type' => 'file',
					'name' => 'File',
					'desc' => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'file_input' => [
				'general' => [
					'id' => $id,
					'type' => 'file_input',
					'name' => 'File Input',
					'desc' => $desc,
					'std' => $std,
					'placeholder' => $placeholder,
					'size' => $size,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'file_advanced' => [
				'general' => [
					'id' => $id,
					'type' => 'file_advanced',
					'name' => 'File Advanced',
					'desc' => $desc,
					'max_file_uploads' => $max_file_uploads,
					'mime_type' => '',
					'max_status' => true,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'image_advanced' => [
				'general' => [
					'id' => $id,
					'type' => 'image_advanced',
					'name' => 'Image Advanced',
					'desc' => $desc,
					'max_file_uploads' => $max_file_uploads,
					'max_status' => false,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'image' => [
				'general' => [
					'id' => $id,
					'type' => 'image',
					'name' => 'Image Upload',
					'desc' => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			],
			'video' => [
				'general' => [
					'id' => $id,
					'type' => 'video',
					'name' => 'Video',
					'desc' => $desc,
					'max_file_uploads' => 4,
					'max_status' => false,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => $before,
					'after' => $after,
					'class' => $class,
					'attributes' => $attributes
				]
			]
		];
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}
}