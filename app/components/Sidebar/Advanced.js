import { __ } from "@wordpress/i18n";
import Input from "../../controls/Input";
import KeyValue from "../../controls/KeyValue";
import { getSettings } from "../../functions";

const settings = getSettings();

const Advanced = () => (
	<>
		<Input
			name="settings[class]"
			label={ __( 'Custom CSS class', 'meta-box-builder' ) }
			tooltip={ __( 'Custom CSS class for the wrapper div', 'meta-box-builder' ) }
			componentId="settings-class"
			defaultValue={ settings?.class || '' }
		/>
		<Input
			name="settings[prefix]"
			label={ __( 'Field ID prefix', 'meta-box-builder' ) }
			tooltip={ __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden from the default WordPress\'s Custom Fields meta box.', 'meta-box-builder' ) }
			componentId="settings-prefix"
			defaultValue={ settings?.prefix || '' }
		/>
		<KeyValue
			name="settings[custom_settings]"
			label={ __( 'Custom settings', 'meta-box-builder' ) }
			tooltip={ __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ) }
			componentId="settings-custom_settings"
			defaultValue={ settings?.custom_settings || {} }
		/>
	</>
);

export default Advanced;