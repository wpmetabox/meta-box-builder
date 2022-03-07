import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import dotProp from 'dot-prop';
import { useImmer } from "use-immer";
import { FieldIdsContext } from "../contexts/FieldIdsContext";
import { getFieldValue, ucwords, uniqid } from '../functions';

const useFields = ( initialFields, baseId ) => {
	const { updateFieldId, removeFieldId } = useContext( FieldIdsContext );
	const [ fields, setFields ] = useImmer( initialFields );

	const addField = type => {
		const id = `${ type }_${ uniqid() }`;
		const newField = { _id: id, _new: true, id, type, name: ucwords( type, '_' ) };

		updateFieldId( id, newField );
		setFields( draft => {
			draft.push( newField );
		} );
	};

	const removeField = id => {
		removeFieldId( id );
		setFields( draft => {
			const index = draft.findIndex( field => field._id === id );
			draft.splice( index, 1 );
		} );
	};

	const duplicateField = id => {
		let newField = getFieldValue( `${ baseId }[${ id }]` );
		const newId = `${ dotProp.get( newField, 'type' ) }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField._new = true;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		updateFieldId( newId, newField );
		setFields( draft => {
			const index = draft.findIndex( field => field._id === id );
			draft.splice( index + 1, 0, newField );
		} );
	};

	const updateFieldType = ( id, type ) => setFields( draft => {
		const index = draft.findIndex( field => field._id === id );
		// Maintain existing input values.
		draft[ index ] = { ...getFieldValue( `${ baseId }[${ id }]` ), type };
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