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
		$force_delete = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Force delete', 'meta-box-builder' ),
				'tooltip' => __( 'Delete files from the Media Library when deleting them from post meta', 'meta-box-builder' ),
			],
		];
		$max_status = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Show status', 'meta-box-builder' ),
				'tooltip' => __( 'Display how many files uploaded/remaining', 'meta-box-builder' ),
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
		$step = [
			'component' => 'Input',
			'props'     => [
				'label'   => __( 'Step', 'meta-box-builder' ),
				'tooltip' => __( "Set the increments at which a numeric value can be set. It can be the string 'any' (for floating numbers) or a positive number.", 'meta-box-builder' ),
			],
		];
		$inline = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Inline', 'meta-box-builder' ),
				'tooltip' => __( 'Display choices on a single line', 'meta-box-builder' ),
			],
		];
		$multiple = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Multiple', 'meta-box-builder' ),
				'tooltip' => __( 'Allow to select multiple choices', 'meta-box-builder' ),
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
		$field_type = [
			'component' => 'Select',
			'props'     => [
				'label' => __( 'Field type', 'meta-box-builder' ),
				'options' => [
					'select'          => __( 'Select', 'meta-box-builder' ),
					'select_advanced' => __( 'Select advanced', 'meta-box-builder' ),
					'select_tree'     => __( 'Select tree', 'meta-box-builder' ),
					'checkbox_list'   => __( 'Checkbox list', 'meta-box-builder' ),
					'checkbox_tree'   => __( 'Checkbox tree', 'meta-box-builder' ),
					'radio_list'      => __( 'Radio list', 'meta-box-builder' ),
				],
			],
			'default' => 'select_advanced',
		];
		$taxonomy = [
			'component' => 'Select',
			'props'     => [
				'label'    => __( 'Taxonomy', 'meta-box-builder' ),
				'options'  => $this->get_taxonomies(),
				'multiple' => true,
			],
			'default' => []
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
		$upload_settings = compact( 'max_file_uploads', 'max_status', 'force_delete' );
		$clone_settings = compact( 'clone', 'sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button' );

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
				'general' => array_merge( [
					'id'                => $id,
					'type'              => 'text',
					'name'              => $name,
					'desc'              => $desc,
					'std'               => $std,
					'placeholder'       => $placeholder,
					'size'              => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'number' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'number',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'min'         => $min,
					'max'         => $max,
					'step'        => $step,
					'placeholder' => $placeholder,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'url' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'url',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'email' => [
				'general' => array_merge( [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'email',
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'range' => [
				'general' => array_merge( [
					'id'    => $id,
					'name'  => $name,
					'type'  => 'range',
					'desc'  => $desc,
					'std'   => $std,
					'min'   => $min,
					'max'   => $max,
					'step'  => $step,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'text_list' => [
				'general' => array_merge( [
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
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'checkbox' => [
				'general' => array_merge( [
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
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'checkbox_list' => [
				'general' => array_merge( [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'checkbox_list',
					'desc'    => $desc,
					'options' => $options,
					'std'     => $std_textarea,
					'inline'  => $inline,
				], $clone_settings ),
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
				],
				'advanced' => $advanced,
			],
			'radio' => [
				'general' => array_merge( [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'radio',
					'desc'    => $desc,
					'options' => $options,
					'inline'  => $inline,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'select' => [
				'general' => array_merge( [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'select',
					'desc'        => $desc,
					'options'     => $options,
					'std'         => $std,
					'placeholder' => $placeholder,
					'multiple'    => $multiple,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'select_advanced' => [
				'general' => array_merge( [
					'id'          => $id,
					'name'        => $name,
					'type'        => 'select_advanced',
					'desc'        => $desc,
					'options'     => $options,
					'std'         => $std,
					'placeholder' => $placeholder,
					'multiple'    => $multiple,
					'js_options'  => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://select2.org/configuration',
							'label' => __( 'Select2 options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'textarea' => [
				'general' => array_merge( [
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
				], $clone_settings ),
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
				'general' => array_merge( [
					'id'       => $id,
					'type'     => 'image_select',
					'name'     => $name,
					'desc'     => $desc,
					'std'      => $std,
					'options'  => $options,
					'multiple' => $multiple,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'color' => [
				'general' => array_merge( [
					'id'    => $id,
					'name'  => $name,
					'type'  => 'color',
					'desc'  => $desc,
					'std'   => $std,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'oembed' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'oembed',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'slider' => [
				'general' => array_merge( [
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
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/slider',
							'label' => __( 'jQueryUI slider options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'wysiwyg' => [
				'general' => array_merge( [
					'id'      => $id,
					'name'    => $name,
					'type'    => 'wysiwyg',
					'desc'    => $desc,
					'std'     => $std_textarea,
					'raw'     => [
						'component' => 'Checkbox',
						'props'     => [
							'label' => __( 'Save data in the raw format', 'meta-box-builder' ),
						],
					],
					'options' => [
						'component' => 'KeyValue',
						'props'     => [
							'link'  => 'https://developer.wordpress.org/reference/functions/wp_editor/',
							'label' => __( 'Editor options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'autocomplete' => [
				'general' => array_merge( [
					'id'      => $id,
					'type'    => 'autocomplete',
					'name'    => $name,
					'desc'    => $desc,
					'options' => $options,
					'size'    => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'fieldset_text' => [
				'general' => array_merge( [
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
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'map' => [
				'general' => array_merge( [
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
					'api_key'       => [
						'component' => 'Input',
						'props'     => [
							'label'    => '<a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopenner noreferrer">' . __( 'Google Maps API key', 'meta-box-builder' ) . '</a>',
							'tooltip'  => __( 'The ID of address field. For multiple fields, separate them by comma.' ),
							'required' => true,
						],
					],
					'address_field' => [
						'component' => 'Input',
						'props'     => [
							'label'    => __( 'Address field', 'meta-box-builder' ),
							'tooltip'  => __( 'The ID of address field. For multiple fields, separate them by comma.' ),
							'required' => true,
						],
					],
					'region'        => [
						'component' => 'Input',
						'props'     => [
							'label'    => '<a href="https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Country_code_top-level_domains" target="_blank" rel="noopenner noreferrer">' . __( 'Region code', 'meta-box-builder' ) . '</a>',
							'tooltip'  => __( 'The region code, specified as a country code top-level domain. Use for autocompleting addresses.' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'group' => [
				'general' => array_merge( [
					'id'    => $id,
					'type'  => 'group',
					'name'  => $name,
					'desc'  => $desc,
				], $clone_settings ),
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
				'general' => array_merge( [
					'id'         => $id,
					'type'       => 'date',
					'name'       => $name,
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'inline'     => $inline_date,
					'timestamp'  => $timestamp,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'datetime' => [
				'general' => array_merge( [
					'id'         => $id,
					'type'       => 'datetime',
					'name'       => $name,
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'inline'     => $inline_date,
					'timestamp'  => $timestamp,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'https://api.jqueryui.com/datepicker/',
							'label' => __( 'Date picker options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'time' => [
				'general' => array_merge( [
					'id'         => $id,
					'name'       => $name,
					'type'       => 'time',
					'desc'       => $desc,
					'std'        => $std,
					'size'       => $size,
					'js_options' => [
						'component' => 'KeyValue',
						'props' => [
							'link'  => 'http://trentrichardson.com/examples/timepicker',
							'label' => __( 'Time picker options', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'post' => [
				'general' => array_merge( [
					'id'         => $id,
					'type'       => 'post',
					'name'       => $name,
					'desc'       => $desc,
					'post_type'  => [
						'component' => 'Select',
						'props'     => [
							'label'    => __( 'Post types', 'meta-box-builder' ),
							'options'  => $this->get_post_types(),
							'multiple' => true,
						],
						'default' => [],
					],
					'field_type' => $field_type,
					'parent'     => [
						'component' => 'Checkbox',
						'props'     => [
							'label'   => __( 'Set as parent', 'meta-box-builder' ),
							'tooltip' => __( 'Set the selected post as the parent for the current being edited post.', 'meta-box-builder' ),
						],
					],
					'placeholder' => $placeholder,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/classes/wp_query/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting posts. Same as in the WP_Query class.', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'taxonomy' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'taxonomy',
					'name'        => $name,
					'desc'        => $desc,
					'taxonomy'    => $taxonomy,
					'field_type'  => $field_type,
					'placeholder' => $placeholder,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'taxonomy_advanced' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'taxonomy_advanced',
					'name'        => $name,
					'desc'        => $desc,
					'taxonomy'    => $taxonomy,
					'field_type'  => $field_type,
					'placeholder' => $placeholder,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'user' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'user',
					'name'        => $name,
					'desc'        => $desc,
					'field_type'  => $field_type,
					'placeholder' => $placeholder,
					'query_args'  => [
						'component' => 'KeyValue',
						'props'     => [
							'link'    => 'https://codex.wordpress.org/Function_Reference/get_users',
							'label'   => __( 'Query args', 'meta-box-builder' ),
							'tooltip' => __( 'Query arguments for getting user. Same as in the get_user() function.', 'meta-box-builder' ),
						],
					],
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'file' => [
				'general' => array_merge( [
					'id'               => $id,
					'type'             => 'file',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete'     => $force_delete,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'file_input' => [
				'general' => array_merge( [
					'id'          => $id,
					'type'        => 'file_input',
					'name'        => $name,
					'desc'        => $desc,
					'std'         => $std,
					'placeholder' => $placeholder,
					'size'        => $size,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'file_advanced' => [
				'general' => array_merge( [
					'id'        => $id,
					'type'      => 'file_advanced',
					'name'      => $name,
					'desc'      => $desc,
					'mime_type' => [
						'component' => 'Input',
						'props'     => [
							'label'   => __( 'MIME types', 'meta-box-builder' ),
							'tooltip' => __( 'Filters items in the Media Library popup, does not restrict file types when upload.', 'meta-box-builder' ),
						],
					],
				], $upload_settings, $clone_settings ),
				'advanced' => $advanced,
			],
			'image_advanced' => [
				'general' => array_merge( [
					'id'   => $id,
					'type' => 'image_advanced',
					'name' => $name,
					'desc' => $desc,
				], $upload_settings, $clone_settings ),
				'advanced' => $advanced,
			],
			'image' => [
				'general' => array_merge( [
					'id'               => $id,
					'type'             => 'image',
					'name'             => $name,
					'desc'             => $desc,
					'max_file_uploads' => $max_file_uploads,
					'force_delete'     => $force_delete,
				], $clone_settings ),
				'advanced' => $advanced,
			],
			'video' => [
				'general' => array_merge( [
					'id'   => $id,
					'type' => 'video',
					'name' => $name,
					'desc' => $desc,
				], $upload_settings, $clone_settings ),
				'advanced' => $advanced,
			]
		];
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}

	private function get_post_types() {
		$post_types = mbb_get_post_types();
		$options = [];
		foreach ( $post_types as $post_type ) {
			$options[ $post_type['slug'] ] = sprintf( '%s (%s)', $post_type['name'], $post_type['slug'] );
		}
		return $options;
	}

	private function get_taxonomies() {
		$taxonomies = mbb_get_taxonomies();
		$options = [];
		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy['slug'] ] = sprintf( '%s (%s)', $taxonomy['name'], $taxonomy['slug'] );
		}
		return $options;
	}
}