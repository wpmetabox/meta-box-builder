import { __ } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import getList from '../../../list-functions';
import AddFieldButton from '../AddFieldButton';
import Field from '../Field';

const Group = ( { field, parent } ) => {
	const { fields, ...fieldActions } = getList( field._id )();

	const handleAdd = e => {
		// Only handle when drag from the Add Field panel.
		// We need to add a field manually at the given position.
		if ( e.from.classList.contains( 'mb-add-field__list' ) ) {
			fieldActions.addFieldAt( e.item.dataset.type, e.newDraggableIndex );
		}
	};

	// If we drag a field type from the Add New panel, it won't have a proper format as a field object
	// As we manually added the field with a correct format in the handleAdd() function above
	// We need to remove the auto-added item by SortableJS.
	const setList = list => fieldActions.setFields( [ ...list ].filter( f => f?._id !== undefined ) );

	console.debug( `%c  Group ${ field._id }`, "color:orange" );

	return (
		<>
			<CollapsibleElements field={ field } />

			<ReactSortable
				className="mb-field--group__fields mb-fields"
				delay={ 0 }
				delayOnTouchOnly={ false }
				touchStartThreshold={ 0 }
				animation={ 200 }
				invertSwap={ true }
				group={ {
					name: 'nested',
					pull: true, // Allow to drag fields to other lists
					put: true, // Allow to receive fields from other lists
				} }
				list={ fields }
				setList={ setList }
				onAdd={ handleAdd }
			>
				{
					fields.map( f => <Node
						key={ f._id }
						field={ f }
						parent={ `${ parent }[${ field._id }][fields]` }
						{ ...fieldActions }
					/> )
				}
			</ReactSortable>
			<AddFieldButton text={ __( '+ Add Subfield', 'meta-box-builder' ) } variant='secondary' { ...fieldActions } />
		</>
	);
};

const CollapsibleElements = ( { field } ) => {
	if ( !field.collapsible ) {
		return;
	}

	const groupTitle = field.group_title || ( field.clone ? __( 'Entry {#}', 'meta-box-builder' ) : __( 'Entry', 'meta-box-builder' ) );

	return (
		<>
			<div className="rwmb-group-title-wrapper">
				<h4 className="rwmb-group-title">{ groupTitle }</h4>
			</div>
			<button className="rwmb-group-toggle-handle button-link">
				<span className="rwmb-group-toggle-indicator" />
			</button>
		</>
	);
};

export default Group;