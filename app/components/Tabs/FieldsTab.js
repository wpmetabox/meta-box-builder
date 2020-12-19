import dotProp from 'dot-prop';
import { useFormContext } from 'react-hook-form';
import { ucwords, uniqid } from '../../utility/functions';
import { Inserter } from '../Common/Inserter';
import Node from './FieldsTab/Node';

const { useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = props => {
	const { getValues } = useFormContext();
	const [ fields, setFields ] = useState( props.fields );
	const addField = type => setFields( prev => {
		const id = uniqid();
		return { ...prev, [ id ]: { type, name: ucwords( type ), id } };
	} );
	const removeField = id => setFields( prev => {
		let newFields = { ...prev };
		dotProp.delete( newFields, id );
		return newFields;
	} );
	const duplicateField = id => setFields( prev => {
		const keys = Object.keys( prev );
		const index = keys.indexOf( id );

		// Get existing values from the current field with react-hook-form and dotProp.
		const newId = uniqid();
		const values = getValues();
		let newField = dotProp.get( values, `fields.${ id }` );
		newField.id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		let entries = Object.entries( prev );
		let newFields = {};
		entries.splice( index + 1, 0, [ newId, newField ] );
		entries.forEach( ( [ key, value ] ) => newFields[ key ] = value );

		return newFields;
	} );

	return (
		<>
			{ Object.values( fields ).length === 0 && <p className="og-none" dangerouslySetInnerHTML={ { __html: __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) } } /> }
			<div className="og-fields">
				{
					Object.entries( fields ).map( ( [ id, field ] ) => <Node
						key={ id }
						id={ id }
						field={ field }
						removeField={ removeField }
						duplicateField={ duplicateField }
					/> )
				}
			</div>
			<Inserter addField={ addField } />
		</>
	);
};

export default memo( FieldsTab );
