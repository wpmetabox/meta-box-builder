<?php
namespace MBB\RestApi;

class Fields extends Base {
	private $api;

	public function __construct( $api ) {
		parent::__construct();
		$this->api = $api;
	}

	public function get_field_categories() {
		$categories = [
			[
				'slug'  => 'basic',
				'title' => __( 'Basic', 'meta-box-builder' ),
			],
			[
				'slug'  => 'advanced',
				'title' => __( 'Advanced', 'meta-box-builder' ),
			],
			[
				'slug'  => 'wordpress',
				'title' => __( 'WordPress', 'meta-box-builder' ),
			],
			[
				'slug'  => 'upload',
				'title' => __( 'Upload', 'meta-box-builder' ),
			],
			[
				'slug'  => 'layout',
				'title' => __( 'Layout', 'meta-box-builder' ),
			],
		];

		$categories = apply_filters( 'mbb_field_categories', $categories );

		return $categories;
	}

	public function get_fields() {
		$this->api->register_default_controls();

		$general  = ['name', 'id', 'label_description', 'desc'];
		$advanced = ['before', 'after', 'class', 'save_field', 'sanitize_callback', 'attributes', 'custom_settings'];
		$clone    = ['clone', 'sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button'];
		$date     = ['std', 'placeholder', 'size', 'save_format', 'timestamp', 'inline', 'required', 'disabled', 'readonly', 'js_options'];
		$map      = ['std', 'address_field', 'language', 'region'];
		$taxonomy = ['taxonomy', 'field_type', 'placeholder', 'add_new', 'remove_default', 'query_args_taxonomy'];
		$upload   = ['max_file_uploads', 'max_status', 'force_delete'];
		$input    = ['required', 'disabled', 'readonly'];

		$fields = [
			'autocomplete' => [
				'title'    => __( 'Autocomplete', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options', 'size'], $clone, $advanced ),
			],
			'background'   => [
				'title'    => __( 'Background', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $clone, $advanced ),
			],
			'button'       => [
				'title'    => __( 'Button', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'disabled'], $advanced ),
			],
			'button_group' => [
				'title'    => __( 'Button Group', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'inline', 'multiple', 'required'], $clone, $advanced ),
			],
			'checkbox' => [
				'title'    => __( 'Checkbox', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std'], $clone, $advanced ),
			],
			'checkbox_list' => [
				'title'    => __( 'Checkbox List', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'inline', 'select_all_none'], $clone, $advanced ),
			],
			'color' => [
				'title'    => __( 'Color Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'alpha_channel', 'disabled', 'readonly', 'js_options'], $clone, $advanced ),
			],
			'custom_html' => [
				'title'    => __( 'Custom HTML', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'callback'], $advanced ),
			],
			'date'          => [
				'title'    => __( 'Date Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $date, $clone, $advanced ),
			],
			'datetime'      => [
				'title'    => __( 'Date Time Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $date, $clone, $advanced ),
			],
			'divider'       => [
				'title'    => __( 'Divider', 'meta-box-builder' ),
				'category' => 'layout',
				'controls' => ['before', 'after'],
			],
			'email'         => [
				'title'    => __( 'Email', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'size'], $input, $clone, $advanced ),
			],
			'fieldset_text' => [
				'title'    => __( 'Fieldset Text', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options_fieldset_text'], $clone, $advanced ),
			],
			'file'          => [
				'title'    => __( 'File', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['max_file_uploads', 'force_delete', 'upload_dir', 'required'], $clone, $advanced ),
			],
			'file_advanced' => [
				'title'    => __( 'File Advanced', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['mime_type'], $upload, $clone, $advanced ),
			],
			'file_input'    => [
				'title'    => __( 'File Input', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['std', 'placeholder', 'size'], $input, $clone, $advanced ),
			],
			'file_upload'   => [
				'title'    => __( 'File Upload', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['mime_type', 'max_file_size'], $upload, $clone, $advanced ),
			],
			'map'           => [
				'title'    => __( 'Google Maps', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['api_key'], $map, $clone, $advanced ),
			],
			'heading'        => [
				'title'    => __( 'Heading', 'meta-box-builder' ),
				'category' => 'layout',
				'controls' => array_merge( ['name', 'desc'], $advanced ),
			],
			'hidden'         => [
				'title'    => __( 'Hidden', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( ['id', 'std'], $advanced ),
			],
			'image'          => [
				'title'    => __( 'Image', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['max_file_uploads', 'force_delete', 'upload_dir', 'required'], $clone, $advanced ),
			],
			'image_advanced' => [
				'title'    => __( 'Image Advanced', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, $upload, ['image_size', 'add_to'], $clone, $advanced ),
			],
			'image_select'   => [
				'title'    => __( 'Image Select', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options', 'std', 'multiple', 'required'], $clone, $advanced ),
			],
			'image_upload'   => [
				'title'    => __( 'Image Upload', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['max_file_size', 'image_size', 'add_to'], $upload, $clone, $advanced ),
			],
			'key_value'      => [
				'title'    => __( 'Key Value', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['size', 'placeholder_key', 'placeholder_value'], $advanced ),
			],
			'number' => [
				'title'    => __( 'Number', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'min', 'max', 'step', 'placeholder', 'size'], $clone, $advanced ),
			],
			'oembed' => [
				'title'    => __( 'oEmbed', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'placeholder', 'size', 'not_available_string'], $clone, $advanced ),
			],
			'osm'      => [
				'title'    => __( 'Open Street Maps', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $map, $clone, $advanced ),
			],
			'password' => [
				'title'    => __( 'Password', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'size'], $input, $clone, $advanced ),
			],
			'post'     => [
				'title'    => __( 'Post', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, ['post_type', 'field_type', 'multiple', 'select_all_none', 'parent', 'required', 'placeholder', 'query_args'], $clone, $advanced ),
			],
			'radio'           => [
				'title'    => __( 'Radio', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'inline', 'required'], $clone, $advanced ),
			],
			'range'           => [
				'title'    => __( 'Range', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'min', 'max', 'step'], $input, $clone, $advanced ),
			],
			'select'          => [
				'title'    => __( 'Select', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'placeholder', 'multiple', 'select_all_none'], $input, $clone, $advanced ),
			],
			'select_advanced' => [
				'title'    => __( 'Select Advanced', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'placeholder', 'multiple', 'select_all_none'], $input, ['js_options'], $clone, $advanced ),
			],
			'sidebar'      => [
				'title'    => __( 'Sidebar', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, ['std', 'placeholder', 'field_type'], $input, $clone, $advanced ),
			],
			'single_image' => [
				'title'    => __( 'Single Image', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, ['force_delete', 'image_size'], $clone, $advanced ),
			],
			'slider'       => [
				'title'    => __( 'jQuery UI Slider', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'prefix', 'suffix', 'required', 'js_options'], $clone, $advanced ),
			],
			'switch' => [
				'title'    => __( 'Switch', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['style', 'on_label', 'off_label', 'std'], $clone, $advanced ),
			],
			'taxonomy'          => [
				'title'    => __( 'Taxonomy', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, $taxonomy, $clone, $advanced ),
			],
			'taxonomy_advanced' => [
				'title'    => __( 'Taxonomy Advanced', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, $taxonomy, $clone, $advanced ),
			],
			'text'              => [
				'title'    => __( 'Text', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'size', 'prepend', 'append', 'datalist_choices'], $input, $clone, $advanced ),
			],
			'text_list' => [
				'title'    => __( 'Text List', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options'], $clone, $advanced ),
			],
			'textarea' => [
				'title'    => __( 'Textarea', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'rows', 'columns'], $input, $clone, $advanced ),
			],
			'time' => [
				'title'    => __( 'Time Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'size', 'placeholder', 'inline'], $input, ['js_options'], $clone, $advanced ),
			],
			'user' => [
				'title'    => __( 'User', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, ['field_type', 'placeholder', 'multiple', 'select_all_none', 'required', 'query_args'], $clone, $advanced ),
			],
			'url'     => [
				'title'    => __( 'URL', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'field_type'], $input, $clone, $advanced ),
			],
			'video'   => [
				'title'    => __( 'Video', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, $upload, $clone, $advanced ),
			],
			'wysiwyg' => [
				'title'    => __( 'WYSIWYG Editor', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'raw', 'options'], $clone, $advanced ),
			],
		];

		$fields = apply_filters( 'mbb_fields', $fields );

		foreach ( $fields as $type => $field ) {
			$field['controls'] = apply_filters( 'mbb_field_controls', $field['controls'], $type );
			$this->api->add_field( $type, $field );
		}

		$this->api->transform_controls();

		return $this->api->get_fields();
	}
}