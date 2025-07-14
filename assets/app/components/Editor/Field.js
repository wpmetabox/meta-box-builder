import { memo } from "@wordpress/element";
import { isEqual } from 'lodash';
import FieldPreview from "./FieldPreview";
import FieldSettings from './FieldSettings';

const Field = ( { field, parent = '', ...fieldActions } ) => {
	const update = ( key, value ) => {
		if ( key.includes( '[' ) ) {
			// Get correct key in the last [].
			key = key.replace( /\]/g, '' ).split( '[' ).pop();
		}

		fieldActions.updateField( field._id, key, value );
	};

	return field.type && (
		<>
			<FieldPreview field={ field } parent={ parent } { ...fieldActions } />
			<FieldSettings field={ field } parent={ parent } updateField={ update } />
		</>
	);
};

export default memo( Field, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
