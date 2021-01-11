import dotProp from 'dot-prop';
import Input from './Input';
import Select from './Select';
const { __ } = wp.i18n;

const Tabs = ( { settings } ) => <>
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
		defaultValue={ dotProp.get( settings, 'tab_style', 'default' ) }
	/>
	<Input
		name="settings[tab_default_active]"
		label={ __( 'Default active tab ID', 'meta-box-builder' ) }
		componentId="settings-tab-default-active"
		defaultValue={ dotProp.get( settings, 'tab_default_active' ) }
	/>
</>;

export default Tabs;