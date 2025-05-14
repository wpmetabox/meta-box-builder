import { __ } from '@wordpress/i18n';
import { create } from 'zustand';
import { getFieldValue, ucwords, uniqid } from './functions';
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

const createList = create( ( set, get ) => ( {
	id: '',
	fields: [],
	baseInputName: '',

	setListInfo: ( id, baseInputName ) => set( { id, baseInputName } ),
	addFieldAt: ( fieldType, position ) => {
		const { fields, baseInputName } = get();

		if ( position < 0 || position >= fields.length ) {
			console.error( 'Invalid position.' );
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
	},
	addField: ( fieldType ) => {
		const newField = createNewField( fieldType );

		set( state => ( {
			fields: [ ...state.fields, newField ]
		} ) );
	},
	prependField: ( fieldType ) => {
		const newField = createNewField( fieldType );

		set( state => ( {
			fields: [ newField, ...state.fields ]
		} ) );
	},
	addFieldBefore: ( fieldId, fieldType ) => {
		const newField = createNewField( fieldType );

		set( state => {
			// Find the index of the field
			const index = state.fields.findIndex( f => f._id === fieldId );
			if ( index === -1 ) {
				console.error( `Field with id ${ fieldId } not found.` );
				return state;
			}

			let newFields = [ ...state.fields ];
			newFields.splice( index, 0, newField );

			return { fields: newFields };
		} );
	},
	addFieldAfter: ( fieldId, fieldType ) => {
		const newField = createNewField( fieldType );

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

const lists = new Map(); // or a proxy if needed

export function getList( id ) {
	if ( !lists.has( id ) ) {
		lists.set( id, createList() );
	}
	return lists.get( id );
}