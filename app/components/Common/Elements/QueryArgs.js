import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const QueryArgs = ( { index } ) => (
	<KeyValue
		index={ index }
		listType="query_args"
		link="https://developer.wordpress.org/reference/classes/wp_query/"
		label={ __( 'Query args', 'meta-box-builder' ) }
		tooltip={ __( 'Query arguments for getting posts. Same as in the WP_Query class.', 'meta-box-builder' ) }
	/>
);
export default QueryArgs;