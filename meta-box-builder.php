<?php
/**
 * Plugin Name: Meta Box Builder
 * Plugin URI:  https://metabox.io/plugins/meta-box-builder/
 * Description: Drag and drop UI for creating custom meta boxes and custom fields.
 * Version:     4.0.0
 * Author:      MetaBox.io
 * Author URI:  https://metabox.io
 * License:     GPL2+
 *
 * @package    Meta Box
 * @subpackage Meta Box Builder
 */

// Prevent loading this file directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'mb_builder_load' ) ) {
	/**
	 * Hook to 'init' with priority 5 to make sure all actions are registered before Meta Box 4.9.0 runs
	 */
	add_action( 'init', 'mb_builder_load', 5 );

	/**
	 * Load plugin files after Meta Box is loaded
	 */
	function mb_builder_load() {
		if ( ! defined( 'RWMB_VER' ) ) {
			return;
		}
		require __DIR__ . '/bootstrap.php';
	}
}
