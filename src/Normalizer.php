<?php
namespace MBB;

use MetaBox\Support\Arr;

/**
 * Normalize import files for the builder
 * 
 * @package Meta Box Builder
 */
class Normalizer {
	/**
	 * Add missing keys from the data
	 **/
	public static function normalize( array $data ) {
		// id
		if ( ! isset( $data['id'] ) ) {
			$data['id'] = self::lookup( [ 'id', 'post_name', 'title' ], $data, uniqid() );
			$data['id'] = sanitize_title( $data['id'] );
		}

		// title
		$data['title'] = self::lookup( [ 'title', 'post_title', 'post_name', 'id' ], $data );
		$data['post_title'] = $data['title'];

		// post_type
		$data['post_type']    = self::lookup( [ 'post_type' ], $data, 'meta-box' );
		$data['post_name']    = self::lookup( [ 'post_name', 'settings.id', 'relationship.id', 'meta_box.id', 'id' ], $data );
		$data['post_date']    = self::lookup( [ 'post_date' ], $data, current_time( 'mysql' ) );
		$data['post_status']  = self::lookup( [ 'post_status' ], $data, 'publish' );
		$data['post_content'] = self::lookup( [ 'post_content' ], $data, '' );

		$data['settings']                  = self::lookup( [ 'settings' ], $data, [] );
		$data['settings']['object_type']   = self::lookup( [ 'settings.object_type' ], $data, 'post' );
		$data['settings']['post_types']    = self::lookup( [ 'settings.post_types' ], $data, [ 'post' ] );
		$data['settings']['context']       = self::lookup( [ 'settings.context' ], $data, [ 'normal' ] );
		$data['settings']['priority']      = self::lookup( [ 'settings.priority' ], $data, 'high' );
		$data['settings']['syle']          = self::lookup( [ 'settings.style' ], $data, 'default' );
		$data['settings']['closed']        = self::lookup( [ 'settings.closed' ], $data, false );
		$data['settings']['class']         = self::lookup( [ 'settings.class' ], $data, '' );
		$data['settings']['prefix']        = self::lookup( [ 'settings.prefix' ], $data, '' );
		$data['settings']['text_domain']   = self::lookup( [ 'settings.text_domain' ], $data, 'your-text-domain' );
		$data['settings']['function_name'] = self::lookup( [ 'settings.function_name' ], $data, '' );
		$data['settings']['version']       = self::lookup( [ 'settings.version' ], $data, 'v0' );
		$data['data']                      = self::lookup( [ 'settings.data' ], $data, [] );

		$data['fields'] = self::lookup( [ 'fields' ], $data, [] );

		// Add _id for each field for the builder
		$fields = $data['fields'];
		$data['fields'] = self::for_builder( $data['fields'] );

		$data['meta_box'] = self::lookup( [ 'meta_box' ], $data, [] );

		$data['version'] = self::lookup( [ 'version', 'settings.version' ], $data, 'v0' );

		$meta_box = $data['meta_box'] ?? [];

		if ( empty( $meta_box ) ) {	
			$meta_box['title']         = self::lookup( [ 'title' ], $data );
			$meta_box['id']            = self::lookup( [ 'id' ], $data );
			$meta_box['closed']        = self::lookup( [ 'settings.closed' ], $data, false );
			$meta_box['fields']        = $fields;
		}

		// Add all extra keys to settings and meta_box
		$known_keys = self::get_known_keys();
		foreach ( $data as $key => $value ) {
			if ( in_array( $key, $known_keys, true ) ) {
				continue;
			}

			$meta_box[ $key ] = $value;
			$data['settings'][ $key ] = $value;
		}

		$data['meta_box'] = $meta_box;

		// @todo: Normalize GEO Settings
		// @todo: Normalize conditional logics
		// @todo: Normalize options

		return $data;
	}

	private static function get_known_keys() {
		return [
			'$schema',
			'id',
			'title',
			'post_type',
			'post_name',
			'post_date',
			'post_status',
			'post_content',
			'settings',
			'meta_box',
			'version',
			'fields',
			'data',
		];
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
	private static function for_builder( array $fields ) {
		foreach ( $fields as $index => $field ) {
			$unparser = new \MBBParser\Unparsers\Field( $field );
			$unparser->unparse();

			$field = $unparser->get_settings();
			
			if ( isset( $field['fields'] ) && is_array( $field['fields'] ) ) {
				$field['fields'] = self::for_builder( $field['fields'] );
			}

			$fields[ $index ] = $field;
		}

		return $fields;
	}
}
