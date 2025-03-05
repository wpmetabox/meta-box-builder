<?php
namespace MBBParser\Unparsers;

use MetaBox\Support\Arr;

class Settings extends Base {
	// Allow these settings to be empty.
	protected $empty_keys = [ 'post_types', 'taxonomies', 'settings_pages' ];

	public function unparse() {
		$this->add_default( 'context', 'normal' )
			->unparse_boolean_values()
			->unparse_numeric_values()
			->unparse_location()
			->unparse_location_rules( 'show_hide' )
			->unparse_location_rules( 'include_exclude' )
			->unparse_conditional_logic()
			->unparse_block();

		unset( $this->object_type );
	}

	private function unparse_location() {
		if ( isset( $this->post_types ) ) {
			$this->post_types = array_filter( (array) $this->post_types );
		}

		return $this;
	}

	/**
	 * @todo: Implement this
	 * 
	 * @param mixed $key
	 * @return void
	 */
	private function unparse_location_rules( $key ) {
		return $this;
	}

	private function unparse_block() {
		// @todo: Implement this
		return $this;
	}

	public function replace_variables( $string ) {
		if ( empty( $string ) ) {
			return $string;
		}

		return strtr( $string, [ 
			'{{ site.path }}' => wp_normalize_path( ABSPATH ),
			'{{ site.url }}' => untrailingslashit( home_url( '/' ) ),
			'{{ theme.path }}' => wp_normalize_path( get_stylesheet_directory() ),
			'{{ theme.url }}' => get_stylesheet_directory_uri(),
		] );
	}
}
