import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const OptionsFieldsetText = ( { index } ) => (
	<KeyValue
		index={ index }
		listType="options"
		label={ __( 'Inputs', 'meta-box-builder' ) }
		valuePlaceholder={ __( 'Enter label', 'meta-box-builder' ) }
	/>
);

export default OptionsFieldsetText;