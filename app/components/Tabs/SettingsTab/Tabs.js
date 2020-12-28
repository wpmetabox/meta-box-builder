import dotProp from 'dot-prop';
import Checkbox from '../../Common/Checkbox';
import Select from '../../Common/Select';
const { __ } = wp.i18n;

export const Tabs = ( { defaultValues } ) => <>
	<Select
		name="settings[tab_style]"
		label={ __( 'Tab style', 'meta-box-builder' ) }
		options={ {
			default: __( 'Default', 'meta-box-builder' ),
			box: __( 'Box', 'meta-box-builder' ),
			left: __( 'Left', 'meta-box-builder' ),
		} }
		componentId="settings-tab-style"
		defaultValue={ dotProp.get( defaultValues, 'tab_style', 'default' ) }
	/>
	<Checkbox
		name="settings[tab_wrapper]"
		label={ __( 'Show meta box wrapper', 'meta-box-builder' ) }
		componentId="settings-tab-wrapper"
		defaultValue={ dotProp.get( defaultValues, 'tab_wrapper', true ) }
	/>
</>;