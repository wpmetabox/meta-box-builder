<?php
namespace MBB;

if ( file_exists( __DIR__ . '/vendor' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

define( 'MBB_VER', '4.0.0' );
define( 'MBB_DIR', trailingslashit( __DIR__ ) );

list( , $url ) = \RWMB_Loader::get_path( MBB_DIR );
define( 'MBB_URL', $url );

// Show Meta Box admin menu.
add_filter( 'rwmb_admin_menu', '__return_true' );
load_plugin_textdomain( 'meta-box-builder', false, plugin_basename( MBB_DIR ) . '/languages/' );

new PostType;
new Upgrade\Manager;
new Register;
new RestApi\Generator;

new RestApi\Fields( new Registry );
new RestApi\Settings;

if ( Helpers\Data::is_extension_active( 'meta-box-include-exclude' ) ) {
	new RestApi\IncludeExclude;
}
if ( Helpers\Data::is_extension_active( 'meta-box-show-hide' ) ) {
	new RestApi\ShowHide;
}

new Extensions\Columns;
new Extensions\ConditionalLogic;
new Extensions\Group;
new Extensions\Tabs;
new Extensions\Tooltip;

if ( is_admin() ) {
	new Import;
	new Edit;
	new AdminColumns;
}