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
	ids: flatten( MbbApp ),

	update: ( id, field ) => set( state => {
		const type = dotProp.get( field, 'type', 'text' );
		const ids  = ignoreTypes.includes( type ) ? { ...state.ids } : { ...state.ids, [ id ]: field.id };

		return { ids };
	} ),

	remove: id => set( state => {
		let ids = { ...state.ids };
		delete ids[ id ];
		return { ids };
	} )
} ) );