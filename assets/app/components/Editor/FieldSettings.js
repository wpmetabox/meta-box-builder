import { memo } from "@wordpress/element";
import { isEqual } from 'lodash';
import { useFetch } from "../../hooks/useFetch";
import getList from "../../list-functions";
import Panel from "../Panels/FieldSettings/Panel";

const FieldSettings = ( { field, parent, updateField } ) => {
	let { data: fieldTypes } = useFetch( { api: 'field-types', defaultValue: {} } );
	fieldTypes = Object.fromEntries(
		Object.entries( fieldTypes ).filter( ( [ type, field ] ) => !field.disabled )
	);

	// Safe fallback to 'text' for not-recommended HTML5 field types.
	const ignore = [ 'datetime-local', 'month', 'tel', 'week' ];
	const type = ignore.includes( field.type ) ? 'text' : field.type;

	if ( !type || !fieldTypes.hasOwnProperty( type ) ) {
		return;
	}

	const controls = [ ...fieldTypes[ type ].controls ];

	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		updateField( field._id, key, value );
	};

	return (
		<>
			{
				// Render field settings only when the field is active.
				field._active &&
				<Panel
					controls={ controls }
					field={ field }
					parent={ parent }
					updateField={ update }
				/>
			}
			{
				type === 'group' &&
				<SubFieldSettings
					field={ field }
					parent={ `${ parent }[${ field._id }][fields]` }
				/>
			}
		</>
	);
};

const SubFieldSettings = ( { field, parent } ) => {
	const { fields, ...fieldActions } = getList( field._id )();

	return fields.map( f => (
		<FieldSettings key={ f._id } field={ f } parent={ parent } updateField={ fieldActions.updateField } />
	) );
};

// Still need to memoize the field settings because group loads this component separately for each sub-field.
export default memo( FieldSettings, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );