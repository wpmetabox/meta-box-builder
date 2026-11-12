<?php
require dirname( __DIR__ ) . '/vendor/autoload.php';

$tests_dir = getenv( 'WP_PHPUNIT__DIR' );
require $tests_dir . '/includes/functions.php';

tests_add_filter( 'muplugins_loaded', function () {
	// Builder keeps extension settings (tab, group fields, tooltip) only when the extension is active.
	require __DIR__ . '/extension-stubs.php';
	// Conditional Logic is premium and the parser runs its code: use the site's copy when there is one.
	if ( file_exists( WP_PLUGIN_DIR . '/meta-box-conditional-logic/meta-box-conditional-logic.php' ) ) {
		require WP_PLUGIN_DIR . '/meta-box-conditional-logic/meta-box-conditional-logic.php';
	}
	require dirname( __DIR__ ) . '/vendor/wpmetabox/meta-box/meta-box.php';
	require dirname( __DIR__ ) . '/meta-box-builder.php';
} );

require $tests_dir . '/includes/bootstrap.php';
