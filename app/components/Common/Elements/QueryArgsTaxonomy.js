import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const QueryArgs = ( { index } ) => (
	<KeyValue
		index={ index }
		type="query_args"
		link="https://developer.wordpress.org/reference/functions/get_terms/"
		label={ __( 'Query args', 'meta-box-builder' ) }
		tooltip={ __( 'Query arguments for getting terms. Same as in the get_terms() function.', 'meta-box-builder' ) }
	/>
);
export default QueryArgs;