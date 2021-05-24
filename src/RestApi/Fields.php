<?php
namespace MBB\RestApi;

class Fields extends Base {
	private $registry;

	public function __construct( $registry ) {
		parent::__construct();
		$this->registry = $registry;
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
				'slug'  => 'html5',
				'title' => __( 'HTML5', 'meta-box-builder' ),
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

	public function get_field_types() {
		$this->registry->register_default_controls();

		$general  = ['name', 'id', 'type', 'label_description', 'desc'];
		$advanced = ['before', 'after', 'class', 'sanitize_callback', 'save_field', 'attributes', 'validation', 'custom_settings'];
		$clone    = ['clone', 'sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button'];
		$date     = ['std', 'placeholder', 'size', 'save_format', 'timestamp', 'inline', 'required', 'disabled', 'readonly', 'js_options'];
		$map      = ['std', 'address_field', 'language', 'region', 'required'];
		$taxonomy = ['taxonomy', 'field_type', 'placeholder', 'add_new', 'remove_default', 'multiple', 'select_all_none', 'required', 'query_args'];
		$upload   = ['max_file_uploads', 'max_status', 'force_delete', 'required'];
		$input    = ['required', 'disabled', 'readonly'];
		$html5    = ['std', 'placeholder', 'size', 'required', 'disabled', 'readonly'];

		$field_types = [
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
				'controls' => array_merge( $general, ['std', 'required'], $clone, $advanced ),
			],
			'checkbox_list' => [
				'title'    => __( 'Checkbox List', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['options', 'std', 'inline', 'select_all_none', 'required'], $clone, $advanced ),
			],
			'color' => [
				'title'    => __( 'Color Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'js_options', 'alpha_channel'], $input, $clone, $advanced ),
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
				'title'    => __( 'Datetime Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $date, $clone, $advanced ),
			],
			'datetime-local' => [
				'title'    => __( 'Datetime Local', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'divider'       => [
				'title'    => __( 'Divider', 'meta-box-builder' ),
				'category' => 'layout',
				'controls' => ['type', 'before', 'after'],
			],
			'email'         => [
				'title'    => __( 'Email', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'fieldset_text' => [
				'title'    => __( 'Fieldset Text', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options', 'required'], $clone, $advanced ),
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
				'controls' => array_merge( $general, $html5, $clone, $advanced ),
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
				'controls' => array_merge( ['type', 'name', 'desc'], $advanced ),
			],
			'hidden'         => [
				'title'    => __( 'Hidden', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( ['id', 'type', 'std'], $advanced ),
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
				'controls' => array_merge( $general, ['size', 'placeholder_key', 'placeholder_value', 'required'], $advanced ),
			],
			'month' => [
				'title'    => __( 'Month', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'number' => [
				'title'    => __( 'Number', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, ['min', 'max', 'step'], $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'oembed' => [
				'title'    => __( 'oEmbed', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $html5, ['not_available_string'], $clone, $advanced ),
			],
			'osm'      => [
				'title'    => __( 'Open Street Maps', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $map, $clone, $advanced ),
			],
			'password' => [
				'title'    => __( 'Password', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, $html5, $clone, $advanced ),
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
				'category' => 'html5',
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
				'controls' => array_merge( $general, ['force_delete', 'image_size', 'required'], $clone, $advanced ),
			],
			'slider'       => [
				'title'    => __( 'jQuery UI Slider', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'prefix', 'suffix', 'required', 'js_options'], $clone, $advanced ),
			],
			'switch' => [
				'title'    => __( 'Switch', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['style', 'on_label', 'off_label', 'std', 'required'], $clone, $advanced ),
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
			'tel' => [
				'title'    => __( 'Phone Number', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'text'              => [
				'title'    => __( 'Text', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, $html5, ['prepend', 'append', 'datalist_choices'], $clone, $advanced ),
			],
			'text_list' => [
				'title'    => __( 'Text List', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['options', 'required'], $clone, $advanced ),
			],
			'textarea' => [
				'title'    => __( 'Textarea', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, ['std', 'placeholder', 'rows', 'cols'], $input, $clone, $advanced ),
			],
			'time' => [
				'title'    => __( 'Time Picker', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, $html5, ['inline', 'js_options'], $clone, $advanced ),
			],
			'user' => [
				'title'    => __( 'User', 'meta-box-builder' ),
				'category' => 'wordpress',
				'controls' => array_merge( $general, ['field_type', 'placeholder', 'multiple', 'select_all_none', 'required', 'query_args'], $clone, $advanced ),
			],
			'url'     => [
				'title'    => __( 'URL', 'meta-box-builder' ),
				'category' => 'basic',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'video'   => [
				'title'    => __( 'Video', 'meta-box-builder' ),
				'category' => 'upload',
				'controls' => array_merge( $general, $upload, $clone, $advanced ),
			],
			'week' => [
				'title'    => __( 'Week', 'meta-box-builder' ),
				'category' => 'html5',
				'controls' => array_merge( $general, $html5, ['prepend', 'append'], $clone, $advanced ),
			],
			'wysiwyg' => [
				'title'    => __( 'WYSIWYG Editor', 'meta-box-builder' ),
				'category' => 'advanced',
				'controls' => array_merge( $general, ['std', 'raw', 'options', 'required'], $clone, $advanced ),
			],
		];

		$field_types = apply_filters( 'mbb_field_types', $field_types );

		foreach ( $field_types as $type => $field_type ) {
			$field_type['controls'] = apply_filters( 'mbb_field_controls', $field_type['controls'], $type );
			$this->registry->add_field_type( $type, $field_type );
		}

		$this->registry->transform_controls();

		return $this->registry->get_field_types();
	}
}