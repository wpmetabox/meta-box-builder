import { __ } from "@wordpress/i18n";
import Input from "../../../../../../assets/app/controls/Input";
import Select from "../../../../../../assets/app/controls/Select";
import useSettings from "../../../../../../assets/app/hooks/useSettings";

const General = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<Input
				name="id"
				label={ __( 'ID', 'meta-box-builder' ) }
				description={ __( 'Must be unique between settings pages. Use only lowercase letters, numbers, underscores and dashes.', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'id' ) }
				updateField={ updateSetting }
			/>
			<Input
				name="option_name"
				label={ __( 'Option name', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'option_name', getSetting( 'id' ) ) }
				description={ __( 'Used as the object ID when getting settings values with helper functions. Takes settings page ID if missed. If you want to use theme mods (to compatible with the settings in the Customizer), set it to <code>theme_mods_$themeslug</code>.', 'meta-box-builder' ) }
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
