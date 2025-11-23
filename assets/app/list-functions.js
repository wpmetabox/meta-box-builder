import { __ } from '@wordpress/i18n';
import dotProp from 'dot-prop';
import { create } from 'zustand';
import { ensureArray, ucwords, uniqid } from './functions';
import useColumns from './hooks/useColumns';
import useNavPanel from './hooks/useNavPanel';

const areFieldsEqual = ( a, b ) => a.length === b.length && a.every( ( field, index ) => field._id === b[ index ]._id );

const createNewField = type => {
	const id = `${ type }_${ uniqid() }`;
	return {
		_id: id,
		_new: true,
		type,
		id,
		name: ucwords( type, '_' )
	};
};

const lists = new Map();

const createList = ( { id = '', fields = [] } ) => {
	if ( lists.has( id ) ) {
		return lists.get( id );
	}

	const list = create( ( set, get ) => ( {
		id,
		fields,

		addFieldAt: ( fieldType, position ) => {
			const { fields } = get();
			const { setNavPanel } = useNavPanel.getState();

			if ( position < 0 || position > fields.length ) {
				console.error( `%cInvalid position: ${ position }.`, 'color:red' );
				return;
			}

			const newField = createNewField( fieldType );

			set( state => {
				// Add field to the list
				const newFields = [
					...state.fields.slice( 0, position ),
					newField,
					...state.fields.slice( position )
				];

				return { fields: newFields };
			} );

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				createList( {
					id: newField._id,
					fields: [],
				} );
			}

			setFieldActive( newField._id );
			setNavPanel( 'field-settings' );
		},
		addField: ( fieldType ) => get().addFieldAt( fieldType, get().fields.length ),
		prependField: ( fieldType ) => get().addFieldAt( fieldType, 0 ),
		addFieldBefore: ( fieldId, fieldType ) => get().addFieldAt( fieldType, get().fields.findIndex( f => f._id === fieldId ) ),
		addFieldAfter: ( fieldId, fieldType ) => get().addFieldAt( fieldType, get().fields.findIndex( f => f._id === fieldId ) + 1 ),
		duplicateField: ( fieldId ) => {
			const { fields } = get();

			// Find the field to duplicate
			const originalField = fields.find( f => f._id === fieldId );
			if ( !originalField ) {
				return;
			}

			// Deep clone the field to avoid reference issues
			const newField = structuredClone( originalField );
			const newId = `${ newField.type }_${ uniqid() }`;

			// Temporary keys used in the builder.
			delete newField._active;
			delete newField._id_changed;

			// Temporary keys used by SortableJS.
			delete newField.chosen;
			delete newField.selected;

			// For getting list of fields if that's a group.
			newField._original_id = originalField._id;

			newField.id = newId;
			newField._id = newId;
			newField.name += __( ' (Copy)', 'meta-box-builder' );

			set( state => {
				// Find the index of the field
				const index = state.fields.findIndex( f => f._id === fieldId );
				let newFields = [ ...state.fields ];
				newFields.splice( index + 1, 0, newField );

				return { fields: newFields };
			} );

			const createNewList = group => createList( {
				id: group._id,
				fields: updateSubFieldIds( group ),
			} );

			const updateSubFieldIds = group => lists.get( group._original_id ).getState().fields.map( subField => {
				const newSubField = structuredClone( subField );

				// For getting list of fields if that's a group.
				newSubField._original_id = subField._id;

				// Change id
				const newId = `${ newSubField.type }_${ uniqid() }`;
				newSubField.id = newId;
				newSubField._id = newId;

				// Recurring update subfield IDs and create lists.
				if ( subField.type === 'group' ) {
					createNewList( newSubField );
				};

				return newSubField;
			} );

			// Create a new list for group fields.
			if ( newField.type === 'group' ) {
				createNewList( newField );
			}
		},
		removeField: ( fieldId ) => {
			const { navPanel, setNavPanel } = useNavPanel.getState();
			const { removeFieldId } = useColumns.getState();

			// Get the current list state before removing the field
			const currentState = get();
			const currentIndex = currentState.fields.findIndex( f => f._id === fieldId );
			const isCurrentActive = currentIndex >= 0 && currentState.fields[ currentIndex ]._active;
			const isCurrentListGroup = currentState.id !== 'root';

			// Remove the field
			set( state => ( {
				fields: state.fields.filter( f => f._id !== fieldId )
			} ) );
			removeFieldId( fieldId );

			if ( !isCurrentActive ) {
				return;
			}

			// Handle active field logic after deletion
			const newState = get();
			let newActiveFieldId = null;

			if ( newState.fields.length > 0 ) {
				// If there are remaining fields, try to set the next field as active
				if ( currentIndex < newState.fields.length ) {
					// Next field exists
					newActiveFieldId = newState.fields[ currentIndex ]._id;
				} else if ( currentIndex > 0 ) {
					// No next field, but previous field exists
					newActiveFieldId = newState.fields[ currentIndex - 1 ]._id;
				}
			}

			if ( newActiveFieldId ) {
				// Set the new active field
				setFieldActive( newActiveFieldId );
			} else if ( isCurrentListGroup ) {
				// No fields left in group, set the group as active
				setFieldActive( currentState.id );
			} else {
				// Root list with no fields, set nav panel to field-group-settings
				setNavPanel( 'field-group-settings' );
			}
		},
		updateField: ( fieldId, key, value ) => {
			const field = get().fields.find( f => f._id === fieldId );
			if ( !field ) {
				return;
			}

			// Get the current value using dot notation, to be able to update nested properties.
			const currentValue = dotProp.get( field, key );

			// Don't update if the value is the same
			if ( currentValue === value ) {
				return;
			}

			// If changing to group type, create a new list for the field
			if ( key === 'type' && value === 'group' && currentValue !== 'group' ) {
				createList( {
					id: fieldId,
					fields: [],
				} );
			}

			// Create a deep clone of the field to avoid reference issues
			const updatedField = structuredClone( field );

			// Set the value using dot notation to work with nested properties like admin_columns, tooltip, etc.
			dotProp.set( updatedField, key, value );

			set( state => ( {
				fields: state.fields.map( f =>
					f._id === fieldId ? updatedField : f
				)
			} ) );

			if ( key === 'columns' ) {
				const { removeFieldId, addFieldId } = useColumns.getState();
				if ( value == 12 || !value ) {
					removeFieldId( fieldId );
				} else {
					addFieldId( fieldId );
				}
			}
		},
		moveFieldUp: ( fieldId ) => set( state => {
			const index = state.fields.findIndex( f => f._id === fieldId );
			if ( index <= 0 ) {
				return state;
			}

			let newFields = [ ...state.fields ];
			[ newFields[ index - 1 ], newFields[ index ] ] = [ newFields[ index ], newFields[ index - 1 ] ];

			return { fields: newFields };
		} ),
		moveFieldDown: ( fieldId ) => set( state => {
			const index = state.fields.findIndex( f => f._id === fieldId );
			if ( index >= state.fields.length - 1 ) {
				return state;
			}

			let newFields = [ ...state.fields ];
			[ newFields[ index ], newFields[ index + 1 ] ] = [ newFields[ index + 1 ], newFields[ index ] ];

			return { fields: newFields };
		} ),
		setFields: ( fields ) => {
			if ( areFieldsEqual( get().fields, fields ) ) {
				return;
			}

			set( { fields } );
		},
	} ) );

	lists.set( id, list );
	return list;
};

