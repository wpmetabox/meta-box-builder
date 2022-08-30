import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import dotProp from 'dot-prop';
import { FieldIdsContext } from "../contexts/FieldIdsContext";
import { getFieldValue, ucwords, uniqid } from '../functions';

const useFields = ( initialFields, baseId ) => {
	const { updateFieldId, removeFieldId } = useContext( FieldIdsContext );
	const [ fields, setFields ] = useState( initialFields );

	const addField = type => {
		const id = `${ type }_${ uniqid() }`;
		const newField = { _id: id, _new: true, id, type, name: ucwords( type, '_' ) };

		updateFieldId( id, newField );
		setFields( prev => [ ...prev, newField ] );
	};

	const removeField = id => {
		removeFieldId( id );
		setFields( prev => prev.filter( field => field._id !== id ) );
	};

	const duplicateField = id => {
		let newField = getFieldValue( `${ baseId }[${ id }]` );
		const newId = `${ dotProp.get( newField, 'type' ) }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField._new = true;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		updateFieldId( newId, newField );
		setFields( prev => {
			const index = prev.findIndex( field => field._id === id );
			let newFields = [ ...prev ];
			newFields.splice( index + 1, 0, newField );

			return newFields;
		} );
	};

	const updateFieldType = ( id, type ) => setFields( prev => {
		const index = prev.findIndex( field => field._id === id );
		let newFields = [ ...prev ];

		// Maintain existing input values.
		newFields[ index ] = { ...getFieldValue( `${ baseId }[${ id }]` ), type };

		return newFields;
	} );

	return {
		fields,
		addField,
		removeField,
		duplicateField,
		updateFieldType,
		setFields,
	};
};

export default useFields;