import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, getFieldValue, ucwords, uniqid } from '../functions';
import useFieldSettingsPanel from './useFieldSettingsPanel';
import useNav from './useNav';

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
	addFieldAt: ( listId, fieldType, position ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
		if ( !list ) {
			console.error( `List with id ${ listId } not found.` );
			return;
		}

		if ( position < 0 || position >= list.length ) {
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
			// Add field to the list.
			let lists = state.lists.map( l =>
				l.id === listId
					? {
						...l,
						fields: [
							...l.fields.slice( 0, position ),
							newField,
							...l.fields.slice( position )
						]
					}
					: l
			);

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists.push( {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				} );
			}

			return { lists };
		} );

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	addField: ( listId, fieldType ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
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
			// Add field to the list.
			let lists = state.lists.map( l =>
				l.id === listId
					? { ...l, fields: [ ...l.fields, newField ] }
					: l
			);

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists.push( {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				} );
			}

			return { lists };
		} );

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	prependField: ( listId, fieldType ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
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
			// Add field to the list.
			let lists = state.lists.map( l =>
				l.id === listId
					? { ...l, fields: [ newField, ...l.fields ] }
					: l
			);

			// Create a new list for group fields.
			if ( fieldType === 'group' ) {
				lists.push( {
					id: newId,
					fields: [],
					baseInputName: `${ list.baseInputName }[${ newId }][fields]`,
				} );
			}

			return { lists };
		} );

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	addFieldBefore: ( listId, fieldId, fieldType ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
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
			const lists = state.lists.map( l => {
				if ( l.id !== listId ) {
					return l;
				}

				const index = l.fields.findIndex( f => f._id === fieldId );
				let newFields = [ ...l.fields ];
				newFields.splice( index, 0, newField );

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
		} );

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	addFieldAfter: ( listId, fieldId, fieldType ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
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
		} );

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	duplicateField: ( listId, fieldId ) => {
		const { setNavPanel } = useNav.getState();
		const { setActiveField } = useFieldSettingsPanel.getState();

		const list = get().lists.find( l => l.id === listId );
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

			const createNewList = group => {
				updateSubFieldIds( group );

				lists.push( {
					id: group._id,
					fields: Object.values( group.fields ),
					baseInputName: `${ list.baseInputName }[${ group._id }][fields]`,
				} );
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

		setNavPanel( 'field_settings' );
		setActiveField( newField );
	},
	removeField: ( listId, fieldId ) => {
		const { setNavPanel } = useNav.getState();

		set( state => ( {
			lists: state.lists.map( l => {
				if ( l.id !== listId ) {
					return l;
				}

				return {
					...l,
					fields: l.fields.filter( f => f._id !== fieldId ),
				};
			} ),
		} ) );

		setNavPanel( 'field_group_settings' );
	},
	updateField: ( listId, fieldId, key, value ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			return {
				...l,
				fields: l.fields.map( f =>
					f._id === fieldId
						? { ...f, [ key ]: value }
						: f,
				)
			};
		} )
	} ) ),
	moveFieldUp: ( listId, fieldId ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			const index = l.fields.findIndex( f => f._id === fieldId );
			if ( index <= 0 ) {
				return l;
			}

			let newFields = [ ...l.fields ];
			[ newFields[ index - 1 ], newFields[ index ] ] = [ newFields[ index ], newFields[ index - 1 ] ];

			return {
				...l,
				fields: newFields
			};
		} )
	} ) ),
	moveFieldDown: ( listId, fieldId ) => set( state => ( {
		lists: state.lists.map( l => {
			if ( l.id !== listId ) {
				return l;
			}

			const index = l.fields.findIndex( f => f._id === fieldId );
			if ( index >= l.fields.length - 1 ) {
				return l;
			}

			let newFields = [ ...l.fields ];
			[ newFields[ index ], newFields[ index + 1 ] ] = [ newFields[ index + 1 ], newFields[ index ] ];

			return {
				...l,
				fields: newFields
			};
		} )
	} ) ),
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

		get().lists.forEach( list => {
			fields = [ ...fields, ...list.fields ];
		} );

		return fields;
	},
} ) );

export default useLists;