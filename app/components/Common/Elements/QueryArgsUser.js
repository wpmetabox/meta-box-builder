import KeyValue from '../KeyValue';
const { __ } = wp.i18n;

const QueryArgs = ( { index } ) => (
	<KeyValue
		index={ index }
		listType="query_args"
		link="https://codex.wordpress.org/Function_Reference/get_users"
		label={ __( 'Query args', 'meta-box-builder' ) }
		tooltip={ __( 'Query arguments for getting user. Same as in the get_user() function.', 'meta-box-builder' ) }
	/>
);

export default QueryArgs;