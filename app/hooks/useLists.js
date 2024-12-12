import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, getFieldValue, ucwords, uniqid } from '../functions';

let lists = [];

// Parse fields and put into the lists.
// Recursively put groups' fields into other lists.
const parseLists = ( obj, listId, baseInputName ) => {
	let fields = ensureArray( obj.fields );
	fields = fields.filter( field => field.type );

	lists.push( {
		id: listId,
		fields,
		baseInputName,
	} );

	fields.forEach( field => {
		if ( field.type === 'group' ) {
			parseLists( field, field._id, `${ baseInputName }[${ field._id }][fields]` );
		}
	} );
};
parseLists( MbbApp, 'root', 'fields' );

const useLists = create( ( set, get ) => ( {
	lists,
	addField: ( listId, fieldType ) => set( state => {
		const fieldId = `${ fieldType }_${ uniqid() }`;
		const field = {
			_id: fieldId, // Internal use, won't change
			type: fieldType,
			id: fieldId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		// Add field to the list.
		let lists = state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			return {
				...l,
				fields: [ ...l.fields, field ]
			};
		} );

		// Create a new list for group fields.
		if ( fieldType === 'group' ) {
			const list = state.lists.find( l => l.id === listId );
			lists.push( {
				id: fieldId,
				fields: [],
				baseInputName: `${ list.baseInputName }[${ fieldId }][fields]`,
			} );
		}

		return { lists };
	} ),
	removeField: ( listId, fieldId ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			return {
				...l,
				fields: l.fields.filter( f => f._id !== fieldId )
			};
		} )
	} ) ),
	updateField: ( listId, fieldId, key, value ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			const index = l.fields.findIndex( f => f._id === fieldId );
			if ( index === -1 ) {
				return l;
			}

			let newFields = [ ...l.fields ];
			newFields[ index ][ key ] = value;

			return {
				...l,
				fields: newFields,
			};
		} )
	} ) ),
	duplicateField: ( listId, fieldId ) => set( state => {
		const list = state.lists.find( l => l.id === listId );

		let newField = getFieldValue( `${ list.baseInputName }[${ fieldId }]` );
		const newId = `${ newField.type }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		const lists = state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			const index = l.fields.findIndex( f => f._id === fieldId );
			let newFields = [ ...l.fields ];
			newFields.splice( index + 1, 0, newField );

			return {
				...l,
				fields: newFields,
			};
		} );

		// Create a new list for group fields.
		if ( newField.type === 'group' ) {
			lists.push( {
				id: newId,
				fields: [],
				baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
			} );
		}

		return { lists };
	} ),
	setFields: ( listId, fields ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			return {
				...l,
				fields,
			};
		} )
	} ) ),

	getForList: listId => {
		const list = get().lists.find( l => l.id === listId );

		return {
			fields: list.fields,
			addField: fieldType => get().addField( listId, fieldType ),
			removeField: fieldType => get().removeField( listId, fieldType ),
			updateField: ( fieldId, key, value ) => get().updateField( listId, fieldId, key, value ),
			duplicateField: fieldId => get().duplicateField( listId, fieldId ),
			setFields: fields => get().setFields( listId, fields ),
		};
	},

	getAllFields: () => {
		let fields = [];

		get().lists.forEach( list => {
			fields = [ ...fields, ...list.fields ];
		} );

		return fields;
	},
} ) );

export default useLists;