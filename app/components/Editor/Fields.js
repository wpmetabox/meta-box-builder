import { RawHTML } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ReactSortable } from 'react-sortablejs';
import useApi from "../../hooks/useApi";
import getList from "../../list-functions";
import AddFieldButton from "./AddFieldButton";
import ContextMenu from "./ContextMenu";
import Node from './Node';

const Fields = () => {
	const { fields, ...fieldActions } = getList( 'root' )();

	// Don't render any field if fields data is not available.
	const types = useApi( 'field-types', {} );
	const categories = useApi( 'field-categories', [] );

	if ( Object.keys( types ).length === 0 || Object.keys( categories ).length === 0 ) {
		return <div className="mb-editor__empty">{ __( 'Loading fields, please wait...', 'meta-box-builder' ) }</div>;
	}

	const handleAdd = e => {
		// Only handle when drag from the Add Field panel.
		// We need to add a field manually at the given position.
		if ( e.from.classList.contains( 'og-add-field__list' ) ) {
			fieldActions.addFieldAt( e.item.dataset.type, e.newDraggableIndex );
		}
	};

	// If we drag a field type from the Add New panel, it won't have a proper format as a field object
	// As we manually added the field with a correct format in the handleAdd() function above
	// We need to remove the auto-added item by SortableJS.
	const setList = list => fieldActions.setFields( [ ...list ].filter( f => f?._id !== undefined ) );

	console.debug( `%cLIST`, "color:red" );

	return (
		<div className="mb-editor">
			{
				fields.length === 0
					? <RawHTML className="mb-editor__empty">{ __( 'There are no fields here. Click the <strong>+ Add Field</strong> to add a new field.', 'meta-box-builder' ) }</RawHTML>
					: <ReactSortable
						delay={ 0 }
						delayOnTouchOnly={ false }
						touchStartThreshold={ 0 }
						animation={ 200 }
						invertSwap={ true }
						group={ {
							name: 'root',
							pull: true, // Allow to drag fields to other lists
							put: true, // Allow to receive fields from other lists
						} }
						list={ fields }
						setList={ setList }
						onAdd={ handleAdd }
					>
						{
							fields.map( field => <Node
								key={ field._id }
								field={ field }
								{ ...fieldActions }
							/> )
						}
					</ReactSortable>
			}
			<AddFieldButton { ...fieldActions } />
			<ContextMenu />
		</div>
	);
};

export default Fields;