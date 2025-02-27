<?php
namespace MBB;

use MetaBox\Support\Arr;

/**
 * Normalize import files for the builder
 * 
 * @package Meta Box Builder
 */
class Normalizer {
	protected static $schemas = [ 
		'meta_box' => 'https://schemas.metabox.io/field-group.json',
		'relationship' => 'https://schemas.metabox.io/relationship.json',
		'settings_page' => 'https://schemas.metabox.io/settings-page.json',
	];

	protected static $meta_keys = [ 
		'meta-box' => 'meta_box',
		'mb-relationship' => 'relationship',
		'mb-settings-page' => 'settings_page',
	];

	/**
	 * Normalize method lets users to get the full data of a field group
	 * This method adds missings keys by looking up from the data
	 * The purpose of this method is to backward compatibility with the old format 
	 **/
	public static function normalize( array $data, string $post_type = 'meta-box' ): array {
		$meta_key = self::$meta_keys[ $post_type ] ?? 'meta_box';

		// id
		if ( ! isset( $data['id'] ) ) {
			$data['id'] = self::lookup( [ 'id', 'post_name', 'title' ], $data, uniqid() );
			$data['id'] = sanitize_title( $data['id'] );
		}

		// title
		$data['title']      = self::lookup( [ 'title', 'post_title', 'menu_title', 'post_name', 'id' ], $data );
		$data['post_title'] = $data['title'];

		// post_type
		$data['post_type']    = $post_type;
		$data['post_name']    = self::lookup( [ 'post_name', 'settings.id', 'relationship.id', 'meta_box.id', 'id' ], $data );
		$data['post_date']    = self::lookup( [ 'post_date' ], $data, date( 'Y-m-d H:i:s' ) );
		$data['post_status']  = self::lookup( [ 'post_status' ], $data, 'publish' );
		$data['post_content'] = self::lookup( [ 'post_content' ], $data, '' );

		$data['settings']                  = self::lookup( [ 'settings' ], $data, [] );
		$data['settings']['object_type']   = self::lookup( [ 'settings.object_type' ], $data, 'post' );
		$data['settings']['post_types']    = self::lookup( [ 'post_types', 'settings.post_types' ], $data, [ 'post' ] );
		$data['settings']['context']       = self::lookup( [ 'settings.context' ], $data, [ 'normal' ] );
		$data['settings']['priority']      = self::lookup( [ 'settings.priority' ], $data, 'high' );
		$data['settings']['style']         = self::lookup( [ 'settings.style' ], $data, 'default' );
		$data['settings']['closed']        = self::lookup( [ 'settings.closed' ], $data, false );
		$data['settings']['class']         = self::lookup( [ 'settings.class' ], $data, '' );
		$data['settings']['prefix']        = self::lookup( [ 'settings.prefix' ], $data, '' );
		$data['settings']['text_domain']   = self::lookup( [ 'settings.text_domain', 'text_domain' ], $data, 'your-text-domain' );
		$data['settings']['function_name'] = self::lookup( [ 'settings.function_name', 'function_name' ], $data, '' );
		$data['settings']['version']       = self::lookup( [ 'version', 'settings.version' ], $data, 'v0' );

		$data['settings']['settings_page'] = self::lookup( [ 'settings.settings_page', 'settings_page' ], $data );
		// settings_page is string but old version needs array
		if ( is_string( $data['settings']['settings_page'] ) ) {
			$data['settings']['settings_page'] = [ $data['settings']['settings_page'] ];
		}

		// Fields only for meta box
		if ( 'meta_box' === $meta_key ) {
			$data['fields'] = self::lookup( [ 'fields' ], $data, [] );

			// Add _id for each field for the builder
			$fields         = $data['fields'];
			$data['fields'] = self::for_builder( $data['fields'] );
		}

		$data[ $meta_key ] = self::lookup( [ $meta_key ], $data, [] );
		$main_meta         = $data[ $meta_key ] ?? [];

		if ( empty( $main_meta ) ) {
			$main_meta['title']  = self::lookup( [ 'title' ], $data );
			$main_meta['id']     = self::lookup( [ 'id' ], $data );
			$main_meta['closed'] = self::lookup( [ 'settings.closed' ], $data, false );
			if ( $meta_key === 'meta_box' ) {
				$main_meta['fields'] = $fields;
			}

			$main_meta['version'] = self::lookup( [ 'version', 'settings.version' ], $data, 'v0' );
		}

		// Add all extra keys to settings and $main_meta
		$known_keys = self::get_known_keys( $meta_key );
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $known_keys, true ) ) {
				continue;
			}

			$post_data[ $key ]        = $value;
			$data['settings'][ $key ] = $value;
		}

		$data[ $meta_key ] = $post_data;
		$data['data']      = [];

		$data['version'] = self::lookup( [ 'version', 'settings.version' ], $data, 'v0' );

		return $data;
	}

	/**
	 * This method is to minimize the data for exporting the latest format (5.0)
	 * 
	 * By minimizing the data, we can remove all the unnecessary keys, making the file smaller
	 * easier to read and maintain
	 * 
	 * @param array $data
	 * @return array
	 */
	public static function minimize( array $data, string $post_type = null ): array {
		// Try to get the post type from the data
		if ( ! $post_type ) {
			$post_type = $data['post_type'] ?? null;
		}

		// Try to get post type from the schema
		if ( ! $post_type ) {
			$schema    = $data['$schema'];
			$post_type = array_search( $schema, self::$schemas );
		}

		$data          = self::normalize( $data, $post_type );
		$unneeded_keys = self::get_unneeded_keys( $post_type );

		// Move all keys from the desired field to the root
		foreach ( $data[ $post_type ] as $key => $value ) {
			$data[ $key ] = $value;
		}

		foreach ( $unneeded_keys as $key ) {
			unset( $data[ $key ] );
		}

		return $data;
	}

	private static function get_known_keys( string $post_type ): array {
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
			'meta_box' => [ 'fields' ],
			'relationships' => [ 'relationship' ],
			'settings_page' => [ 'settings_page' ],
		];

		return array_merge( $keys, $extras[ $post_type ] ?? [] );
	}

	/**
	 * These keys are only useful for the builder, we don't need them in the minimized data
	 * 
	 * @return string[]
	 */
	private static function get_unneeded_keys( string $post_type = 'meta-box' ): array {
		$default = [ 
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
		];

		// Add extra keys for other post types
		$extras = [ 
			'meta_box' => [ 'relationship' ],
			'relationship' => [ 'fields', 'settings_page' ],
			'settings_page' => [ 'fields', 'relationship' ],
		];

		return array_merge( $default, $extras[ $post_type ] ?? [] );
	}

	/**
	 * Lookup from the data using keys, return the first key found or null
	 * 
	 * @param array $keys
	 * @return mixed
	 */
	private static function lookup( array $keys, $data, $default = null ) {
		foreach ( $keys as $key ) {
			if ( Arr::get( $data, $key ) !== null ) {
				return Arr::get( $data, $key );
			}
		}

		return $default;
	}

	/**
	 * Add _id and make sure all fields has the required format for the builder
	 * 
	 * @param array $fields
	 * @return array
	 */
	private static function for_builder( array $fields ): array {
		foreach ( $fields as $id => $field ) {
			$unparser = new \MBBParser\Unparsers\Field( $field );
			$unparser->unparse();

			$field = $unparser->get_settings();

			if ( isset( $field['fields'] ) && is_array( $field['fields'] ) ) {
				$field['fields'] = self::for_builder( $field['fields'] );
			}

			unset( $fields[ $id ] );
			$fields[ $field['id'] ] = $field;
		}

		return $fields;
	}
}
