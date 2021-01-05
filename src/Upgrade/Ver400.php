<?php
namespace MBB\Upgrade;

use MBBParser\Parsers\MetaBox as Parser;

/**
 * Convert from data for AngularJS to React.
 * - JavaScript data stored in post meta "settings" and "fields" instead of "post_excerpt"
 * - PHP data stored in post meta "meta_box" instead of "post_content"
 */
class Ver400 {
	private $settings;
	private $fields;

	public function __construct() {
		$query = new \WP_Query( [
			'post_type'              => 'meta-box',
			'post_status'            => 'any',
			'posts_per_page'         => -1,
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		] );

		$this->settings = new Ver400\Settings;
		$this->fields = new Ver400\Fields;

		foreach ( $query->posts as $post ) {
			// Update "settings" and "fields" for JavaScript.
			$data = $this->settings->update( $post );
			$data['fields'] = $this->fields->update( $post );

			// Save parsed data for PHP.
			$parser = new Parser( $data );
			$parser->parse();
			$meta_box = $parser->get_settings();
			update_post_meta( $post->ID, 'meta_box', $meta_box );
		}
	}
}
