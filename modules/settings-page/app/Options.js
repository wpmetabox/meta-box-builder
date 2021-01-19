const { __ } = wp.i18n;

const styles = {
	boxes: __( 'Boxes', 'meta-box-builder' ),
	'no-boxes': __( 'No boxes', 'meta-box-builder' ),
};

const columns = { 1: 1, 2: 2 };

const tabStyles = {
	default: 'Top',
	left: 'Left',
};

const iconTypes = {
	dashicons: 'Dashicon',
	svg: 'SVG',
	custom: 'Custom URL'
};

export const Options = [
	{ type: 'text', name: 'option_name', label: __( 'Option name', 'mb-settings-page-ui' ), description: __( 'Option name where settings data is saved to. Takes id if missed. If you want to use theme mods, then set this to <code>theme_mods_$themeslug</code>.', 'mb-settings-page-ui' ) },
	{ type: 'text', name: 'class', label: __( 'CSS Class', 'mb-settings-page-ui' ), description: __( 'Custom CSS for the wrapper div.', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'capability', label: __( 'Capability', 'mb-settings-page-ui' ), options: MBSPUI.capabilities, description: __( 'Required capability to access the settings page.', 'mb-settings-page-ui' ), defaultValue: 'edit_theme_options' },
	{ type: 'select', name: 'icon_type', options: iconTypes, label: __( 'Icon type', 'mb-settings-page-ui' ), defaultValue: 'dashicons' },
	{ type: 'icon_url', name: 'icon_url' },
	{ type: 'select', name: 'position', label: __( 'Position', 'mb-settings-page-ui' ), options: MBSPUI.menu_positions, description: __( 'Menu position after.', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'parent', label: __( 'Parent', 'mb-settings-page-ui' ), options: MBSPUI.parents, description: __( 'ID of the parent page. Can be WordPress menu or custom settings page menu.', 'mb-settings-page-ui' ) },
	{ type: 'text', name: 'submenu_title', label: __( 'Submenu title', 'mb-settings-page-ui' ), description: __( 'Set this to the default submenu title (first submenu) if the settings page is a top-level menu. Optional.', 'mb-settings-page-ui' ) },
	{ type: 'textarea', name: 'help_tabs', label: __( 'Help tabs', 'mb-settings-page-ui' ), description: __( 'The content displayed when clicking on the Help button on the top right (near the Screen Options button).', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'style', label: __( 'Style', 'mb-settings-page-ui' ), options: styles, defaultValue: 'boxes' },
	{ type: 'select', name: 'columns', label: __( 'Columns', 'mb-settings-page-ui' ), options: columns, description: __( 'The number of columns in the meta boxes. Can be 1 or 2. You might want to use 1 column with no-boxes style to match WordPress style.', 'mb-settings-page-ui' ), defaultValue: 1 },
	{ type: 'form', name: 'tabs', label: __( 'Tabs', 'mb-settings-page-ui' ) },
	{ type: 'select', name: 'tab_style', label: __( 'Tab style', 'mb-settings-page-ui' ), options: tabStyles, defaultValue: 'top' },
	{ type: 'text', name: 'submit_button', label: __( 'Custom submit button text', 'mb-settings-page-ui' ) },
	{ type: 'text', name: 'message', label: __( 'Message', 'mb-settings-page-ui' ), description: __( 'The custom message displayed when saving options.', 'mb-settings-page-ui' ) },
	{ type: 'checkbox', name: 'customizer', label: __( 'Show in the Customizer', 'mb-settings-page-ui' ) },
	{ type: 'checkbox', name: 'customizer_only', label: __( 'Show in the Customizer only', 'mb-settings-page-ui' ), description: __( 'Show only in the Customizer, no admin settings page', 'mb-settings-page-ui' ) },
	{ type: 'checkbox', name: 'network', label: __( 'Network', 'mb-settings-page-ui' ), description: __( 'Make the settings page network-wide (in multisite environment).', 'mb-settings-page-ui' ) },
];