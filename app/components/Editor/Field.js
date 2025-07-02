import { useFetch } from "../../hooks/useFetch";
import FieldSettings from "../Panels/FieldSettings/FieldSettings";

const Field = props => {
	const { data: fieldTypes } = useFetch( { api: 'field-types', defaultValue: {} } );

	// Safe fallback to 'text' for not-recommended HTML5 field types.
	const ignore = [ 'datetime-local', 'month', 'tel', 'week' ];
	const type = ignore.includes( props.field.type ) ? 'text' : props.field.type;

	if ( !type || !fieldTypes.hasOwnProperty( type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ type ].controls ];

	return <FieldSettings controls={ controls } { ...props } />;
};

export default Field;