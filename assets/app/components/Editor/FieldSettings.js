import { useFetch } from "../../hooks/useFetch";
import Panel from "../Panels/FieldSettings/Panel";

export default ( props ) => {
	const { data: fieldTypes } = useFetch( { api: 'field-types', defaultValue: {} } );

	// Safe fallback to 'text' for not-recommended HTML5 field types.
	const ignore = [ 'datetime-local', 'month', 'tel', 'week' ];
	const type = ignore.includes( props.field.type ) ? 'text' : props.field.type;

	if ( !type || !fieldTypes.hasOwnProperty( type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ type ].controls ];

	return <Panel controls={ controls } { ...props } />;
};