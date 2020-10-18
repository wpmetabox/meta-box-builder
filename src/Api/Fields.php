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
		$attributes = [
			'component' => 'KeyValue',
			'props' => [
				'type'  => 'attributes',
				'link'  => 'https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes',
				'label' => __( 'Custom settings', 'meta-box-builder' ),
			],
		];

		return [
			'text' => [
				'general' => [
					'id'                => '',
					'type'              => 'text',
					'name'              => 'Text',
					'desc'              => '',
					'std'               => '',
					'placeholder'       => '',
					'size'              => '',
					'clone'             => false,
					'sort_clone'        => false,
					'clone_default'     => false,
					'clone_as_multiple' => false,
					'max_clone'         => '',
					'add_button'        => ''
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'number' => [
				'general' => [
					'id' => '',
					'type' => 'number',
					'name' => 'Number',
					'desc' => '',
					'std' => '',
					'min' => '',
					'max' => '',
					'step' => '',
					'placeholder' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'url' => [
				'general' => [
					'id' => '',
					'type' => 'url',
					'name' => 'URL',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'email' => [
				'general' => [
					'id' => '',
					'name' => 'Email',
					'type' => 'email',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'range' => [
				'general' => [
					'id' => '',
					'name' => 'Range',
					'type' => 'range',
					'desc' => '',
					'std' => 0,
					'min' => 0,
					'max' => 9,
					'step' => 1,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'text_list' => [
				'general' => [
					'id' => '',
					'type' => 'text_list',
					'name' => 'Text List',
					'desc' => '',
					'options' => [],
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'checkbox' => [
				'general' => [
					'id' => '',
					'name' => 'Checkbox',
					'type' => 'checkbox',
					'desc' => '',
					'std' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'checkbox_list' => [
				'general' => [
					'id' => '',
					'name' => 'Checkbox List',
					'type' => 'checkbox_list',
					'desc' => '',
					'options' => '',
					'std' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'button' => [
				'general' => [
					'id' => '',
					'type' => 'button',
					'name' => 'Button',
					'desc' => '',
					'std' => ''
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'password' => [
				'general' => [
					'id' => '',
					'type' => 'password',
					'name' => 'Password',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'radio' => [
				'general' => [
					'id' => '',
					'name' => 'Radio',
					'type' => 'radio',
					'desc' => '',
					'options' => [],
					'inline' => true,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'select' => [
				'general' => [
					'id' => '',
					'name' => 'Select',
					'type' => 'select',
					'desc' => '',
					'options' => '',
					'std' => '',
					'placeholder' => '',
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'select_advanced' => [
				'general' => [
					'id' => '',
					'name' => 'Select Advanced',
					'type' => 'select_advanced',
					'desc' => '',
					'options' => '',
					'std' => '',
					'placeholder' => '',
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'js_options' => [],
					'attributes' => $attributes
				]
			],
			'textarea' => [
				'general' => [
					'id' => '',
					'type' => 'textarea',
					'name' => 'Textarea',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'rows' => '',
					'cols' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'hidden' => [
				'general' => [
					'id' => '',
					'type' => 'hidden',
					'std' => ''
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'image_select' => [
				'general' => [
					'id' => '',
					'type' => 'image_select',
					'name' => 'Image Select',
					'desc' => '',
					'std' => '',
					'options' => '',
					'multiple' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'color' => [
				'general' => [
					'id' => '',
					'name' => 'Color Picker',
					'type' => 'color',
					'desc' => '',
					'std' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'oembed' => [
				'general' => [
					'id' => '',
					'type' => 'oembed',
					'name' => 'oEmbed',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'slider' => [
				'general' => [
					'id' => '',
					'type' => 'slider',
					'name' => 'Slider',
					'desc' => '',
					'std' => '',
					'prefix' => '',
					'suffix' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'js_options' => [],
					'attributes' => $attributes
				]
			],
			'wysiwyg' => [
				'general' => [
					'id' => '',
					'name' => 'WYSIWYG',
					'type' => 'wysiwyg',
					'desc' => '',
					'std' => '',
					'raw' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'options' => [],
					'attributes' => $attributes
				]
			],
			'autocomplete' => [
				'general' => [
					'id' => '',
					'type' => 'autocomplete',
					'name' => 'Autocomplete',
					'desc' => '',
					'options' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'fieldset_text' => [
				'general' => [
					'id' => '',
					'type' => 'fieldset_text',
					'name' => 'Fieldset Text',
					'desc' => '',
					'options' => [],
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'map' => [
				'general' => [
					'id' => '',
					'type' => 'map',
					'name' => 'Map',
					'desc' => '',
					'std' => '',
					'api_key' => '',
					'address_field' => '',
					'region' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'group' => [
				'general' => [
					'id' => 'group',
					'type' => 'group',
					'name' => 'Group',
					'desc' => ''
				],
				'advanced' => [
					'attributes' => $attributes
				]
			],
			'heading' => [
				'general' => [
					'type' => 'heading',
					'name' => 'Heading',
					'desc' => ''
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'divider' => [
				'general' => [
					'type' => 'divider',
					'before' => '',
					'after' => ''
				]
			],
			'date' => [
				'general' => [
					'id' => '',
					'type' => 'date',
					'name' => 'Date Picker',
					'desc' => '',
					'std' => '',
					'size' => '',
					'inline' => false,
					'timestamp' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'js_options' => [],
					'attributes' => $attributes
				]
			],
			'datetime' => [
				'general' => [
					'id' => '',
					'type' => 'datetime',
					'name' => 'Date Time Picker',
					'desc' => '',
					'std' => '',
					'size' => '',
					'inline' => false,
					'timestamp' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'js_options' => [],
					'attributes' => $attributes
				]
			],
			'time' => [
				'general' => [
					'id' => '',
					'name' => 'Time Picker',
					'type' => 'time',
					'desc' => '',
					'std' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'js_options' => [],
					'attributes' => $attributes
				]
			],
			'post' => [
				'general' => [
					'id' => '',
					'type' => 'post',
					'name' => 'Post',
					'desc' => '',
					'std' => '',
					'post_type' => 'post',
					'field_type' => 'select_advanced',
					'parent' => false,
					'placeholder' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'query_args' => [],
					'attributes' => $attributes
				]
			],
			'taxonomy' => [
				'general' => [
					'id' => '',
					'type' => 'taxonomy',
					'name' => 'Taxonomy',
					'desc' => '',
					'taxonomy' => 'category',
					'field_type' => 'select_advanced',
					'std' => '',
					'placeholder' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'query_args' => [],
					'attributes' => $attributes
				]
			],
			'taxonomy_advanced' => [
				'general' => [
					'id' => '',
					'type' => 'taxonomy_advanced',
					'name' => 'Taxonomy Advanced',
					'desc' => '',
					'taxonomy' => 'category',
					'field_type' => 'select_advanced',
					'std' => '',
					'placeholder' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'query_args' => [],
					'attributes' => $attributes
				]
			],
			'user' => [
				'general' => [
					'id' => '',
					'type' => 'user',
					'name' => 'User',
					'desc' => '',
					'field_type' => 'select_advanced',
					'std' => '',
					'placeholder' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'query_args' => [],
					'attributes' => $attributes
				]
			],
			'file' => [
				'general' => [
					'id' => '',
					'type' => 'file',
					'name' => 'File',
					'desc' => '',
					'max_file_uploads' => '',
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'file_input' => [
				'general' => [
					'id' => '',
					'type' => 'file_input',
					'name' => 'File Input',
					'desc' => '',
					'std' => '',
					'placeholder' => '',
					'size' => '',
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'file_advanced' => [
				'general' => [
					'id' => '',
					'type' => 'file_advanced',
					'name' => 'File Advanced',
					'desc' => '',
					'max_file_uploads' => '',
					'mime_type' => '',
					'max_status' => true,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'image_advanced' => [
				'general' => [
					'id' => '',
					'type' => 'image_advanced',
					'name' => 'Image Advanced',
					'desc' => '',
					'max_file_uploads' => '',
					'max_status' => false,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'image' => [
				'general' => [
					'id' => '',
					'type' => 'image',
					'name' => 'Image Upload',
					'desc' => '',
					'max_file_uploads' => '',
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			],
			'video' => [
				'general' => [
					'id' => '',
					'type' => 'video',
					'name' => 'Video',
					'desc' => '',
					'max_file_uploads' => 4,
					'max_status' => false,
					'force_delete' => false,
					'clone' => false
				],
				'advanced' => [
					'before' => '',
					'after' => '',
					'class' => '',
					'attributes' => $attributes
				]
			]
		];
	}

	public function has_permission() {
		return current_user_can( 'manage_options' );
	}
}