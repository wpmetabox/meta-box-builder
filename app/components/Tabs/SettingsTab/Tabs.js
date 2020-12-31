import dotProp from 'dot-prop';
import Input from '../../Common/Input';
import Select from '../../Common/Select';
const { __ } = wp.i18n;

export const Tabs = ( { defaultValues } ) => <>
	<Select
		name="settings[tab_style]"
		label={ __( 'Tab style', 'meta-box-builder' ) }
		tooltip={ __( 'Change how look and feel of tabs in Meta Box Tabs', 'meta-box-builder' ) }
		options={ {
			default: __( 'Default', 'meta-box-builder' ),
			box: __( 'Box', 'meta-box-builder' ),
			left: __( 'Left', 'meta-box-builder' ),
		} }
		componentId="settings-tab-style"
		defaultValue={ dotProp.get( defaultValues, 'tab_style', 'default' ) }
	/>
	<Input
		name="settings[tab_default_active]"
		label={ __( 'Default active tab ID', 'meta-box-builder' ) }
		componentId="settings-tab-default-active"
		defaultValue={ dotProp.get( defaultValues, 'tab_default_active' ) }
	/>
</>;