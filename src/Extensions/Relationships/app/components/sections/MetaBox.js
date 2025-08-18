import { __ } from "@wordpress/i18n";
import Checkbox from "../../../../../../assets/app/controls/Checkbox";
import Input from "../../../../../../assets/app/controls/Input";
import ToggleGroup from "../../../../../../assets/app/controls/ToggleGroup";
import useSettings from "../../../../../../assets/app/hooks/useSettings";

const MetaBox = ( { id } ) => {
	const { getSetting, updateSetting } = useSettings();

	return (
		<>
			<Input
				name={ `${ id }.meta_box.title` }
				label={ __( 'Title', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.meta_box.title` ) }
				updateField={ updateSetting }
			/>
			<ToggleGroup
				name={ `${ id }.meta_box.context` }
				label={ __( 'Position', 'meta-box-builder' ) }
				options={ {
					normal: __( 'After content', 'meta-box-builder' ),
					side: __( 'Side', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( `${ id }.meta_box.context`, 'side' ) }
				updateField={ updateSetting }
			/>
			<ToggleGroup
				name={ `${ id }.meta_box.priority` }
				label={ __( 'Priority', 'meta-box-builder' ) }
				options={ {
					low: __( 'Low', 'meta-box-builder' ),
					high: __( 'High', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( `${ id }.meta_box.priority`, 'low' ) }
				updateField={ updateSetting }
			/>
			<ToggleGroup
				name={ `${ id }.meta_box.style` }
				label={ __( 'Style', 'meta-box-builder' ) }
				options={ {
					default: __( 'Default', 'meta-box-builder' ),
					seamless: __( 'Seamless', 'meta-box-builder' ),
				} }
				defaultValue={ getSetting( `${ id }.meta_box.style`, 'default' ) }
				updateField={ updateSetting }
			/>
			<Checkbox
				name={ `${ id }.meta_box.closed` }
				label={ __( 'Collapsed by default', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.meta_box.closed` ) }
				updateField={ updateSetting }
			/>
			<Input
				name={ `${ id }.meta_box.class` }
				label={ __( 'Custom CSS class', 'meta-box-builder' ) }
				defaultValue={ getSetting( `${ id }.meta_box.class` ) }
				updateField={ updateSetting }
			/>
		</>
	);
};

export default MetaBox;