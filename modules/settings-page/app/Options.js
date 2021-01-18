const { __ } = wp.i18n;

const styles = [
	{ 'value': 'boxes', 'label': 'Boxes' },
	{ 'value': 'no-boxes', 'label': 'No boxes' },
];

const columns = [
	{ 'value': 1, 'label': 1 },
	{ 'value': 2, 'label': 2 },
];

const tab_style = [
	{ 'value': 'default', 'label': 'Default' },
	{ 'value': 'left', 'label': 'Left' },
];

const checked = [ true, false ];

const MbuiPosition = [
	{ name: 'position', value: '', label: __( 'Select an item', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 2, label: __( 'Dashboard', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 5, label: __( 'Posts', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 10, label: __( 'Media', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 15, label: __( 'Links', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 20, label: __( 'Pages', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 25, label: __( 'Comments', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 60, label: __( 'Appearance', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 65, label: __( 'Plugins', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 70, label: __( 'Users', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 75, label: __( 'Tools', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 80, label: __( 'Settings', 'mb-settings-page-ui' ) },
	{ name: 'position', value: 100, label: __( 'Metabox', 'mb-settings-page-ui' ) },
];

const WordpressPages = [...[
	{ name: 'parent', value: 'index.php', label: __( 'Dashboard', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'edit.php', label: __( 'Posts', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'upload.php', label: __( 'Media', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'link-manager.php', label: __( 'Links', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'edit.php?post_type=page', label: __( 'Pages', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'edit-comments.php', label: __( 'Comments', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'themes.php', label: __( 'Apperance', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'plugins.php', label: __( 'Plugins', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'users.php', label: __( 'Users', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'tools.php', label: __( 'Tools', 'mb-settings-page-ui' ) },
	{ name: 'parent', value: 'options-general.php', label: __( 'Settings', 'mb-settings-page-ui' ) },
], ...MBSPUI.custom_post_types ];

const IconTypes = [
	{ name: 'dashicon', value: 0, label: 'Dashicon' },
	{ name: 'base64-encoded-svg', value: 1, label: 'Base64 encoded SVG' },
	{ name: 'custom-url', value: 2, label: 'Custom URL' },
];

export const Options = [
	{ type: 'text', name: 'option_name', label: __( 'Option name', 'mb-settings-page-ui' ), required: false, description: __( 'Option name where settings data is saved to. Optional. Takes id if missed. If you want to use theme mods, then set this to theme_mods_$themeslug.', 'mb-settings-page-ui' ) },
	{ type: 'text', name: 'class', label: __( 'CSS Class', 'mb-settings-page-ui' ), required: false, description: __( 'Custom CSS for the wrapper div.', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'capability', label: __( 'Capability', 'mb-settings-page-ui' ), options: MBSPUI.caps, description: __( 'Required capability to access the settings page.', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'icon_type', options: IconTypes, label: __( 'Icon', 'mb-settings-page-ui' ), required: false },
	{ type: 'icon_url', name: 'icon_url', required: false },
	{ type: 'select', name: 'position', label: __( 'Position', 'mb-settings-page-ui' ), options: MbuiPosition, description: __( 'Menu position. See position parameter of add_menu_page() function.', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'parent', label: __( 'Parent', 'mb-settings-page-ui' ), options: WordpressPages, description: __( 'ID of the parent page. Optional. Can be WordPress menu or custom settings page menu.', 'mb-settings-page-ui' ) },
	{ type: 'text', name: 'submenu_title', label: __( 'Submenu title', 'mb-settings-page-ui' ), required: false, description: __( 'Set this to the default submenu title (first submenu) if the settings page is a top-level menu. Optional.', 'mb-settings-page-ui' ) },
	{ type: 'textarea', name: 'help_tabs', label: __( 'Help tabs', 'mb-settings-page-ui' ), required: false, description: __( 'The content displayed when clicking on the Help button on the top right (near the Screen Options button).', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'style', label: __( 'Style', 'mb-settings-page-ui' ), required: false, options: styles },
	{ type: 'select', name: 'columns', label: __( 'Columns', 'mb-settings-page-ui' ), options: columns, description: __( 'The number of columns in the meta boxes. Can be 1 or 2. You might want to use 1 column with no-boxes style to match WordPress style.', 'mb-settings-page-ui' ) },
	{ type: 'form', name: 'tabs', label: __( 'Tabs', 'mb-settings-page-ui' ), required: false },
	{ type: 'select', name: 'tab_style', label: __( 'Tab style', 'mb-settings-page-ui' ), options: tab_style },
	{ type: 'text', name: 'submit_button', label: __( 'Custom submit button text', 'mb-settings-page-ui' ), required: false },
	{ type: 'text', name: 'message', label: __( 'Message', 'mb-settings-page-ui' ), required: false, description: __( 'The custom message displayed when saving options.', 'mb-settings-page-ui' ) },
	{ type: 'checkbox', name: 'customizer', label: __( 'Show in the Customizer', 'mb-settings-page-ui' ), options: checked },
	{ type: 'checkbox', name: 'customizer_only', label: __( 'Customizer only', 'mb-settings-page-ui' ), options: checked, description: __( 'Show only in the Customizer, no admin settings page', 'mb-settings-page-ui' ) },
	{ type: 'checkbox', name: 'network', label: __( 'Network', 'mb-settings-page-ui' ), options: checked, description: __( 'Make the settings page network-wide (in multisite environment).', 'mb-settings-page-ui' ) },
];