import dotProp from 'dot-prop';
import KeyValue from '../../Common/KeyValue';
const { __ } = wp.i18n;

export const CustomSettings = ( { defaultValues } ) => <KeyValue
	name="custom_settings"
	defaultValue={ dotProp.get( defaultValues, 'custom_settings', [] ) }
	label={ __( 'Custom settings', 'meta-box-builder' ) }
	tooltip={ __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ) }
/>;