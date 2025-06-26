import { __ } from "@wordpress/i18n";
import Checkbox from "../../../../app/controls/Checkbox";
import DashiconPicker from "../../../../app/controls/DashiconPicker";
import FontAwesome from "../../../../app/controls/Fontawesome";
import Input from "../../../../app/controls/Input";
import KeyValue from "../../../../app/controls/KeyValue";
import Select from "../../../../app/controls/Select";
import ToggleGroup from "../../../../app/controls/ToggleGroup";
import useSettings from "../../../../app/hooks/useSettings";

const Content = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			{/* Menu */ }
			<ToggleGroup
				name="menu_type"
				label={ __( 'Menu type', 'meta-box-builder' ) }
				options={ {
					top: __( 'Top-level menu', 'meta-box-builder' ),
					submenu: __( 'Submenu', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'menu_type', 'top' ) }
				updateField={ updateSetting }
			/>
			{
				getSetting( 'menu_type', 'top' ) === 'top' &&
				<Select
					name="position"
					label={ __( 'Show menu after', 'meta-box-builder' ) }
					options={ MbbApp.menu_positions }
					defaultValue={ getSetting( 'position', 25 ) }
					updateField={ updateSetting }
				/>
			}
			{
				getSetting( 'menu_type', 'top' ) === 'submenu' &&
				<Select
					name="parent"
					label={ __( 'Parent menu', 'meta-box-builder' ) }
					options={ MbbApp.menu_parents }
					defaultValue={ getSetting( 'parent', 'index.php' ) }
					updateField={ updateSetting }
				/>
			}

			{/* Icon */ }
			{
				getSetting( 'menu_type', 'top' ) === 'top' &&
				<Select
					name="icon_type"
					label={ __( 'Icon type', 'meta-box-builder' ) }
					options={ {
						dashicons: __( 'Dashicons', 'meta-box-builder' ),
						font_awesome: __( 'Font Awesome', 'meta-box-builder' ),
						svg: __( 'SVG', 'meta-box-builder' ),
						custom: __( 'Custom URL', 'meta-box-builder' ),
					} }
					defaultValue={ getSetting( 'icon_type', 'dashicons' ) }
					updateField={ updateSetting }
				/>
			}
			{
				getSetting( 'menu_type', 'top' ) === 'top' && getSetting( 'icon_type', 'dashicons' ) === 'dashicons' &&
				<DashiconPicker
					name="icon_dashicons"
					label={ __( 'Icon', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_dashicons', 'admin-generic' ) }
					updateField={ updateSetting }
				/>
			}
			{
				getSetting( 'menu_type', 'top' ) === 'top' && getSetting( 'icon_type', 'dashicons' ) === 'svg' &&
				<Input
					name="icon_svg"
					label={ __( 'Icon SVG', 'meta-box-builder' ) }
					description={ __( 'Must be in base64 encoded format.', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_svg' ) }
					updateField={ updateSetting }
				/>
			}
			{
				getSetting( 'menu_type', 'top' ) === 'top' && getSetting( 'icon_type', 'dashicons' ) === 'custom' &&
				<Input
					name="icon_custom"
					label={ __( 'Icon URL', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_custom' ) }
					updateField={ updateSetting }
				/>
			}
			{
				getSetting( 'menu_type', 'top' ) === 'top' && getSetting( 'icon_type', 'dashicons' ) === 'font_awesome' &&
				<FontAwesome
					name="icon_font_awesome"
					label={ __( 'Icon', 'meta-box-builder' ) }
					description={ __( 'Enter <a target="_blank" href="https://fontawesome.com/search?o=r&m=free">FontAwesome</a> icon class here. Supports FontAwesome free version only.', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'icon_font_awesome' ) }
					updateField={ updateSetting }
				/>
			}

			{
				getSetting( 'menu_type', 'top' ) === 'top' &&
				<Input
					name="submenu_title"
					label={ __( 'Default first submenu title', 'meta-box-builder' ) }
					defaultValue={ getSetting( 'submenu_title' ) }
					updateField={ updateSetting }
				/>
			}

			<hr />

			{/* General Settings */ }
			<Select
				name="capability"
				label={ __( 'Required capability', 'meta-box-builder' ) }
				options={ MbbApp.capabilities || {} }
				defaultValue={ getSetting( 'capability', 'edit_theme_options' ) }
				updateField={ updateSetting }
			/>

			<hr />

			<Select
				name="style"
				label={ __( 'Style', 'meta-box-builder' ) }
				options={ {
					boxes: __( 'Boxes', 'meta-box-builder' ),
					'no-boxes': __( 'No boxes', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'style', 'no-boxes' ) }
				updateField={ updateSetting }
			/>
			<Select
				name="columns"
				label={ __( 'Columns', 'meta-box-builder' ) }
				options={ { 1: 1, 2: 2 } }
				defaultValue={ getSetting( 'columns', 1 ) }
				updateField={ updateSetting }
			/>

			{/* Tabs */ }
			<KeyValue
				name="tabs"
				label={ __( 'Tabs', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'tabs' ) }
				updateField={ updateSetting }
			/>
			<Select
				name="tab_style"
				label={ __( 'Tab style', 'meta-box-builder' ) }
				options={ {
					default: __( 'Top', 'meta-box-builder' ),
					left: __( 'Left', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'tab_style', 'default' ) }
				updateField={ updateSetting }
			/>

			<Input
				name="class"
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				description={ __( 'Custom CSS for the wrapper div', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'class' ) }
				updateField={ updateSetting }
			/>

			<hr />

			{/* Submit and Messages */ }
			<Input
				name="submit_button"
				label={ __( 'Custom submit button', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'submit_button' ) }
				updateField={ updateSetting }
			/>
			<Input
				name="message"
				label={ __( 'Custom message', 'meta-box-builder' ) }
				description={ __( 'The custom message displayed when saving options', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'message' ) }
				updateField={ updateSetting }
			/>

			{/* Help Tabs */ }
			<KeyValue
				name="help_tabs"
				label={ __( 'Help tabs', 'meta-box-builder' ) }
				tooltip={ __( 'The content displayed when clicking on the Help button on the top right (near the Screen Options button). HTML is allowed.', 'meta-box-builder' ) }
				keyPlaceholder={ __( 'Title', 'meta-box-builder' ) }
				valuePlaceholder={ __( 'Content', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'help_tabs' ) }
				updateField={ updateSetting }
			/>

			{/* Extensions */ }
			<Checkbox
				name="customizer"
				label={ __( 'Customizer', 'meta-box-builder' ) }
				description={ __( 'Show this settings page as a panel in the Customizer', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'customizer', false ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name="customizer_only"
				label={ __( 'Customizer only', 'meta-box-builder' ) }
				description={ __( 'Show only in the Customizer, no admin settings page', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'customizer_only', false ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name="network"
				label={ __( 'Network', 'meta-box-builder' ) }
				description={ __( 'Make the settings page network-wide (in multisite environment)', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'network', false ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default Content;