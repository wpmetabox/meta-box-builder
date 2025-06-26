import { __ } from "@wordpress/i18n";
import Input from "../../../../../app/controls/Input";
import Select from "../../../../../app/controls/Select";
import useSettings from "../../../../../app/hooks/useSettings";

const General = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<Input
				name="id"
				label={ __( 'ID', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'id' ) }
				updateField={ updateSetting }
			/>
			<Input
				name="option_name"
				label={ __( 'Option name', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'option_name', getSetting( 'id' ) ) }
				description={ __( 'Takes settings page ID if missed. If you want to use theme mods (to compatible with the settings in the Customizer), set it to <code>theme_mods_$themeslug</code>.', 'meta-box-builder' ) }
				updateField={ updateSetting }
			/>
			<Select
				name="capability"
				label={ __( 'Required capability', 'meta-box-builder' ) }
				options={ MbbApp.capabilities || {} }
				defaultValue={ getSetting( 'capability', 'edit_theme_options' ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default General;
