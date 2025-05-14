import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, getFieldValue, ucwords, uniqid } from './functions';
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

const createList = ( { id = '', fields = [], baseInputName = '' } ) => {
	if ( lists.has( id ) ) {
		return lists.get( id );
	}

	const list = create( ( set, get ) => ( {
		id,
		fields,
		baseInputName,

		addFieldAt: ( fieldType, position ) => {
			const { fields, baseInputName } = get();

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
					baseInputName: `${ baseInputName }[${ newField._id }][fields]`,
				} );
			}
		},
		addField: ( fieldType ) => get().addFieldAt( fieldType, get().fields.length ),
		prependField: ( fieldType ) => get().addFieldAt( fieldType, 0 ),
		addFieldBefore: ( fieldId, fieldType ) => get().addFieldAt( fieldType, get().fields.findIndex( f => f._id === fieldId ) ),
		addFieldAfter: ( fieldId, fieldType ) => get().addFieldAt( fieldType, get().fields.findIndex( f => f._id === fieldId ) + 1 ),
		duplicateField: ( fieldId ) => {
			const { baseInputName } = get();

			let newField = getFieldValue( `${ baseInputName }[${ fieldId }]` );
			const newId = `${ newField.type }_${ uniqid() }`;

			newField.id = newId;
			newField._id = newId;
			newField.name += __( ' (Copy)', 'meta-box-builder' );

			set( state => {
				// Find the index of the field
				const index = state.fields.findIndex( f => f._id === fieldId );
				if ( index === -1 ) {
					console.error( `Field with id ${ fieldId } not found.` );
					return state;
				}

				let newFields = [ ...state.fields ];
				newFields.splice( index + 1, 0, newField );

				return { fields: newFields };
			} );
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
const parseLists = ( obj, listId, baseInputName ) => {
	let fields = ensureArray( obj.fields );
	fields = fields.filter( field => field.type );

	createList( { id: listId, fields, baseInputName } );

	fields.forEach( field => {
		if ( field.type === 'group' ) {
			parseLists( field, field._id, `${ baseInputName }[${ field._id }][fields]` );
		}
	} );
};
parseLists( MbbApp, 'root', 'fields' );

export default getList;