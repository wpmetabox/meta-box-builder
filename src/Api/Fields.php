<?php
namespace MBB\Api;

use MBB\Helpers\Data;

class Fields extends Base {
	public function get_field_types() {
		$field_types = [
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
				'autocomplete'  => 'Autocomplete',
				'background'    => 'Background',
				'color'         => 'Color Picker',
				'custom_html'   => 'Custom HTML',
				'date'          => 'Date Picker',
				'datetime'      => 'Date Time Picker',
				'fieldset_text' => 'Fieldset Text',
				'map'           => 'Google Maps',
				'slider'        => 'jQuery UI Slider',
				'key_value'     => 'Key Value',
				'image_select'  => 'Image Select',
				'oembed'        => 'oEmbed',
				'osm'           => 'Open Street Maps',
				'switch'        => 'Switch',
				'text_list'     => 'Text List',
				'time'          => 'Time Picker',
				'wysiwyg'       => 'WYSIWYG Editor',
			],
			'WordPress' => [
				'post'              => 'Post',
				'sidebar'           => 'Sidebar',
				'taxonomy'          => 'Taxonomy',
				'taxonomy_advanced' => 'Taxonomy Advanced',
				'user'              => 'User',
			],
			'Upload' => [
				'file'           => 'File',
				'file_advanced'  => 'File Advanced',
				'file_upload'    => 'File Upload',
				'file_input'     => 'File Input',
				'image'          => 'Image',
				'image_advanced' => 'Image Advanced',
				'image_upload'   => 'Image Upload',
				'single_image'   => 'Single Image',
				'video'          => 'Video',
			],
			'Layout' => [
				'divider' => 'Divider',
				'heading' => 'Heading',
			],
		];
		if ( Data::is_extension_active( 'meta-box-tabs' ) ) {
			$field_types['Layout']['tab'] = 'Tab';
		}
		if ( Data::is_extension_active( 'meta-box-group' ) ) {
			$field_types['Layout']['group'] = 'Group';
		}
		return $field_types;
	}

	public function get_fields() {
		// General tab.
		$id = Control::Id( [
			'label'    => __( 'ID', 'meta-box-builder' ),
			'required' => true,
			'tooltip'  => __( 'Must be unique, will be used as meta key when saving to the database. Recommended to use only lowercase letters, numbers, and underscores.', 'meta-box-builder' ),
		] );
		$name = Control::Name( [
			'label'   => __( 'Label', 'meta-box-builder' ),
			'tooltip' => __( 'Leave empty to make the input 100% width.', 'meta-box-builder' ),
		] );
		$std = Control::Input( __( 'Default value', 'meta-box-builder' ) );
		$std_textarea = Control::Textarea( [
			'label'   => __( 'Default value' ),
			'tooltip' => __( 'Enter each value on a line', 'meta-box-builder')
		] );
		$label_description = Control::Input( [
			'label'   => __( 'Label description', 'meta-box-builder' ),
			'tooltip' => __( 'Display below the field label', 'meta-box-builder' ),
		] );
		$desc = Control::Input( [
			'label'   => __( 'Input description', 'meta-box-builder' ),
			'tooltip' => __( 'Display below the field input', 'meta-box-builder' ),
		] );
		$size = Control::Input( [
			'type'  => 'number',
			'label' => __( 'Size of the input box', 'meta-box-builder' ),
		] );
		$placeholder = Control::Input( __( 'Placeholder', 'meta-box-builder' ) );
		$max_file_uploads = Control::Input( [
			'type'    => 'number',
			'label'   => __( 'Max number of files', 'meta-box-builder' ),
			'tooltip' => __( 'Leave empty for unlimited uploads', 'meta-box-builder' ),
		] );
		$force_delete = Control::Checkbox( [
			'label'   => __( 'Force delete', 'meta-box-builder' ),
			'tooltip' => __( 'Delete files from the Media Library when deleting them from post meta', 'meta-box-builder' ),
		] );
		$upload_dir = Control::Input( [
			'label'   => __( 'Custom upload folder', 'meta-box-builder' ),
			'tooltip' => __( 'Relatively from the WordPress root path', 'meta-box-builder' ),
		] );
		$max_status = Control::Checkbox( [
			'label'   => __( 'Show status', 'meta-box-builder' ),
			'tooltip' => __( 'Display how many files uploaded/remaining', 'meta-box-builder' ),
		], true );
		$min = Control::Input( [
			'type'  => 'number',
			'label' => __( 'Min value', 'meta-box-builder' ),
		] );
		$max = Control::Input( [
			'type'  => 'number',
			'label' => __( 'Max value', 'meta-box-builder' ),
		] );
		$step = Control::Input( [
			'label'   => __( 'Step', 'meta-box-builder' ),
			'tooltip' => __( "Set the increments at which a numeric value can be set. Enter 'any' to accept any number.", 'meta-box-builder' ),
		] );
		$inline = Control::Checkbox( [
			'label'   => __( 'Inline', 'meta-box-builder' ),
			'tooltip' => __( 'Display choices on a single line', 'meta-box-builder' ),
		] );
		$multiple = Control::Checkbox( [
			'label'   => __( 'Multiple', 'meta-box-builder' ),
			'tooltip' => __( 'Allow to select multiple choices', 'meta-box-builder' ),
		] );
		$options = Control::Textarea( [
			'label'   => __( 'Choices', 'meta-box-builder' ),
			'tooltip' => __( "Enter each choice on a line. For more control, you may specify both value and label like 'red: Red' (without quotes)", 'meta-box-builder' ),
		] );
		$field_type = Control::Select( [
			'label'   => __( 'Field type', 'meta-box-builder' ),
			'options' => [
				'select'          => __( 'Select', 'meta-box-builder' ),
				'select_advanced' => __( 'Select advanced', 'meta-box-builder' ),
				'select_tree'     => __( 'Select tree', 'meta-box-builder' ),
				'checkbox_list'   => __( 'Checkbox list', 'meta-box-builder' ),
				'checkbox_tree'   => __( 'Checkbox tree', 'meta-box-builder' ),
				'radio_list'      => __( 'Radio list', 'meta-box-builder' ),
			],
		], 'select_advanced' );
		$taxonomy = Control::CheckboxList( [
			'label'    => __( 'Taxonomies', 'meta-box-builder' ),
			'options'  => $this->get_taxonomies(),
			'multiple' => true,
		] );
		$clone = Control::Checkbox( [
			'label'   => __( 'Cloneable', 'meta-box-builder' ),
			'tooltip' => __( 'Make field cloneable (repeatable)', 'meta-box-builder' ),
		] );
		$sort_clone = Control::Checkbox( [
			'label'      => __( 'Sortable', 'meta-box-builder' ),
			'tooltip'    => __( 'Allows to drag-and-drop reorder clones', 'meta-box-builder' ),
			'dependency' => 'clone:true',
		] );
		$clone_default = Control::Checkbox( [
			'label'      => __( 'Clone default value', 'meta-box-builder' ),
			'dependency' => 'clone:true',
		] );
		$clone_as_multiple = Control::Checkbox( [
			'label'      => __( 'Clone as multiple', 'meta-box-builder' ),
			'tooltip'    => __( 'Save clones in multiple rows in the database', 'meta-box-builder' ),
			'dependency' => 'clone:true',
		] );
		$max_clone = Control::Input( [
			'type'       => 'number',
			'label'      => __( 'Max number of clones', 'meta-box-builder' ),
			'tooltip'    => __( 'Leave empty for unlimited clones', 'meta-box-builder' ),
			'dependency' => 'clone:true',
		] );
		$add_button = Control::Input( [
			'label'      => __( 'Add more text', 'meta-box-builder' ),
			'tooltip'    => __( 'Custom text for the the "+ Add more" button. Leave empty to use the default text.', 'meta-box-builder' ),
			'dependency' => 'clone:true',
		] );
		$disabled        = Control::Checkbox( __( 'Disabled', 'meta-box-builder' ) );
		$required        = Control::Checkbox( __( 'Required', 'meta-box-builder' ) );
		$readonly        = Control::Checkbox( __( 'Read-only', 'meta-box-builder' ) );
		$select_all_none = Control::Checkbox( __( 'Display "Toggle All" button', 'meta-box-builder' ) );

		$max_file_size = Control::Input( [
			'label'   => __( 'Max file size', 'meta-box-builder' ),
			'tooltip' => __( 'Supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".', 'meta-box-builder' ),
		] );

		$image_sizes    = [];
		$wp_image_sizes = get_intermediate_image_sizes();
		foreach ( $wp_image_sizes as $size_name ) {
			$image_sizes[ $size_name ] = ucwords( str_replace( ['_', '-'], ' ', $size_name ) );
		}
		$image_size = Control::Select( [
			'label'   => __( 'Image size', 'meta-box-builder' ),
			'tooltip' => __( 'Image size that displays in the edit page, used to make sure images are not blurry. It\'s not meant to display images with the exact width and height.', 'meta-box-builder' ),
			'options' => $image_sizes,
		], 'thumbnail' );
		$mime_type = Control::Input( [
			'label'   => __( 'MIME types', 'meta-box-builder' ),
			'tooltip' => __( 'Filters items in the Media Library popup. Does not restrict file types when upload. Separate by commas.', 'meta-box-builder' ),
		] );
		$add_to = Control::Select( [
			'label'   => __( 'New image placement', 'meta-box-builder' ),
			'options' => [
				'beginning' => __( 'Beginning of the list', 'meta-box-builder' ),
				'end'       => __( 'End of the list', 'meta-box-builder' ),
			],
		], 'end' );
		$date_settings = [
			'save_format' => Control::Input( [
				'label'   => __( 'Save format', 'meta-box-builder' ),
				'tooltip' => __( 'Custom format for the value saved in the database. Accepts same formats as the PHP date() function. Leave empty to save as it is.', 'meta-box-builder' ),
			] ),
			'timestamp'  => Control::Checkbox( __( 'Save value as timestamp', 'meta-box-builder' ) ),
			'inline'     => Control::Checkbox( [
				'label'   => __( 'Inline', 'meta-box-builder' ),
				'tooltip' => __( 'Display the date picker inline with the input. Do not require to click the input field to trigger the date picker.', 'meta-box-builder' ),
			] ),
			'required'   => $required,
			'disabled'   => $disabled,
			'readonly'   => $readonly,
			'js_options' => Control::KeyValue( [
				'link'  => 'https://api.jqueryui.com/datepicker/',
				'label' => __( 'Date picker options', 'meta-box-builder' ),
			] ),
		];

		$language_codes = 'ar,bg,bn,ca,cs,da,de,el,en,en-AU,en-GB,es,eu,eu,fa,fi,fil,fr,gl,gu,hi,hr,hu,id,it,iw,ja,kn,ko,lt,lv,ml,mr,nl,no,pl,pt,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,ta,te,th,tl,tr,uk,vi,zh-CN,zh-TW';
		$language_names = 'Arabic,Bulgarian,Bengali,Catalan,Czech,Danish,German,Greek,English,English (Australian),English (Great Britain),Spanish,Basque,Basque,Farsi,Finnish,Filipino,French,Galician,Gujarati,Hindi,Croatian,Hungarian,Indonesian,Italian,Hebrew,Japanese,Kannada,Korean,Lithuanian,Latvian,Malayalam,Marathi,Dutch,Norwegian,Polish,Portuguese,Portuguese (Brazil),Portuguese (Portugal),Romanian,Russian,Slovak,Slovenian,Serbian,Swedish,Tamil,Telugu,Thai,Tagalog,Turkish,Ukrainian,Vietnamese,Chinese (Simplified),Chinese (Traditional)';
		$language_codes = explode( ',', $language_codes );
		$language_names = explode( ',', $language_names );
		$languages      = array_combine( $language_codes, $language_names );
		$map_settings   = [
			'std' => Control::Input( [
				'label'   => __( 'Default location', 'meta-box-builder' ),
				'tooltip' => __( 'Format: latitude,longitude.', 'meta-box-builder' ),
			] ),
			'address_field' => Control::AddressField( [
				'label'       => __( 'Address field', 'meta-box-builder' ),
				'tooltip'     => __( 'The ID of address field. For multiple fields, separate them by comma.', 'meta-box-builder' ),
				'placeholder' => __( 'Enter or select a field ID', 'meta-box-builder' ),
				'required'    => true,
			] ),
			'language' => Control::Select( [
				'label'   => __( 'Language', 'meta-box-builder' ),
				'options' => $languages,
			] ),
			'region' => Control::Input( [
				'label'    => '<a href="https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Country_code_top-level_domains" target="_blank" rel="noopenner noreferrer">' . __( 'Region code', 'meta-box-builder' ) . '</a>',
				'tooltip'  => __( 'The region code, specified as a country code top-level domain. Use for autocompleting addresses.' ),
			] ),
		];
		$taxonomy_settings = [
			'add_new'        => Control::Checkbox( [
				'label'   => __( 'Add new', 'meta-box-builder' ),
				'tooltip' => __( 'Allow users to create a new term when submitting the post', 'meta-box-builder' ),
			] ),
			'remove_default'  => Control::Checkbox( __( 'Remove default meta box', 'meta-box-builder' ) ),
			'multiple'        => $multiple,
			'select_all_none' => $select_all_none,
			'required'        => $required,
			'query_args'      => Control::KeyValue( [
				'link'    => 'https://developer.wordpress.org/reference/functions/get_terms/',
				'label'   => __( 'Query args', 'meta-box-builder' ),
				'tooltip' => __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ),
			] ),
		];

		$upload_settings = compact( 'max_file_uploads', 'max_status', 'force_delete' );
		$clone_settings = compact( 'clone', 'sort_clone', 'clone_default', 'clone_as_multiple', 'max_clone', 'add_button' );

		// Advanced tab.
		$before = Control::Textarea( [
			'label'   => __( 'Before', 'meta-box-builder' ),
			'tooltip' => __( 'Custom HTML displayed before the field output', 'meta-box-builder' ),
		] );
		$after = Control::Textarea( [
			'label'   => __( 'After', 'meta-box-builder' ),
			'tooltip' => __( 'Custom HTML displayed after the field output', 'meta-box-builder' ),
		] );
		$class = Control::Input( __( 'Custom CSS class', 'meta-box-builder' ) );
		$save_field = Control::Checkbox( [
			'label'   => __( 'Save field value' ),
			'tooltip' => __( 'Uncheck this checkbox to prevent the field from saving its value into the database. Useful when you want to save yourself. Note: not working in the block editor.', 'meta-box-builder' )
		], true );
		$sanitize_callback = Control::Input( [
			'label'   => '<a href="https://docs.metabox.io/sanitization/" target="_blank" rel="noreferrer noopener">' . __( 'Custom sanitize callback', 'meta-box-builder' ) . '</a>',
			'tooltip' => __( 'Enter PHP function name for custom sanitization. Enter "none" to disable sanitization.', 'meta-box-builder' ),
		] );
		$attributes = Control::KeyValue( [
			'link'    => 'https://docs.metabox.io/custom-attributes/',
			'label'   => __( 'Custom HTML5 attributes', 'meta-box-builder' ),
			'tooltip' => __( 'Use this to add custom HTML5 attributes (like data-*). Work only for text input fields.', 'meta-box-builder' ),
		] );
		$custom_settings = Control::KeyValue( [
			'link'    => 'https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes',
			'label'   => __( 'Custom settings', 'meta-box-builder' ),
			'tooltip' => __( 'Use this to add custom settings for the field. The custom settings will overwrite existing settings if they have the same key.', 'meta-box-builder' ),
		] );
		$general = compact( 'name', 'id', 'label_description', 'desc' );
		$advanced = compact( 'before', 'after', 'class', 'save_field', 'sanitize_callback', 'attributes', 'custom_settings' );
		if ( Data::is_extension_active( 'meta-box-conditional-logic' ) ) {
			$advanced = array_merge( $advanced, [
				'conditional_logic' => Control::ConditionalLogic( [
					'link' => 'https://docs.metabox.io/extensions/meta-box-conditional-logic/',
					'label' => __( 'Conditional logic', 'meta-box-builder' ),
					'tooltip' => __( 'Toogle the field visibility by other fields\' values', 'meta-box-builder' ),
				] ),
			] );
		}

		// Define only general tab.
		$fields = [
			'autocomplete' => array_merge( $general, compact( 'options', 'size' ), $clone_settings ),
			'background'   => array_merge( $general, $clone_settings ),
			'button'       => array_merge( $general, [
				'std'      => Control::Input( __( 'Button text', 'meta-box-builder' ) ),
				'disabled' => $disabled,
			] ),
			'button_group' => array_merge( $general, [
				'options' => Control::Textarea( [
					'label'   => __( 'Buttons', 'meta-box-builder' ),
					'tooltip' => __( "Enter each button text on a line. For more control, you may specify both value and label like 'bold: B' (without quotes)", 'meta-box-builder' ),
				] ),
				'std'    => $std,
				'inline' => Control::Checkbox( __( 'Display buttons horizontally', 'meta-box-builder' ), true ),
			], compact( 'multiple', 'required' ), $clone_settings ),
			'checkbox' => array_merge( $general, [
				'std' => Control::Checkbox( __( 'Checked by default', 'meta-box-builder' ) ),
			], $clone_settings ),
			'checkbox_list' => array_merge( $general, [
				'options'         => $options,
				'std'             => $std_textarea,
				'inline'          => $inline,
				'select_all_none' => $select_all_none,
			], $clone_settings ),
			'color' => array_merge( $general, [
				'std'           => $std,
				'alpha_channel' => Control::Checkbox( __( 'Allow to select opacity', 'meta-box-builder' ) ),
				'disabled'      => $disabled,
				'readonly'      => $readonly,
				'js_options'    => Control::KeyValue( [
					'link'  => 'https://automattic.github.io/Iris/',
					'label' => __( 'Custom color picker options', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'custom_html' => array_merge( $general, [
				'std'      => Control::Textarea( __( 'Content (HTML allowed)' ) ),
				'callback' => Control::Input( [
					'label'   => __( 'PHP Callback', 'meta-box-builder' ),
					'tooltip' => __( 'PHP function that is called to show custom HTML content. Will overwrite the content setting above.', 'meta-box-builder' ),
				] ),
			] ),
			'date'          => array_merge( $general, compact( 'std', 'placeholder', 'size' ), $date_settings, $clone_settings ),
			'datetime'      => array_merge( $general, compact( 'std', 'placeholder', 'size' ), $date_settings, $clone_settings ),
			'divider'       => compact( 'before', 'after' ),
			'email'         => array_merge( $general, compact( 'std', 'placeholder', 'size', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'fieldset_text' => array_merge( $general, [
				'options' => Control::KeyValue( [
					'label'            => __( 'Inputs', 'meta-box-builder' ),
					'valuePlaceholder' => __( 'Enter label', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'file'          => array_merge( $general, compact( 'max_file_uploads', 'force_delete', 'upload_dir', 'required' ), $clone_settings ),
			'file_advanced' => array_merge( $general, compact( 'mime_type' ), $upload_settings, $clone_settings ),
			'file_input'    => array_merge( $general, compact( 'std', 'placeholder', 'size', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'file_upload'   => array_merge( $general, compact( 'mime_type', 'max_file_size' ), $upload_settings, $clone_settings ),
			'map'           => array_merge( $general, [
				'api_key'       => Control::Input( [
					'label'    => '<a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopenner noreferrer">' . __( 'Google Maps API key', 'meta-box-builder' ) . '</a>',
					'tooltip'  => __( 'The ID of address field. For multiple fields, separate them by comma.' ),
					'required' => true,
				] ),
			], $map_settings, $clone_settings ),
			'heading'        => [
				'name' => $name,
				'desc' => Control::Input( [
					'label' => __( 'Description', 'meta-box-builder' ),
				] ),
			],
			'hidden'         => compact( 'id', 'std' ),
			'image'          => array_merge( $general, compact( 'max_file_uploads', 'force_delete', 'upload_dir', 'required' ), $clone_settings ),
			'image_advanced' => array_merge( $general, $upload_settings, compact( 'image_size', 'add_to' ), $clone_settings ),
			'image_select'   => array_merge( $general, compact( 'options', 'std', 'multiple', 'required' ), $clone_settings ),
			'image_upload'   => array_merge( $general, compact( 'max_file_size', 'image_size', 'add_to' ), $upload_settings, $clone_settings ),
			'key_value' => array_merge( $general, compact( 'size' ), [
				'placeholder_key'   => Control::Input( __( 'Placeholder for key', 'meta-box-builder' ) ),
				'placeholder_value' => Control::Input( __( 'Placeholder for value', 'meta-box-builder' ) ),
			] ),
			'number' => array_merge( $general, compact( 'std', 'min', 'max', 'step', 'placeholder', 'size' ), $clone_settings ),
			'oembed' => array_merge( $general, compact( 'std', 'placeholder', 'size' ), [
				'not_available_string' => Control::Input( [
					'label'   => __( 'Not available text', 'meta-box-builder' ),
					'tooltip' => __( 'The text message displayed to users when the embed media is not available. Accepts HTML.', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'osm' => array_merge( $general, $map_settings, $clone_settings ),
			'password' => array_merge( $general, compact( 'std', 'placeholder', 'size', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'post'     => array_merge( $general, [
				'post_type' => Control::CheckboxList( [
					'label'   => __( 'Post types', 'meta-box-builder' ),
					'options' => $this->get_post_types(),
				], ['post'] ),
				'field_type'      => $field_type,
				'multiple'        => $multiple,
				'select_all_none' => $select_all_none,
				'parent'          => Control::Checkbox( [
					'label'   => __( 'Set as parent', 'meta-box-builder' ),
					'tooltip' => __( 'Set the selected post as the parent for the current being edited post.', 'meta-box-builder' ),
				] ),
				'required'    => $required,
				'placeholder' => $placeholder,
				'query_args'  => Control::KeyValue( [
					'link'    => 'https://developer.wordpress.org/reference/classes/wp_query/',
					'label'   => __( 'Query args', 'meta-box-builder' ),
					'tooltip' => __( 'Query arguments for getting posts. Same as in the WP_Query class.', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'radio'           => array_merge( $general, compact( 'options', 'std', 'inline', 'required' ), $clone_settings ),
			'range'           => array_merge( $general, compact( 'std', 'min', 'max', 'step', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'select'          => array_merge( $general, compact( 'options', 'std', 'placeholder', 'multiple', 'select_all_none', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'select_advanced' => array_merge( $general, compact( 'options', 'std', 'placeholder', 'multiple', 'select_all_none', 'required', 'disabled', 'readonly' ), [
				'js_options'  => Control::KeyValue( [
					'link'  => 'https://select2.org/configuration',
					'label' => __( 'Select2 options', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'sidebar'      => array_merge( $general, compact( 'std', 'placeholder', 'field_type', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'single_image' => array_merge( $general, compact( 'force_delete', 'image_size' ), $clone_settings ),
			'slider'       => array_merge( $general, compact( 'std' ), [
				'prefix' => Control::Input( [
					'label'   => __( 'Prefix', 'meta-box-builder' ),
					'tooltip' => __( 'Text displayed before the field value', 'meta-box-builder' ),
				] ),
				'suffix' => Control::Input( [
					'label'   => __( 'Suffix', 'meta-box-builder' ),
					'tooltip' => __( 'Text displayed after the field value', 'meta-box-builder' ),
				] ),
				'required' => $required,
				'js_options' => Control::KeyValue( [
					'link'  => 'https://api.jqueryui.com/slider',
					'label' => __( 'jQueryUI slider options', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'switch' => array_merge( $general, [
				'style' => Control::Select( [
					'label'   => __( 'Style', 'meta-box-builder' ),
					'options' => [
						'rounded' => __( 'Rounded', 'meta-box-builder' ),
						'square'  => __( 'Square', 'meta-box-builder' ),
					],
				], 'rounded' ),
				'on_label'  => Control::Input( __( 'Custom ON status label', 'meta-box-builder' ) ),
				'off_label' => Control::Input( __( 'Custom OFF status label', 'meta-box-builder' ) ),
				'std'       => Control::Checkbox( __( 'ON by default', 'meta-box-builder' ) ),
			], $clone_settings ),
			'taxonomy'          => array_merge( $general, compact( 'taxonomy', 'field_type', 'placeholder' ), $taxonomy_settings, $clone_settings ),
			'taxonomy_advanced' => array_merge( $general, compact( 'taxonomy', 'field_type', 'placeholder' ), $taxonomy_settings, $clone_settings ),
			'text'              => array_merge( $general, compact( 'std', 'placeholder', 'size' ), [
				'prepend' => Control::Input( __( 'Prepend text', 'meta-box-builder' ) ),
				'append'  => Control::Input( __( 'Append text', 'meta-box-builder' ) ),
				'datalist_choices' => Control::Textarea( [
					'label'   => __( 'Predefined values', 'meta-box-builder' ),
					'tooltip' => __( 'Known as "datalist", these are values that users can select from (they still can enter text if they want). Enter each value on a line.', 'meta-box-builder' ),
				] ),
			], compact( 'required', 'disabled', 'readonly' ), $clone_settings ),
			'text_list' => array_merge( $general, [
				'options' => Control::KeyValue( [
					'label'            => __( 'Inputs', 'meta-box-builder' ),
					'keyPlaceholder'   => __( 'Placeholder', 'meta-box-builder' ),
					'valuePlaceholder' => __( 'Label', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'textarea' => array_merge( $general, compact( 'std', 'placeholder' ), [
				'rows' => Control::Input( [
					'type'  => 'number',
					'label' => __( 'Rows', 'meta-box-builder' ),
				] ),
				'cols' => Control::Input( [
					'type'  => 'number',
					'label' => __( 'Columns', 'meta-box-builder' ),
				] ),
			], compact( 'required', 'disabled', 'readonly' ), $clone_settings ),
			'time' => array_merge( $general, compact( 'std', 'size', 'placeholder' ), [
				'inline'     => Control::Checkbox( [
					'label'   => __( 'Inline', 'meta-box-builder' ),
					'tooltip' => __( 'Display the time picker inline with the input. Do not require to click the input field to trigger the time picker.', 'meta-box-builder' ),
				] ),
				'required'   => $required,
				'disabled'   => $disabled,
				'readonly'   => $readonly,
				'js_options' => Control::KeyValue( [
					'link'  => 'http://trentrichardson.com/examples/timepicker',
					'label' => __( 'Time picker options', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'user' => array_merge( $general, compact( 'field_type', 'placeholder' ), [
				'multiple'        => $multiple,
				'select_all_none' => $select_all_none,
				'required'        => $required,
				'query_args'      => Control::KeyValue( [
					'link'    => 'https://codex.wordpress.org/Function_Reference/get_users',
					'label'   => __( 'Query args', 'meta-box-builder' ),
					'tooltip' => __( 'Query arguments for getting user. Same as in the get_user() function.', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
			'url'     => array_merge( $general, compact( 'std', 'placeholder', 'size', 'required', 'disabled', 'readonly' ), $clone_settings ),
			'video'   => array_merge( $general, $upload_settings, $clone_settings ),
			'wysiwyg' => array_merge( $general, compact( 'std' ), [
				'raw'     => Control::Checkbox( __( 'Save data in the raw format', 'meta-box-builder' ) ),
				'options' => Control::KeyValue( [
					'link'  => 'https://developer.wordpress.org/reference/functions/wp_editor/',
					'label' => __( 'Editor options', 'meta-box-builder' ),
				] ),
			], $clone_settings ),
		];
		if ( Data::is_extension_active( 'meta-box-group' ) ) {
			$fields['group'] = array_merge( $general, [
				'collapsible' => Control::Checkbox( [
					'label'   => __( 'Collapsible', 'meta-box-builder' ),
					'setting' => 'collapsible',
				] ),
				'default_state' => Control::Select( [
					'label'      => __( 'Default state', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
					'options'    => [
						'expanded'  => __( 'Expanded', 'meta-box-builder' ),
						'collapsed' => __( 'Collapsed', 'meta-box-builder' ),
					],
				], 'expanded' ),
				'save_state' => Control::Checkbox( [
					'label'      => __( 'Save state', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
				] ),
				'group_title' => Control::Input( [
					'label'      => __( 'Group title', 'meta-box-builder' ),
					'tooltip'    => __( 'Use {field_id} for a sub-field value and {#} for the clone index (if the group is cloneable)', 'meta-box-builder' ),
					'dependency' => 'collapsible:true',
				] ),
			], $clone_settings );
		}

		foreach ( $fields as $key => $general ) {
			$fields[ $key ] = compact( 'general', 'advanced' );
		}

		if ( Data::is_extension_active( 'meta-box-tabs' ) ) {
			$fields['tab'] = [
				'general'  => [
					'name' => $name,
					'id' => $id,
					'icon_type' => Control::Select( [
						'label' => __( 'Icon type', 'meta-box-builder' ),
						'options' => [
							'dashicons'   => __( 'Dashicons', 'meta-box-builder' ),
							'fontawesome' => __( 'Font Awesome', 'meta-box-builder' ),
							'url'         => __( 'Custom URL', 'meta-box-builder' ),
						],
					], 'dashicons' ),
					'icon' => Control::Icon( [
						'label'      => __( 'Icon', 'meta-box-builder' ),
						'dependency' => 'icon_type:dashicons',
					] ),
					'icon_fa' => Control::Input( [
						'label' => '<a href="https://fontawesome.com/icons?d=gallery&m=free" target="_blank" rel="noopenner noreferrer">' . __( 'Icon CSS class', 'meta-box-builder' ) . '</a>',
						'dependency' => 'icon_type:fontawesome',
					] ),
					'icon_url' => Control::Input( [
						'label'      => __( 'Icon URL', 'meta-box-builder' ),
						'dependency' => 'icon_type:url',
					] ),
				],
			];
		}

		return $fields;
	}

	private function get_post_types() {
		$post_types = Data::get_post_types();
		$options = [];
		foreach ( $post_types as $post_type ) {
			$options[ $post_type['slug'] ] = sprintf( '%s (<code>%s</code>)', $post_type['name'], $post_type['slug'] );
		}
		return $options;
	}

	private function get_taxonomies() {
		$taxonomies = Data::get_taxonomies();
		$options = [];
		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy['slug'] ] = sprintf( '%s (<code>%s</code>)', $taxonomy['name'], $taxonomy['slug'] );
		}
		return $options;
	}
}