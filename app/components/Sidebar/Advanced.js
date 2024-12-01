import { __ } from "@wordpress/i18n";
import DivRow from '../../controls/DivRow';
import Input from "../../controls/Input";
import KeyValue from "../../controls/KeyValue";
import useSettings from "../../hooks/useSettings";

const Advanced = () => {
	const { getSetting, getPrefix, updatePrefix } = useSettings();

	return (
		<>
			<Input
				name="settings[class]"
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				tooltip={ __( 'Custom CSS class for the wrapper div', 'meta-box-builder' ) }
				componentId="settings-class"
				defaultValue={ getSetting( 'class', '' ) }
			/>
			<DivRow
				htmlFor="settings-prefix"
				label={ __( 'Field ID prefix', 'meta-box-builder' ) }
				tooltip={ __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden from the default WordPress\'s Custom Fields meta box.', 'meta-box-builder' ) }
			>
				<input
					type="text"
					id="settings-prefix"
					name="settings[prefix]"
					defaultValue={ getPrefix() }
					onChange={ e => updatePrefix( e.target.value ) }
				/>
			</DivRow>

			<KeyValue
				name="settings[custom_settings]"
				label={ __( 'Custom settings', 'meta-box-builder' ) }
				tooltip={ __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ) }
				componentId="settings-custom_settings"
				defaultValue={ getSetting( 'custom_settings', {} ) }
			/>
		</>
	);
};

export default Advanced;