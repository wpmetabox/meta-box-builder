import { __ } from "@wordpress/i18n";
import Input from "../../../../../app/controls/Input";
import KeyValue from "../../../../../app/controls/KeyValue";
import ToggleGroup from "../../../../../app/controls/ToggleGroup";
import useSettings from "../../../../../app/hooks/useSettings";

const Appearance = () => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<ToggleGroup
				name="style"
				label={ __( 'Style', 'meta-box-builder' ) }
				options={ {
					boxes: __( 'Boxes', 'meta-box-builder' ),
					'no-boxes': __( 'No boxes', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'style', 'no-boxes' ) }
				updateField={ updateSetting }
			/>
			<ToggleGroup
				name="columns"
				label={ __( 'Columns', 'meta-box-builder' ) }
				options={ { 1: 1, 2: 2 } }
				defaultValue={ getSetting( 'columns', 1 ) }
				updateField={ updateSetting }
			/>
			<KeyValue
				name="tabs"
				label={ __( 'Tabs', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'tabs' ) }
				updateField={ updateSetting }
			/>
			<ToggleGroup
				name="tab_style"
				label={ __( 'Tab style', 'meta-box-builder' ) }
				options={ {
					default: __( 'Top', 'meta-box-builder' ),
					left: __( 'Left', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( 'tab_style', 'default' ) }
				updateField={ updateSetting }
			/>
			<Input
				name="class"
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				description={ __( 'Custom CSS for the wrapper div', 'meta-box-builder' ) }
				defaultValue={ getSetting( 'class' ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default Appearance;
