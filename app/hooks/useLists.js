import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { ensureArray, getFieldValue, ucwords, uniqid } from '../functions';
import useFieldSettingsPanel from './useFieldSettingsPanel';
import useSidebarPanel from './useSidebarPanel';

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
		const { setSidebarPanel } = useSidebarPanel.getState();
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

		setSidebarPanel( 'field_settings' );
		setActiveField( newField );
	},
	addFieldBefore: ( listId, fieldId, fieldType ) => {
		const { setSidebarPanel } = useSidebarPanel.getState();
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

		setSidebarPanel( 'field_settings' );
		setActiveField( newField );
	},
	addFieldAfter: ( listId, fieldId, fieldType ) => {
		const { setSidebarPanel } = useSidebarPanel.getState();
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

		setSidebarPanel( 'field_settings' );
		setActiveField( newField );
	},
	duplicateField: ( listId, fieldId ) => {
		const { setSidebarPanel } = useSidebarPanel.getState();
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

		setSidebarPanel( 'field_settings' );
		setActiveField( newField );
	},
	removeField: ( listId, fieldId ) => {
		const { setSidebarPanel } = useSidebarPanel.getState();

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

		setSidebarPanel( 'add_field' );
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
			addField: fieldType => get().addField( listId, fieldType ),

			addFieldBefore: ( fieldId, fieldType ) => get().addFieldBefore( listId, fieldId, fieldType ),
			addFieldAfter: ( fieldId, fieldType ) => get().addFieldAfter( listId, fieldId, fieldType ),
			duplicateField: fieldId => get().duplicateField( listId, fieldId ),
			removeField: fieldId => get().removeField( listId, fieldId ),
			updateField: ( fieldId, key, value ) => get().updateField( listId, fieldId, key, value ),
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