const getList = id => {
	if ( lists.has( id ) ) {
		return lists.get( id );
	}
	console.error( `%cList with id "${ id }" not found.`, 'color:red' );
};

export const buildFieldsTree = () => {
	// Get all root fields first
	const rootFields = lists.has( 'root' )
		? [ ...lists.get( 'root' ).getState().fields ]
		: [];

	// Process each field to include sub-fields for groups
	const processField = field => {
		// Deep clone the field to avoid reference issues
		const processedField = { ...field };

		// Temporary keys used in the builder.
		delete processedField._new;
		delete processedField._active;
		delete processedField._id_changed;
		delete processedField._original_id;

		// Temporary keys used by SortableJS.
		delete processedField.chosen;
		delete processedField.selected;

		// If it's a group field, get its sub-fields
		if ( field.type === 'group' && lists.has( field._id ) ) {
			processedField.fields = lists.get( field._id ).getState().fields.map( processField );
		}

		return processedField;
	};

	// Process all root fields
	return rootFields.map( processField );
};

// Parse fields and put into the lists.
// Recursively put groups' fields into other lists.
const parseLists = ( obj, listId ) => {
	let fields = ensureArray( obj.fields );
	fields = fields.filter( field => field.type );

	createList( { id: listId, fields } );

	fields.forEach( field => {
		if ( field.type === 'group' ) {
			parseLists( field, field._id );
		}
	} );
};
parseLists( MbbApp, 'root' );

const findFieldList = fieldId => [ ...lists.values() ].find( list => list.getState().fields.some( field => field._id === fieldId ) );

export const setFieldActive = fieldId => {
	const list = findFieldList( fieldId );
	if ( list ) {
		list.getState().updateField( fieldId, '_active', true );
	}

	const allFields = [ ...lists.values() ].flatMap( store => store.getState().fields );
	allFields.forEach( field => {
		if ( field._id === fieldId || !field._active ) {
			return;
		}
		const list = findFieldList( field._id );
		if ( list ) {
			list.getState().updateField( field._id, '_active', false );
		}
	} );
};

export const isInGroup = fieldId => {
	const list = findFieldList( fieldId );
	return list && list.getState().id !== 'root';
};

const fieldIdsWithCustomColumns = [ ...lists.values() ]
	.flatMap( store => store.getState().fields )
	.filter( field => field.columns && field.columns != 12 )
	.map( field => field._id );

useColumns.getState().init( fieldIdsWithCustomColumns );

export { lists };

export default getList;
