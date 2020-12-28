import dotProp from 'dot-prop';
import { ConditionalLogicContext } from '../../contexts/ConditionalLogicContext';
import { FieldsDataContext } from '../../contexts/FieldsDataContext';
import { ucwords, uniqid } from '../../functions';
import { Inserter } from '../Common/Inserter';
import Node from './FieldsTab/Node';

const { useContext, useState, memo } = wp.element;
const { __ } = wp.i18n;

const FieldsTab = props => {
	const { updateConditionalLogic, removeConditionalLogic } = useContext( ConditionalLogicContext );
	const [ fields, setFields ] = useState( Object.values( props.fields ) );

	// Don't render any field if fields data is not available.
	const fieldsData = useContext( FieldsDataContext );
	if ( Object.keys( fieldsData ).length === 0 ) {
		return <p className="og-none">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</p>;
	}

	const addField = type => setFields( prev => {
		const id = uniqid();
		const newField = { _id: id, id, type, name: ucwords( type, '_' ) };
		updateConditionalLogic( id, newField );
		return [ ...prev, newField ];
	} );

	const removeField = id => setFields( prev => {
		removeConditionalLogic( id );
		return prev.filter( field => field._id !== id );
	} );

	const duplicateField = id => setFields( prev => {
		// Get existing values from the current field with react-hook-form and dotProp.
		const newId = uniqid();
		const values = getValues();
		let newField = dotProp.get( values, `fields.${ id }` );
		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		updateConditionalLogic( newId, newField );

		const index = prev.findIndex( field => field._id === id );
		let newFields = [ ...prev ];
		newFields.splice( index + 1, 0, newField );

		return newFields;
	} );

	const moveField = ( index, direction ) => setFields( prev => {
		let newFields = [ ...prev ];
		const field = newFields[ index ];
		if ( direction === 'up' ) {
			if ( 0 === index ) {
				return newFields;
			}
			newFields[ index ] = newFields[ index - 1 ];
			newFields[ index - 1 ] = field;
		} else {
			if ( index === prev.length - 1 ) {
				return newFields;
			}
			newFields[ index ] = newFields[ index + 1 ];
			newFields[ index + 1 ] = field;
		}

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
			<div className="og-fields">
				{
					fields.map( ( field, index ) => <Node
						key={ field._id }
						id={ field._id }
						field={ field }
						index={ index }
						removeField={ removeField }
						duplicateField={ duplicateField }
						moveField={ moveField }
					/> )
				}
			</div>
			<Inserter addField={ addField } />
		</>
	);
};

export default memo( FieldsTab );
