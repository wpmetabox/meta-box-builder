<?php
namespace MBB\Integrations\WPML;

class LocationSearch {
	public function __construct() {
		add_filter( 'mbb_builder_post_label', [ $this, 'append_language_code' ], 10, 2 );
	}

	/**
	 * Append the WPML language code to the post label in location search results.
	 * Helps distinguish posts with identical titles across WPML languages.
	 */
	public function append_language_code( string $label, object $post ): string {
		$language_info = apply_filters( 'wpml_element_language_details', null, [
			'element_id'   => $post->ID,
			'element_type' => 'post_' . get_post_type( $post->ID ),
		] );

		if ( empty( $language_info->language_code ) ) {
			return $label;
		}

		return $label . ' [' . strtoupper( $language_info->language_code ) . ']';
	}
}
