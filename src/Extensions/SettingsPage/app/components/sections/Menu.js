import { __ } from "@wordpress/i18n";
import DashiconPicker from "../../../../../../assets/app/controls/DashiconPicker";
import FontAwesome from "../../../../../../assets/app/controls/Fontawesome";
import Input from "../../../../../../assets/app/controls/Input";
import Select from "../../../../../../assets/app/controls/Select";
import ToggleGroup from "../../../../../../assets/app/controls/ToggleGroup";
import useSettings from "../../../../../../assets/app/hooks/useSettings";

const Menu = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
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
			{
				getSetting( 'menu_type', 'top' ) === 'top' &&
				<ToggleGroup
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
		</>
	);
};

export default Menu;
