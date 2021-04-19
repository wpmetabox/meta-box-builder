<?php
namespace MBB;

define( 'MBB_VER', '4.1.3' );
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

new Extensions\AdminColumns;
new Extensions\Blocks;
new Extensions\Columns;
new Extensions\ConditionalLogic;
new Extensions\CustomTable;
new Extensions\Group;
new Extensions\IncludeExclude;
new Extensions\Relationships;
new Extensions\SettingsPage;
new Extensions\ShowHide;
new Extensions\Tabs;
new Extensions\Tooltip;

if ( is_admin() ) {
	new Import;
	new Export;
	new Edit( 'meta-box', __( 'Field Group ID', 'meta-box-builder' ) );
	new AdminColumns;
}