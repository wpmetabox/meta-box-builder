import dotProp from 'dot-prop';
import { ReactSortable } from 'react-sortablejs';
import { FieldIdsContext } from '../../contexts/FieldIdsContext';
import { FieldsDataContext } from '../../contexts/FieldsDataContext';
import { getFieldValue, ucwords, uniqid } from '../../functions';
import { Inserter } from '../Controls/Inserter';
import Node from './FieldsTab/Node';

const { useContext, useState } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = props => {
	const { updateFieldId, removeFieldId } = useContext( FieldIdsContext );
	const [ fields, setFields ] = useState( Object.values( props.fields ) );

	// Don't render any field if fields data is not available.
	const { fieldsData } = useContext( FieldsDataContext );
	if ( Object.keys( fieldsData ).length === 0 ) {
		return <p className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</p>;
	}

	const addField = type => setFields( prev => {
		const id = `${ type }_${ uniqid() }`;
		const newField = { _id: id, _new: true, id, type, name: ucwords( type, '_' ) };
		updateFieldId( id, newField );
		return [ ...prev, newField ];
	} );

	const removeField = id => setFields( prev => {
		removeFieldId( id );
		return prev.filter( field => field._id !== id );
	} );

	const duplicateField = id => setFields( prev => {
		let newField = getFieldValue( `fields[${ id }]` );
		const newId = `${ dotProp.get( newField, 'type' ) }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField._new = true;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		updateFieldId( newId, newField );

		const index = prev.findIndex( field => field._id === id );
		let newFields = [ ...prev ];
		newFields.splice( index + 1, 0, newField );

		return newFields;
	} );

	const updateFieldType = ( id, type ) => setFields( prev => {
		// Maintain existing input values.
		let newField = getFieldValue( `fields[${ id }]` );
		newField.type = type;

		const index = prev.findIndex( field => field._id === id );
		let newFields = [ ...prev ];
		newFields[ index ] = newField;

		return newFields;
	} );

	return (
		<>
			{
				fields.length === 0 &&
				<p
					className="og-none"
					dangerouslySetInnerHTML={ {
						__html: __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' )
					} }
				/>
			}
			<ReactSortable className="og-fields" list={ fields } setList={ setFields } handle=".og-item__header">
				{
					fields.map( ( field, index ) => <Node
						key={ field._id }
						id={ field._id }
						field={ field }
						removeField={ removeField }
						duplicateField={ duplicateField }
						updateFieldType={ updateFieldType }
					/> )
				}
			</ReactSortable>
			<Inserter addField={ addField } />
		</>
	);
};

export default FieldsTab;