import { __ } from "@wordpress/i18n";
import Input from "../../controls/Input";
import ToggleGroup from "../../controls/ToggleGroup";
import { getSettings } from "../../functions";

const settings = getSettings();

const Tabs = () => (
	<>
		<ToggleGroup
			label={ __( 'Tab style', 'meta-box-builder' ) }
			tooltip={ __( 'Change how look and feel of tabs in Meta Box Tabs', 'meta-box-builder' ) }
			name="settings[tab_style]"
			options={ {
				default: __( 'Default', 'meta-box-builder' ),
				box: __( 'Box', 'meta-box-builder' ),
				left: __( 'Left', 'meta-box-builder' ),
			} }
			defaultValue={ settings?.tab_style || 'default' }
		/>
		<Input
			label={ __( 'Default active tab ID', 'meta-box-builder' ) }
			name="settings[tab_default_active]"
			defaultValue={ settings?.tab_default_active || '' }
		/>
	</>
);

export default Tabs;