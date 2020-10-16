import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const OptionsWysiwyg = ( { index } ) => (
	<KeyValue
		index={ index }
		type="options"
		link="https://developer.wordpress.org/reference/functions/wp_editor/"
		label={ __( 'Editor options', 'meta-box-builder' ) }
	/>
);
export default OptionsWysiwyg;