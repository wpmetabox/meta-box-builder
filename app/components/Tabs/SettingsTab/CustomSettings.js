import KeyValue from '../../Common/KeyValue';
const { __ } = wp.i18n;

export const CustomSettings = () => <KeyValue
	label={ __( 'Custom settings', 'meta-box-builder' ) }
	tooltip={ __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced and set.', 'meta-box-builder' ) }
/>;