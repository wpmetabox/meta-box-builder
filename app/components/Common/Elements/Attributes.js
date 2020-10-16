import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const Attributes = ( { index } ) => (
	<KeyValue
		index={ index }
		type="attributes"
		link="https://docs.metabox.io/extensions/meta-box-builder/#custom-attributes"
		label={ __( 'Custom settings', 'meta-box-builder' ) }
	/>
);

export default Attributes;