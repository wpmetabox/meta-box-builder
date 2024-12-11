import { create } from 'zustand';
import { ensureArray, ucwords, uniqid } from '../functions';

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
	addField: ( listId, fieldType ) => {
		const fieldId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: fieldId, // Internal use, won't change
			type: fieldType,
			id: fieldId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => ( {
			lists: state.lists.map( l => {
				if ( l.id !== listId ) {
					return l;
				}

				return {
					...l,
					fields: [ ...l.fields, newField ]
				};
			} )
		} ) );
	},
	removeField: ( listId, fieldId ) => {
		set( state => ( {
			lists: state.lists.map( l => {
				if ( l.id !== listId ) {
					return l;
				}

				return {
					...l,
					fields: l.fields.filter( f => f._id !== fieldId )
				};
			} )
		} ) );
	},
	duplicateField: ( listId, fieldId ) => {
		const list = get().lists.filter( l => l.id === listId );

		let newField = getFieldValue( `${ list.baseInputName }[${ fieldId }]` );
		const newId = `${ newField.type }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		set( state => ( {
			lists: state.lists.map( l => {
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
			} )
		} ) );
	},
	setFields: ( listId, fields ) => {
		set( state => ( {
			lists: state.lists.map( l => {
				if ( l.id !== listId ) {
					return l;
				}

				return {
					...l,
					fields,
				};
			} )
		} ) );
	},

	getForList: listId => {
		const list = get().lists.find( l => l.id === listId );

		return {
			fields: list.fields,
			addField: fieldType => get().addField( listId, fieldType ),
			removeField: fieldType => get().removeField( listId, fieldType ),
			duplicateField: fieldType => get().duplicateField( listId, fieldType ),
			setFields: fields => get().setFields( listId, fields ),
		};
	},
} ) );

export default useLists;