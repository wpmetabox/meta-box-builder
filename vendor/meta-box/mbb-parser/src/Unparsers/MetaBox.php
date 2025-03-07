<?php
namespace MBBParser\Unparsers;

use MetaBox\Support\Arr;
/**
 * This class is the inverse of the parser.
 * We convert the parsed data back to the format that can be saved to the database.
 * Basically, it takes the data from both old versions and new versions and converts them to the same format.
 * This is to compatibility and allow users to import/export data between different versions, even with other plugins like ACF.
 */
class MetaBox extends Base {
	// Allows these keys to be empty as they are required to be compatible with the builder.
	protected $empty_keys = [ 'fields', 'meta_box', 'settings', 'data', 'version' ];

	private $settings_parser;

	private $validation = [ 
		'rules' => [],
		'messages' => [],
	];

	/**
	 * The schemas for each post type
	 * 
	 * @var array
	 */
	protected const SCHEMAS = [ 
		'meta-box' => 'https://schemas.metabox.io/field-group.json',
		'mb-relationship' => 'https://schemas.metabox.io/relationships.json',
		'mb-settings-page' => 'https://schemas.metabox.io/settings-page.json',
	];

	/**
	 * Match the post type with the meta key which is used to register the object
	 * 
	 * @var array
	 */
	protected const TYPE_META = [ 
		'meta-box' => 'meta_box',
		'mb-relationship' => 'relationship',
		'mb-settings-page' => 'settings_page',
	];

	public function unparse() {
		$this->unparse_meta_box();
		$this->unparse_data();
		$this->unparse_post_fields();
		$this->unparse_modified();
		$this->unparse_settings();
		$this->unparse_fields( $this->settings['fields'] );
		$this->unparse_version();
		$this->unparse_custom_table();
		$this->unparse_tabs();
		$this->unparse_validation();
		$this->unparse_geo_location();
		$this->unparse_columns();
		$this->unparse_conditional_logic();
		$this->unparse_include_exclude();
		$this->unparse_show_hide();
	}

	public function unparse_tabs() {
		$tab_style          = $this->lookup( [ 'settings.tab_style', 'tab_style' ], '' );
		$tab_default_active = $this->lookup( [ 'settings.tab_default_active', 'tab_default_active' ], '' );
		$tab_default_active = $this->lookup( [ 'settings.tab_remember', 'tab_remember' ], '' );

		$this->settings['settings']['tab_style']          = $tab_style;
		$this->settings['settings']['tab_default_active'] = $tab_default_active;

		// Inject tabs into fields
		$tabs = $this->lookup( [ 'tabs' ], [] );

		$added_tabs = [];
		foreach ( $this->meta_box['fields'] as $field ) {
			if ( ! isset( $field['tab'] ) ) {
				continue;
			}

			$tab_id = $field['tab'];
			if ( array_key_exists( $tab_id, $added_tabs ) ) {
				continue;
			}

			$icon      = $tabs[ $tab_id ]['icon'] ?? '';
			$icon_type = 'dashicon';
			if ( strpos( $icon, 'fa-' ) === 0 ) {
				$icon_type = 'fontawesome';
			}

			if ( strpos( $icon, 'http' ) === 0 ) {
				$icon_type = 'url';
			}

			$field = [ 
				'id' => $tab_id,
				'_id' => $tab_id,
				'type' => 'tab',
				'name' => $tabs[ $tab_id ]['label'] ?? '',
				'icon_type' => $icon_type,
				'icon' => $tabs[ $tab_id ]['icon'] ?? '',
				'icon_fa' => $tabs[ $tab_id ]['icon'] ?? '',
				'icon_url' => $tabs[ $tab_id ]['icon'] ?? '',
			];

			$added_tabs[ $tab_id ] = $field;

			$this->settings['fields'][] = $field;
		}

		return $this;
	}

	public function unparse_custom_table() {
		if ( isset( $this->settings['settings']['custom_table'] ) ) {
			return $this;
		}

		$default_custom_table = [ 
			'enable' => false,
			'name' => '',
			'prefix' => false,
			'create' => false,
		];

		if ( ! isset( $this->table ) || ( ! isset( $this->storage_type ) && $this->storage_type !== 'custom_table' ) ) {
			$this->settings['settings']['custom_table'] = $default_custom_table;

			return $this;
		}

		$this->settings['settings']['custom_table'] = [ 
			'enable' => true,
			'name' => $this->table,
			'prefix' => false,
			'create' => false,
		];

		return $this;
	}

	public function unparse_version() {
		$this->version = $this->lookup( [ 'version', 'settings.version' ], 'v0' );
	}

	public function unparse_meta_box() {
		if ( isset( $this->meta_box ) ) {
			return $this;
		}

		$meta_box       = $this->get_settings();
		$this->meta_box = $meta_box;

		return $this;
	}

