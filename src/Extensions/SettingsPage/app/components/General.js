import { __ } from "@wordpress/i18n";
import Select from "../../../../../app/controls/Select";
import useSettings from "../../../../../app/hooks/useSettings";

const General = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<Select
			name="capability"
			label={ __( 'Required capability', 'meta-box-builder' ) }
			options={ MbbApp.capabilities || {} }
			defaultValue={ getSetting( 'capability', 'edit_theme_options' ) }
			updateField={ updateSetting }
		/>
	);
};

export default General;
