import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const OptionsTextList = ( { index } ) => (
	<KeyValue
		index={ index }
		type="options"
		label={ __( 'Inputs', 'meta-box-builder' ) }
		keyPlaceholder={ __( 'Placeholder', 'meta-box-builder' ) }
		valuePlaceholder={ __( 'Label', 'meta-box-builder' ) }
	/>
);

export default OptionsTextList;