import dotProp from 'dot-prop';
import create from 'zustand';

const ignoreTypes = [ 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];

const flatten = obj => {
	let fields = dotProp.get( obj, 'fields', {} );

	let value = {};
	Object.entries( fields ).map( ( [ id, field ] ) => {
		const type = dotProp.get( field, 'type', 'text' );
		value = { ...value, ...flatten( field ) };
		if ( !ignoreTypes.includes( type ) ) {
			value = { ...value, [ id ]: field.id };
		}
	} );

	return value;
};

export const useFieldIdsStore = create( set => ( {
	fieldIds: flatten( MbbApp ),

	updateFieldId: ( id, field ) => set( state => {
		const type = dotProp.get( field, 'type', 'text' );

		const fieldIds = ignoreTypes.includes( type ) ? { ...state.fieldIds } : { ...state.fieldIds, [ id ]: field.id };

		return { fieldIds };
	} ),

	removeFieldId: id => set( state => {
		let fieldIds = { ...state.fieldIds };
		delete fieldIds[ id ];
		return { fieldIds };
	} )
} ) );