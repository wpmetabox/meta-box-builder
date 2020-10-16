import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const JsOptionsTime = ( { index } ) => (
	<KeyValue
		index={ index }
		type="js_options"
		link="http://trentrichardson.com/examples/timepicker"
		label={ __( 'Time picker options', 'meta-box-builder' ) }
	/>
);
export default JsOptionsTime;