	/**
	 * Data is just for internal use so not supported to be exported. This means, we just empty it.
	 * 
	 * @return void
	 */
	public function unparse_data() {
		$this->data = [];

		return $this;
	}

	public function unparse_settings() {
		$settings = $this->settings['settings'] ?? [];

		if ( ! empty( $settings ) ) {
			return $this;
		}

		$id    = $this->id ?? uniqid();
		$title = $this->lookup( [ 'post_title', 'title' ], $id );

		// Basic settings.
		$settings = [ 
			'post_title' => $title,
			'post_name' => $id,
			'post_type' => $this->post_type ?? [ 'post' ],
			'version' => $this->version ?? 'v' . time(),
			'priority' => $this->priority ?? 'high',
			'style' => $this->style ?? 'default',
			'closed' => $this->closed ?? false,
			'class' => $this->class ?? '',
			'prefix' => $this->prefix ?? '',
			'revision' => $this->revision ?? false,
			'text_domain' => $this->text_domain ?? 'your-text-domain',
			'function_name' => $this->function_name ?? '',
			'settings_page' => $this->settings_page ?? [],
		];

		$known_keys = $this->get_known_keys();
		foreach ( $settings as $key => $value ) {
			if ( in_array( $key, $known_keys, true ) ) {
				continue;
			}

			$this->settings[ $key ]             = $value;
			$this->settings['settings'][ $key ] = $value;
		}

		// Merge custom settings
		$custom_settings = $this->lookup( [ 'custom_settings' ], [] );
		$settings = array_merge( (array) $this->settings['settings'], $settings );
		$settings['custom_settings'] = $custom_settings;

		$this->settings_parser = new Settings( $settings );
		$this->settings_parser->unparse();

		$this->settings['settings'] = $this->settings_parser->get_settings();
	}

	public function unparse_post_fields() {
		// Only set post_title from title if post_title isn't already set
		$this->post_title = $this->lookup( [ 'post_title', 'title' ], $this->id ?? uniqid() );
		$post_type        = $this->post_type ?? $this->detect_post_type();

		$this->post_type    = $post_type;
		$this->post_name    = $this->lookup( [ 'post_name', 'settings.id', 'relationship.id', 'meta_box.id', 'id' ] );
		$this->post_date    = $this->lookup( [ 'post_date' ], date( 'Y-m-d H:i:s' ) );
		$this->post_status  = $this->lookup( [ 'post_status' ], 'publish' );
		$this->post_content = $this->lookup( [ 'post_content' ], '' );

		return $this;
	}

	public function detect_post_type() {
		// Detect post type from the schema (new format)
		if ( isset( $data['$schema'] ) ) {
			$schema    = $data['$schema'];
			$post_type = array_search( $schema, self::SCHEMAS, true );
			if ( $post_type ) {
				return $post_type;
			}
		}

		// If no schema (old format), check keys exist
		// - meta_box it's a meta box
		// - relationship it's a relationship
		// - settings_page it's a settings page
		foreach ( self::TYPE_META as $type => $meta_key ) {
			if ( isset( $data[ $type ] ) ) {
				return $type;
			}
		}

		return 'meta-box';
	}

	public function unparse_fields( &$fields ) {
		foreach ( $fields as $id => $field ) {
			$unparser = new Field( $field );
			$unparser->unparse();

			$field = $unparser->get_settings();

			if ( isset( $field['fields'] ) && is_array( $field['fields'] ) ) {
				$this->unparse_fields( $field['fields'] );
			}

			unset( $fields[ $id ] );
			$fields[ $field['id'] ] = $field;
		}

		return $this;
	}

	public function unparse_validation() {
		$validation = $this->settings['validation'] ?? [];

		if ( empty( $validation ) || ! array_key_exists( 'rules', $validation ) ) {
			return $this;
		}

		$fields = $this->fields;
		foreach ( $validation['rules'] as $field_id => $rules ) {
			foreach ( $fields as $fid => $field ) {
				if ( $field['id'] !== $field_id ) {
					continue;
				}

				$field['validation'] = [];
				foreach ( $rules as $rule_name => $rule_value ) {
					$id = uniqid();

					$field['validation'][ $id ] = [ 
						'id' => $id,
						'name' => $rule_name,
						'value' => $rule_value,
						'message' => $validation['messages'][ $field_id ][ $rule_name ] ?? '',
					];
				}

				$fields[ $field['id'] ] = $field;
			}
		}
		$this->fields = $fields;

		return $this;
	}

	public function unparse_geo_location() {
		$geo = $this->lookup( [ 'geo' ], [] );

		if ( empty( $geo ) ) {
			return $this;
		}

		$custom_settings = $this->lookup( [ 'settings.custom_settings' ], [] );

		$id                                            = uniqid();
		$custom_settings[ $id ]                        = [ 
			'id' => $id,
			'key' => 'geo',
			'value' => is_array( $geo ) ? wp_json_encode( $geo ) : $geo
		];
		$this->settings['settings']['custom_settings'] = $custom_settings;

		return $this;
	}

