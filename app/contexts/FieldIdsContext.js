import { createContext, useEffect } from "@wordpress/element";
import dotProp from 'dot-prop';
import { useImmer } from "use-immer";

export const FieldIdsContext = createContext( {} );

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

export const FieldIdsProvider = ( { children } ) => {
	const [ fieldIds, setFieldIds ] = useImmer( {} );

	useEffect( () => {
		const fields = flatten( MbbApp );
		setFieldIds( fields );
	}, [] );

	const updateFieldId = ( id, field ) => setFieldIds( draft => {
		const type = dotProp.get( field, 'type', 'text' );

		if ( !ignoreTypes.includes( type ) ) {
			draft[ id ] = field.id;
		}
	} );

	const removeFieldId = id => setFieldIds( draft => {
		delete draft[ id ];
	} );

	return <FieldIdsContext.Provider value={ { fieldIds, updateFieldId, removeFieldId } }>
		{ children }
	</FieldIdsContext.Provider>;
};