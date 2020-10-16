import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const JsOptionsDate = ( { index } ) => (
	<KeyValue
		index={ index }
		name="js_options"
		link="https://api.jqueryui.com/datepicker/"
		label={ __( 'Date picker options', 'meta-box-builder' ) }
	/>
);
export default JsOptionsDate;