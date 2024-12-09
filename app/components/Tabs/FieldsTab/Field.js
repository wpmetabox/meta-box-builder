import useApi from "../../../hooks/useApi";
import FieldSettings from "../../Sidebar/FieldSettings";

const Field = props => {
	const fieldTypes = useApi( 'field-types', {} );

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