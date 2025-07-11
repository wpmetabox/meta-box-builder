import { memo } from "@wordpress/element";

const KeyValue = ( { field } ) => {
	return (
		<>
			<input type="text" placeholder={ field.placeholder_key } />
			<input type="text" placeholder={ field.placeholder_value } />
		</>
	);
};

export default memo( KeyValue, ( prev, next ) => (
	prev.field.placeholder_key === next.field.placeholder_key
	&& prev.field.placeholder_value === next.field.placeholder_value
) );