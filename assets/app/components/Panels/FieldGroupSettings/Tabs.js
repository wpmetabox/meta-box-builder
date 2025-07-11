import { __ } from "@wordpress/i18n";
import Input from "../../../controls/Input";
import ToggleGroup from "../../../controls/ToggleGroup";
import useSettings from "../../../hooks/useSettings";

const Tabs = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<ToggleGroup
				label={ __( 'Tab style', 'meta-box-builder' ) }
				tooltip={ __( 'Change how look and feel of tabs in Meta Box Tabs', 'meta-box-builder' ) }
				name="tab_style"
				options={ {
					default: __( 'Default', 'meta-box-builder' ),
					box: __( 'Box', 'meta-box-builder' ),
					left: __( 'Left', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'tab_style', 'default' ) }
				updateField={ updateSetting }
			/>
			<Input
				label={ __( 'Default active tab ID', 'meta-box-builder' ) }
				name="tab_default_active"
				defaultValue={ getSetting( 'tab_default_active', '' ) }
				updateField={ updateSetting }
			/>
		</>
	);
}

export default Tabs;