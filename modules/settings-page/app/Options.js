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
	{ type: 'text', name: 'option_name', label: __( 'Option name', 'meta-box-builder' ), tooltip: __( 'Option name where settings data is saved to. Takes settings page ID if missed. If you want to use theme mods, then set this to <code>theme_mods_$themeslug</code>.', 'meta-box-builder' ) },
	{ type: 'text', name: 'class', label: __( 'Custom CSS class', 'meta-box-builder' ), tooltip: __( 'Custom CSS for the wrapper div.', 'meta-box-builder' ) },
	{ type: 'select', name: 'capability', label: __( 'Capability', 'meta-box-builder' ), options: MBSPUI.capabilities, defaultValue: 'edit_theme_options', tooltip: __( 'Require capability to access the settings page', 'meta-box-builder' ) },
	{ type: 'select', name: 'icon_type', options: iconTypes, label: __( 'Icon type', 'meta-box-builder' ), defaultValue: 'dashicons' },
	{ type: 'icon', name: 'icon_dashicons', label: __( 'Icon', 'meta-box-builder' ), dependency: 'icon_type:dashicons' },
	{ type: 'text', name: 'icon_svg', label: __( 'Icon SVG', 'meta-box-builder' ), tooltip: __( 'Must be in base64 encoded format', 'meta-box-builder' ), dependency: 'icon_type:svg' },
	{ type: 'text', name: 'icon_url', label: __( 'Icon URL', 'meta-box-builder' ), dependency: 'icon_type:custom' },
	{ type: 'select', name: 'position', label: __( 'Menu position after', 'meta-box-builder' ), options: MBSPUI.menu_positions },
	{ type: 'select', name: 'parent', label: __( 'Parent menu', 'meta-box-builder' ), options: MBSPUI.parents, defaultValue: 'none' },
	{ type: 'text', name: 'submenu_title', label: __( 'Submenu title', 'meta-box-builder' ), tooltip: __( 'Set this to the default submenu title (first submenu) if the settings page is a top-level menu.', 'meta-box-builder' ) },
	{ type: 'textarea', name: 'help_tabs', label: __( 'Help content', 'meta-box-builder' ), tootlip: __( 'The content displayed when clicking on the Help button on the top right (near the Screen Options button).', 'meta-box-builder' ) },
	{ type: 'select', name: 'style', label: __( 'Style', 'meta-box-builder' ), options: styles, defaultValue: 'boxes' },
	{ type: 'select', name: 'columns', label: __( 'Columns', 'meta-box-builder' ), options: columns, tooltip: __( 'The number of columns in the meta boxes. Use 1 column with no boxes style to match WordPress style.', 'meta-box-builder' ), defaultValue: 1 },
	{ type: 'key_value', name: 'tabs', label: __( 'Tabs', 'meta-box-builder' ) },
	{ type: 'select', name: 'tab_style', label: __( 'Tab style', 'meta-box-builder' ), options: tabStyles, defaultValue: 'top' },
	{ type: 'text', name: 'submit_button', label: __( 'Custom submit button text', 'meta-box-builder' ) },
	{ type: 'text', name: 'message', label: __( 'Custom message', 'meta-box-builder' ), tooltip: __( 'The custom message displayed when saving options.', 'meta-box-builder' ) },
	{ type: 'checkbox', name: 'customizer', label: __( 'Show in the Customizer', 'meta-box-builder' ), tooltip: __( 'Show this settings page as a panel in the Customizer', 'meta-box-builder' ) },
	{ type: 'checkbox', name: 'customizer_only', label: __( 'Show in the Customizer only', 'meta-box-builder' ), tooltip: __( 'Show only in the Customizer, no admin settings page', 'meta-box-builder' ) },
	{ type: 'checkbox', name: 'network', label: __( 'Network', 'meta-box-builder' ), tooltip: __( 'Make the settings page network-wide (in multisite environment).', 'meta-box-builder' ) },
];