<?php
/**
 * Plugin Name:       MBB Parser
 * Plugin URI:        https://metabox.io
 * Description:       Parses meta box settings from JSON.
 * Version:           2.1.8
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            MetaBox.io
 * Author URI:        https://metabox.io
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}
new MBBParser\RestApi();
