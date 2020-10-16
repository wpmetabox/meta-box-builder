import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const JsOptionsSlider = ( { index } ) => (
	<KeyValue
		index={ index }
		type="js_options"
		link="https://api.jqueryui.com/slider"
		label={ __( 'jQueryUI slider options', 'meta-box-builder' ) }
	/>
);
export default JsOptionsSlider;