	public function unparse_columns() {
		$columns = $this->lookup( [ 'columns' ], [] );

		if ( empty( $columns ) ) {
			return $this;
		}

		$custom_settings = $this->lookup( [ 'settings.custom_settings' ], [] );

		$id                                            = uniqid();
		$custom_settings[ $id ]                        = [ 
			'id' => $id,
			'key' => 'columns',
			'value' => is_array( $columns ) ? wp_json_encode( $columns ) : $columns
		];
		$this->settings['settings']['custom_settings'] = $custom_settings;

		return $this;
	}

	public function unparse_include_exclude() {
		$keywords        = [ 'include', 'exclude' ];
		$include_exclude = $this->lookup( [ 'settings.include_exclude' ], [] );

		foreach ( $keywords as $keyword ) {
			$data = $this->lookup( [ $keyword ], [] );

			if ( empty( $data ) ) {
				continue;
			}

			$setting_include_exclude = [ 
				'type' => $keyword,
				'relation' => $include_exclude['relation'] ?? 'OR',
				'rules' => [],
			];

			foreach ( $data as $rule_id => $rule ) {
				$id = uniqid();
				if ( $rule_id === 'relation' ) {
					continue;
				}
				$setting_include_exclude['rules'][ $id ] = [ 
					'id' => $id,
					'name' => $rule_id,
					'value' => $rule,
				];
			}
		}

		if ( empty( $setting_include_exclude['rules'] ) ) {
			return $this;
		}

		$this->settings['settings']['include_exclude'] = $setting_include_exclude;

		return $this;
	}

	public function unparse_show_hide() {
		$keywords  = [ 'show', 'hide' ];
		$show_hide = $this->lookup( [ 'settings.show_hide' ], [] );

		foreach ( $keywords as $keyword ) {
			$data = $this->lookup( [ $keyword ], [] );

			if ( empty( $data ) ) {
				continue;
			}

			$setting_show_hide = [ 
				'type' => $keyword,
				'relation' => $show_hide['relation'] ?? 'OR',
				'rules' => [],
			];

			foreach ( $data as $rule_id => $rule ) {
				$id = uniqid();
				if ( $rule_id === 'relation' ) {
					continue;
				}
				$setting_show_hide['rules'][ $id ] = [ 
					'id' => $id,
					'name' => $rule_id,
					'value' => $rule,
				];
			}
		}

		if ( empty( $setting_show_hide['rules'] ) ) {
			return $this;
		}

		$this->settings['settings']['show_hide'] = $setting_show_hide;

		return $this;
	}

	private function get_known_keys(): array {
		$keys = [ 
			'$schema',
			'id',
			'title',
			'post_type',
			'post_name',
			'post_date',
			'post_status',
			'post_content',
			'settings',
			'version',
			'data',
		];

		// Add extra keys for other post types
		$extras = [ 
			'meta_box' => [ 'fields', 'meta_box' ],
			'relationships' => [ 'relationship' ],
			'settings_page' => [ 'settings_page' ],
		];

		$post_type = $this->post_type ?? 'meta-box';

		return array_merge( $keys, $extras[ $post_type ] ?? [] );
	}

	private function get_unneeded_keys(): array {
		$default = [ 
			'ID',
			'post_name',
			'post_date',
			'post_status',
			'post_content',
			'settings',
			'meta_box',
			'data',
			'closed',
			'function_name',
			'text_domain',
			'post_type',
			'post_title',
			'settings_page',
			"menu_order",
			"ping_status",
			"pinged",
			"post_author",
			"post_content_filtered",
			"post_date_gmt",
			"post_excerpt",
			"post_mime_type",
			"post_modified",
			"post_modified_gmt",
			"post_parent",
			"post_password",
			"to_ping",
			"comment_count",
			"comment_status",
			"filter",
			"guid",
			"revision",
		];

		$post_type = $this->post_type ?? 'meta-box';

		// Add extra keys for other post types
		$extras = [ 
			'meta-box' => [ 'relationship' ],
			'mb-relationship' => [ 'fields', 'settings_page', 'relationship' ],
			'mb-settings-page' => [ 'fields', 'settings_page', 'relationship' ],
		];

		return array_merge( $default, $extras[ $post_type ] ?? [] );
	}

	public function unparse_modified() {
		// Look for modified in root, meta_box, or settings; default to current timestamp
		$modified                               = $this->lookup( [ 'modified', 'meta_box.modified' ], time() );
		$this->modified                         = $modified;
		$this->settings['meta_box']['modified'] = $modified;

		return $this;
	}
}
