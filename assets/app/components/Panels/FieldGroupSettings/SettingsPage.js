import { __ } from "@wordpress/i18n";
import Toggle from "../../../controls/Toggle";
import ToggleGroup from "../../../controls/ToggleGroup";
import { ensureArray } from "../../../functions";
import useSettings from "../../../hooks/useSettings";

export default () => {
	const { getSetting, updateSetting } = useSettings();
	const settingsPages = ensureArray( getSetting( 'settings_pages', [] ) );
	const selectedSettingsPage = MbbApp.settingsPages.find( p => settingsPages.includes( p.id ) );
	const columns = selectedSettingsPage ? selectedSettingsPage.columns : 2;
	const style = selectedSettingsPage ? selectedSettingsPage.style : 'boxes';

	const contextOptions = {
		normal: __( 'Main area', 'meta-box-builder' ),
		side: __( 'Side', 'meta-box-builder' ),
	};

	return <>
		{
			columns > 1 &&
			<ToggleGroup
				name="context"
				label={ __( 'Position', 'meta-box-builder' ) }
				options={ contextOptions }
				defaultValue={ getSetting( 'context', 'normal' ) }
				updateField={ updateSetting }
			/>
		}
		<ToggleGroup
			name="priority"
			label={ __( 'Priority', 'meta-box-builder' ) }
			options={ { high: __( 'High', 'meta-box-builder' ), low: __( 'Low', 'meta-box-builder' ) } }
			defaultValue={ getSetting( 'priority', 'high' ) }
			updateField={ updateSetting }
		/>
		{
			style === 'boxes' &&
			<ToggleGroup
				name="style"
				label={ __( 'Style', 'meta-box-builder' ) }
				options={ { default: __( 'Standard', 'meta-box-builder' ), seamless: __( 'Seamless', 'meta-box-builder' ) } }
				defaultValue={ getSetting( 'style', 'default' ) }
				updateField={ updateSetting }
			/>
		}
		{
			style === 'boxes' &&
			<Toggle
				name="closed"
				label={ __( 'Collapsed by default', 'meta-box-builder' ) }
				tooltip={ __( 'Whether to collapse the meta box when page loads', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'closed', false ) }
				updateField={ updateSetting }
			/>
		}
		{
			style === 'boxes' &&
			<Toggle
				name="default_hidden"
				label={ __( 'Hidden by default', 'meta-box-builder' ) }
				tooltip={ __( 'The meta box is hidden by default and requires users to select the corresponding checkbox in Screen Options to show it', 'meta-box-builder' ) }
				defaultValue={ !!getSetting( 'default_hidden', false ) }
				updateField={ updateSetting }
			/>
		}
	</>;
};