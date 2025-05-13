import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, getFieldValue, ucwords, uniqid } from '../functions';
import useNavPanel from './useNavPanel';

const areListsEqual = ( a, b ) => a.length === b.length && a.every( ( field, index ) => field._id === b[ index ]._id );

let lists = {};

// Parse fields and put into the lists.
// Recursively put groups' fields into other lists.
const parseLists = ( obj, listId, baseInputName ) => {
	let fields = ensureArray( obj.fields );
	fields = fields.filter( field => field.type );

	lists[ listId ] = {
		id: listId,
		fields,
		baseInputName,
	};

	fields.forEach( field => {
		if ( field.type === 'group' ) {
			parseLists( field, field._id, `${ baseInputName }[${ field._id }][fields]` );
		}
	} );
};
parseLists( MbbApp, 'root', 'fields' );

const useLists = create( ( set, get ) => ( {
	lists,
	addFieldAt: ( listId, fieldType, position ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		if ( position < 0 || position >= list.fields.length ) {
			console.error( 'Invalid position.' );
			return;
		}

		const newId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: newId, // Internal use, won't change
			_new: true, // Detect the field is newly added, to auto generate ID
			type: fieldType,
			id: newId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Add field to the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: [
					...lists[ listId ].fields.slice( 0, position ),
					newField,
					...lists[ listId ].fields.slice( position )
				]
			};

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists[ newId ] = {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				};
			}

			return { lists };
		} );
	},
	addField: ( listId, fieldType ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		const newId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: newId, // Internal use, won't change
			_new: true, // Detect the field is newly added, to auto generate ID
			type: fieldType,
			id: newId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Add field to the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: [ ...lists[ listId ].fields, newField ]
			};

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists[ newId ] = {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				};
			}

			return { lists };
		} );
	},
	prependField: ( listId, fieldType ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		const newId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: newId, // Internal use, won't change
			_new: true, // Detect the field is newly added, to auto generate ID
			type: fieldType,
			id: newId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Add field to the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: [ newField, ...lists[ listId ].fields ]
			};

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists[ newId ] = {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				};
			}

			return { lists };
		} );
	},
	addFieldBefore: ( listId, fieldId, fieldType ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		const newId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: newId, // Internal use, won't change
			_new: true, // Detect the field is newly added, to auto generate ID
			type: fieldType,
			id: newId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Find the index of the field
			const index = lists[ listId ].fields.findIndex( f => f._id === fieldId );
			let newFields = [ ...lists[ listId ].fields ];
			newFields.splice( index, 0, newField );

			// Update the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: newFields
			};

			// Create a new list for group fields.
			if ( newField.type === 'group' ) {
				lists[ newId ] = {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				};
			}

			return { lists };
		} );
	},
	addFieldAfter: ( listId, fieldId, fieldType ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		const newId = `${ fieldType }_${ uniqid() }`;
		const newField = {
			_id: newId, // Internal use, won't change
			_new: true, // Detect the field is newly added, to auto generate ID
			type: fieldType,
			id: newId, // ID of the field that use can edit
			name: ucwords( fieldType, '_' ),
		};

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Find the index of the field
			const index = lists[ listId ].fields.findIndex( f => f._id === fieldId );
			let newFields = [ ...lists[ listId ].fields ];
			newFields.splice( index + 1, 0, newField );

			// Update the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: newFields
			};

			// Create a new list for group fields.
			if ( newField.type === 'group' ) {
				lists[ newId ] = {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				};
			}

			return { lists };
		} );
	},
	duplicateField: ( listId, fieldId ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		let newField = getFieldValue( `${ list.baseInputName }[${ fieldId }]` );
		const newId = `${ newField.type }_${ uniqid() }`;

		newField.id = newId;
		newField._id = newId;
		newField.name += __( ' (Copy)', 'meta-box-builder' );

		set( state => {
			// Create a new lists object
			const lists = { ...state.lists };

			// Find the index of the field
			const index = lists[ listId ].fields.findIndex( f => f._id === fieldId );
			let newFields = [ ...lists[ listId ].fields ];
			newFields.splice( index + 1, 0, newField );

			// Update the list
			lists[ listId ] = {
				...lists[ listId ],
				fields: newFields
			};

			const createNewList = group => {
				updateSubFieldIds( group );

				lists[ group._id ] = {
					id: group._id,
					fields: Object.values( group.fields ),
					baseInputName: `${ list.baseInputName }[${ group._id }][fields]`,
				};
			};

			const updateSubFieldIds = group => {
				// Convert to array to do easier.
				let subFields = Object.values( group.fields || {} );

				group.fields = {};

				subFields.forEach( subField => {
					// Change id
					const newId = `${ subField.type }_${ uniqid() }`;
					subField.id = newId;
					subField._id = newId;

					// Recurring update subfield IDs and create lists.
					if ( subField.type === 'group' ) {
						createNewList( subField );
					};

					group.fields[ subField._id ] = subField;
				} );
			};

			// Create a new list for group fields.
			if ( newField.type === 'group' ) {
				createNewList( newField );
			}

			return { lists };
		} );
	},
	removeField: ( listId, fieldId ) => {
		const { navPanel, setNavPanel } = useNavPanel.getState();

		set( state => {
			const lists = { ...state.lists };

			if ( lists[ listId ] ) {
				lists[ listId ] = {
					...lists[ listId ],
					fields: lists[ listId ].fields.filter( f => f._id !== fieldId )
				};
			}

			return { lists };
		} );

		if ( navPanel === 'field-settings' ) {
			setNavPanel( '' );
		}
	},
	updateField: ( listId, fieldId, key, value ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		const field = list.fields.find( f => f._id === fieldId );
		if ( !field ) {
			console.error( `Field with id ${ fieldId } not found.` );
			return;
		}

		// Don't update if the value is the same.
		if ( field[ key ] === value ) {
			return;
		}

		set( state => {
			const list = state.lists[ listId ];
			const fields = list.fields.map( f => f._id === fieldId ? { ...f, [ key ]: value } : f );

			return {
				lists: {
					...state.lists,
					[ listId ]: { ...list, fields }
				}
			};
		} );
	},
	moveFieldUp: ( listId, fieldId ) => set( state => {
		const lists = { ...state.lists };

		if ( !lists[ listId ] ) {
			return { lists };
		}

		const index = lists[ listId ].fields.findIndex( f => f._id === fieldId );
		if ( index <= 0 ) {
			return { lists };
		}

		let newFields = [ ...lists[ listId ].fields ];
		[ newFields[ index - 1 ], newFields[ index ] ] = [ newFields[ index ], newFields[ index - 1 ] ];

		lists[ listId ] = {
			...lists[ listId ],
			fields: newFields
		};

		return { lists };
	} ),
	moveFieldDown: ( listId, fieldId ) => set( state => {
		const lists = { ...state.lists };

		if ( !lists[ listId ] ) {
			return { lists };
		}

		const index = lists[ listId ].fields.findIndex( f => f._id === fieldId );
		if ( index >= lists[ listId ].fields.length - 1 ) {
			return { lists };
		}

		let newFields = [ ...lists[ listId ].fields ];
		[ newFields[ index ], newFields[ index + 1 ] ] = [ newFields[ index + 1 ], newFields[ index ] ];

		lists[ listId ] = {
			...lists[ listId ],
			fields: newFields
		};

		return { lists };
	} ),
	setFields: ( listId, fields ) => {
		const list = get().lists[ listId ];
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		if ( areListsEqual( list.fields, fields ) ) {
			return;
		}

		set( state => {
			const lists = { ...state.lists };

			lists[ listId ] = {
				...lists[ listId ],
				fields
			};

			return { lists };
		} );
	},
	getForList: listId => {
		const list = get().lists[ listId ];

		return {
			fields: list.fields,
			setFields: fields => get().setFields( listId, fields ),
			addFieldAt: ( fieldType, position ) => get().addFieldAt( listId, fieldType, position ),
			addField: fieldType => get().addField( listId, fieldType ),
			prependField: fieldType => get().prependField( listId, fieldType ),

			addFieldBefore: ( fieldId, fieldType ) => get().addFieldBefore( listId, fieldId, fieldType ),
			addFieldAfter: ( fieldId, fieldType ) => get().addFieldAfter( listId, fieldId, fieldType ),
			duplicateField: fieldId => get().duplicateField( listId, fieldId ),
			removeField: fieldId => get().removeField( listId, fieldId ),
			updateField: ( fieldId, key, value ) => get().updateField( listId, fieldId, key, value ),
			moveFieldUp: fieldId => get().moveFieldUp( listId, fieldId ),
			moveFieldDown: fieldId => get().moveFieldDown( listId, fieldId ),
		};
	},

	getAllFields: () => {
		let fields = [];

		Object.values( get().lists ).forEach( list => {
			fields = [ ...fields, ...list.fields ];
		} );

		return fields;
	},
} ) );

export default useLists;