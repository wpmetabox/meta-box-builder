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
				'button'          => 'Button',
				'button_group'    => 'Button Group',
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
				'background'   => 'Background',
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
		$label_description = [
			'component' => 'Input',
			'props'     => [
				'label'   => __( 'Label description', 'meta-box-builder' ),
				'tooltip' => __( 'Display below the field label', 'meta-box-builder' ),
			],
		];
		$desc = [
			'component' => 'Input',
			'props'     => [
				'label'   => __( 'Input description', 'meta-box-builder' ),
				'tooltip' => __( 'Display below the field input', 'meta-box-builder' ),
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
				'tooltip' => __( "Enter each choice on a line. For more control, you may specify both value and label like 'red: Red' (without quotes)", 'meta-box-builder' ),
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
		$disabled = [
			'component' => 'Checkbox',
			'props'     => [
				'label' => __( 'Disabled', 'meta-box-builder' ),
			],
		];
		$required = [
			'component' => 'Checkbox',
			'props'     => [
				'label' => __( 'Required', 'meta-box-builder' ),
			],
		];
		$readonly = [
			'component' => 'Checkbox',
			'props'     => [
				'label' => __( 'Read-only', 'meta-box-builder' ),
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
		$save_field = [
			'component' => 'Checkbox',
			'props'     => [
				'label'   => __( 'Save field value' ),
				'tooltip' => __( 'Uncheck this checkbox to prevent the field from saving its value into the database. Useful when you want to save yourself. Note: not working in the block editor.', 'meta-box-builder' )
			],
			'default' => true,
		];
		$sanitize_callback = [
			'component' => 'Input',
			'props'     => [
				'label'   => '<a href="https://docs.metabox.io/sanitization/" target="_blank" rel="noreferrer noopener">' . __( 'Custom sanitize callback', 'meta-box-builder' ) . '</a>',
				'tooltip' => __( 'Enter PHP function name for custom sanitization. Enter "none" to disable sanitization.', 'meta-box-builder' ),
			],
		];
		$attributes = [
			'component' => 'KeyValue',
			'props'     => [
				'link'    => 'https://docs.metabox.io/custom-attributes/',
				'label'   => __( 'Custom HTML5 attributes', 'meta-box-builder' ),
				'tooltip' => __( 'Use this to add custom HTML5 attributes (like data-*). Work only for text input fields.', 'meta-box-builder' ),
			],
		];
		$custom_settings = [
			'component' => 'KeyValue',
			'props'     => [
				'link'    => 'https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes',
				'label'   => __( 'Custom settings', 'meta-box-builder' ),
				'tooltip' => __( 'Use this to add custom settings for the field. The custom settings will overwrite existing settings if they have the same key.', 'meta-box-builder' ),
			],
		];
		$general = compact( 'name', 'id', 'label_description', 'desc' );
		$advanced = compact( 'before', 'after', 'class', 'save_field', 'sanitize_callback', 'attributes', 'custom_settings' );

		return [
			'autocomplete' => [
				'general'  => array_merge( $general, compact( 'options', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'background' => [
				'general'  => array_merge( $general, $clone_settings ),
				'advanced' => $advanced,
			],
			'button' => [
				'general' => array_merge( $general, [
					'std'  => [
						'component' => 'Input',
						'props'     => [
							'label' => __( 'Button text', 'meta-box-builder' ),
						],
					],
					'disabled' => $disabled,
				] ),
				'advanced' => $advanced,
			],
			'button_group' => [
				'general'  => array_merge( $general, [
					'options' => [
						'component' => 'Textarea',
						'props'     => [
							'label'   => __( 'Buttons', 'meta-box-builder' ),
							'tooltip' => __( "Enter each button text on a line. For more control, you may specify both value and label like 'bold: B' (without quotes)", 'meta-box-builder' ),
						],
					],
					'std'    => $std,
					'inline' => [
						'component' => 'Checkbox',
						'props'     => [
							'label' => __( 'Display buttons horizontally', 'meta-box-builder' ),
						],
						'default' => true,
					],
				], compact( 'multiple', 'required' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'text' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'number' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'min', 'max', 'step', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'url' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'email' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'range' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'min', 'max', 'step' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'text_list' => [
				'general' => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general' => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'options', 'std', 'inline' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'password' => [
				'general'  => compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ),
				'advanced' => $advanced,
			],
			'radio' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'options', 'std', 'inline' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'select' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'options', 'std', 'placeholder', 'multiple' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'select_advanced' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'options', 'std', 'placeholder', 'multiple' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder' ), [
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
				'general'  => compact( 'id', 'std' ),
				'advanced' => $advanced,
			],
			'image_select' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'options', 'std', 'multiple' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'color' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'oembed' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'slider' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std' ), [
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
			'fieldset_text' => [
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'heading' => [
				'general'  => compact( 'name', 'desc' ),
				'advanced' => $advanced,
			],
			'divider' => [
				'general'  => compact( 'before', 'after' ),
			],
			'date' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'size', 'inline', 'timestamp' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'size', 'inline', 'timestamp' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'size' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'taxonomy', 'field_type', 'placeholder' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'taxonomy', 'field_type', 'placeholder' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'field_type', 'placeholder' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'max_file_uploads', 'force_delete' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'file_input' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'std', 'placeholder', 'size' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'file_advanced' => [
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), [
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
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), $upload_settings, $clone_settings ),
				'advanced' => $advanced,
			],
			'image' => [
				'general'  => array_merge( compact( 'name', 'id', 'label_description', 'desc', 'max_file_uploads', 'force_delete' ), $clone_settings ),
				'advanced' => $advanced,
			],
			'video' => [
				'general'  => array_merge( compact( 'name', 'id', 'desc' ), $upload_settings, $clone_settings ),
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