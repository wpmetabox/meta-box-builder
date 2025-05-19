import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, ucwords, uniqid } from './functions';
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
				// For getting list of fields if that's a group.
				subField._original_id = subField._id;

				// Change id
				const newId = `${ subField.type }_${ uniqid() }`;
				subField.id = newId;
				subField._id = newId;

				// Recurring update subfield IDs and create lists.
				if ( subField.type === 'group' ) {
					createNewList( subField );
				};

				return subField;
			} );

			// Create a new list for group fields.
			if ( newField.type === 'group' ) {
				createNewList( newField );
			}
		},
		removeField: ( fieldId ) => {
			const { navPanel, setNavPanel } = useNavPanel.getState();

			set( state => ( {
				fields: state.fields.filter( f => f._id !== fieldId )
			} ) );

			if ( navPanel === 'field-settings' ) {
				setNavPanel( '' );
			}
		},
		updateField: ( fieldId, key, value ) => {
			const field = get().fields.find( f => f._id === fieldId );
			if ( !field ) {
				console.error( `Field with id ${ fieldId } not found.` );
				return;
			}

			// Don't update if the value is the same.
			if ( field[ key ] === value ) {
				return;
			}

			set( state => ( {
				fields: state.fields.map( f =>
					f._id === fieldId ? { ...f, [ key ]: value } : f
				)
			} ) );
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

export { lists };

export default getList;
