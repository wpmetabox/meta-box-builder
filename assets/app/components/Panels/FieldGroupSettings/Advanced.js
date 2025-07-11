import { __ } from "@wordpress/i18n";
import DivRow from '../../../controls/DivRow';
import Input from "../../../controls/Input";
import KeyValue from "../../../controls/KeyValue";
import useSettings from "../../../hooks/useSettings";

const Advanced = () => {
	const { getSetting, getPrefix, updatePrefix, updateSetting } = useSettings();

	return (
		<>
			<Input
				name="class"
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				description={ __( 'Custom CSS class for the wrapper div.', 'meta-box-builder' ) }
				componentId="settings-class"
				defaultValue={ getSetting( 'class', '' ) }
				updateField={ updateSetting }
			/>
			<DivRow
				htmlFor="settings-prefix"
				label={ __( 'Field ID prefix', 'meta-box-builder' ) }
				description={ __( 'Add a prefix to all field IDs to keep them separated from other field groups or other plugins.', 'meta-box-builder' ) }
			>
				<input
					type="text"
					id="settings-prefix"
					name="prefix"
					defaultValue={ getPrefix() }
					onChange={ e => updatePrefix( e.target.value ) }
				/>
			</DivRow>
			<KeyValue
				name="custom_settings"
				label={ __( 'Custom settings', 'meta-box-builder' ) }
				description={ __( 'Add custom settings to the field. Will overwrite existing settings if they have the <a href="https://docs.metabox.io/creating-fields-with-code/#field-group-settings" target="_blank">same key</a>. Use <a href="https://docs.metabox.io/extensions/meta-box-builder/#custom-settings" target="_blank">dot/JSON notation</a> to add nested settings.', 'meta-box-builder' ) }
				componentId="settings-custom_settings"
				defaultValue={ getSetting( 'custom_settings', {} ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default Advanced;