import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const JsOptions = ( { index } ) => (
	<KeyValue
		index={ index }
		type="js_options"
		link="https://select2.org/configuration"
		label={ __( 'Select2 options', 'meta-box-builder' ) }
	/>
);
export default JsOptions;