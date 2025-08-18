import { __ } from "@wordpress/i18n";
import Checkbox from "../../../../../assets/app/controls/Checkbox";
import Input from "../../../../../assets/app/controls/Input";
import useSettings from "../../../../../assets/app/hooks/useSettings";

const GeneralSettings = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<Input
				name="id"
				label={ __( 'ID', 'meta-box-builder' ) }
				description={ __( 'Must be unique between relationships. Use only lowercase letters, numbers, underscores (not recommended dashes).', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'id' ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name="delete_data"
				componentId="settings-delete-data"
				label={ __( 'Delete data in database?' ) }
				defaultValue={ !!getSetting( 'delete_data' ) }
				className="relationships-plain"
				description={ __( 'Delete data in database when the relationship is deleted.', 'meta-box-builder' ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name="reciprocal"
				componentId="settings-reciprocal"
				label={ __( 'Reciprocal relationship' ) }
				defaultValue={ !!getSetting( 'reciprocal' ) }
				className="relationships-plain"
				description={ __( 'Enable only if two sides of the relationship are the same.', 'meta-box-builder' ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default GeneralSettings;