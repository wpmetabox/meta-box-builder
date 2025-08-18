import { __ } from "@wordpress/i18n";
import Checkbox from "../../../../../../assets/app/controls/Checkbox";
import Input from "../../../../../../assets/app/controls/Input";
import KeyValue from "../../../../../../assets/app/controls/KeyValue";
import useSettings from "../../../../../../assets/app/hooks/useSettings";

const Advanced = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
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
			<KeyValue
				name="help_tabs"
				label={ __( 'Help tabs', 'meta-box-builder' ) }
				tooltip={ __( 'The content displayed when clicking on the Help button on the top right (near the Screen Options button). HTML is allowed.', 'meta-box-builder' ) }
				keyPlaceholder={ __( 'Title', 'meta-box-builder' ) }
				valuePlaceholder={ __( 'Content', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'help_tabs' ) }
				updateField={ updateSetting }
			/>
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

export default Advanced;
