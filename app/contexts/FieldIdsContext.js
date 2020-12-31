import dotProp from 'dot-prop';
const { createContext, useState, useEffect } = wp.element;

export const FieldIdsContext = createContext( {} );

const ignoreTypes = [ 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];

const flatten = obj => {
	let fields = dotProp.get( obj, 'fields', {} );

	let value = {};
	Object.entries( fields ).map( ( [ id, field ] ) => {
		const type = dotProp.get( field, 'type', 'text' );
		value = { ...value, ...flatten( field ) };
		if ( !ignoreTypes.includes( type ) ) {
			value = { ...value, [ id ]: field };
		}
	} );

	return value;
};

export const FieldIdsProvider = ( { children } ) => {
	const [ fieldIds, setFieldIds ] = useState( {} );

	useEffect( () => {
		const fields = flatten( MbbApp );
		setFieldIds( fields );
	}, [] );

	const updateFieldId = ( id, field ) => setFieldIds( prev => {
		const oldField = dotProp.get( prev, id, {} );
		const newField = { ...oldField, ...field };
		const type = dotProp.get( newField, 'type', 'text' );

		return ignoreTypes.includes( type ) ? { ...prev } : { ...prev, [ id ]: newField };
	} );

	const removeFieldId = id => setFieldIds( prev => {
		let newFieldIds = { ...prev };
		delete newFieldIds[ id ];
		return prev;
	} );

	return <FieldIdsContext.Provider value={ { fieldIds, updateFieldId, removeFieldId } }>
		{ children }
	</FieldIdsContext.Provider>;
};