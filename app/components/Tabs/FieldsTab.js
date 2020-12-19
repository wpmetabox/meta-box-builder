import dotProp from 'dot-prop';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
		return [ ...prev, { type, name: ucwords( type ), id, _id: id } ];
	} );
	const removeField = id => setFields( prev => prev.filter( field => field._id !== id ) );
	const duplicateField = id => setFields( prev => {
		// Get existing values from the current field with react-hook-form and dotProp.
		const newId = uniqid();
		const values = getValues();
		let newField = dotProp.get( values, `fields.${ id }` );
		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		const index = prev.findIndex( field => field._id === id );
		let newFields = [ ...prev ];
		newFields.splice( index + 1, 0, newField );

		return newFields;
	} );

	const onDragEnd = ( { source, destination } ) => {
		if ( !destination ) {
			return;
		}
		if ( destination.index === source.index ) {
			return;
		}

		setFields( prev => {
			let newFields = [ ...prev ];
			const sourceField = prev[ source.index ];
			newFields.splice( source.index, 1 );
			newFields.splice( destination.index, 0, sourceField );

			return newFields;
		} );
	};

	return (
		<DragDropContext onDragEnd={ onDragEnd }>
			{ fields.length === 0 && <p className="og-none" dangerouslySetInnerHTML={ { __html: __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) } } /> }
			<Droppable droppableId="fields">
				{ provided => (
					<div
						className="og-fields"
						ref={ provided.innerRef }
						{ ...provided.droppableProps }
					>
						{
							fields.map( ( field, index ) => <Node
								key={ field._id }
								id={ field._id }
								field={ field }
								index={ index }
								removeField={ removeField }
								duplicateField={ duplicateField }
							/> )
						}
						{ provided.placeholder }
					</div>
				) }
			</Droppable>
			<Inserter addField={ addField } />
		</DragDropContext>
	);
};

export default memo( FieldsTab );
