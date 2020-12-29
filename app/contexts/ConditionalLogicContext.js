import dotProp from "dot-prop";

const { createContext, useState, useEffect } = wp.element;

export const ConditionalLogicContext = createContext( {} );

const flatten = obj => {
	let fields = dotProp.get( obj, 'fields', {} );

	let value = {};
	Object.entries( fields ).map( ( [ id, field ] ) => {
		value = { ...value, [ id ]: field, ...flatten( field ) };
	} );

	return value;
};

export const ConditionalLogicProvider = ( { children } ) => {
	const [ conditionalLogic, setConditionalLogic ] = useState( {} );

	useEffect( () => {
		const fields = flatten( MbbApp );
		Object.entries( fields ).forEach( ( [ id, field ] ) => updateConditionalLogic( id, field ) );
	}, [] );

	const updateConditionalLogic = ( id, field ) => setConditionalLogic( prev => {
		const oldField = dotProp.get( prev, id, {} );
		const newField = { ...oldField, ...field };
		const type = dotProp.get( newField, 'type', 'text' );
		const ignoreTypes = [ 'button', 'custom_html', 'divider', 'heading', 'tab', 'group' ];

		return ignoreTypes.includes( type ) ? { ...prev } : { ...prev, [ id ]: newField };
	} );

	const removeConditionalLogic = id => setConditionalLogic( prev => {
		let newConditionalLogic = { ...prev };
		delete newConditionalLogic[ id ];
		return prev;
	} );

	return <ConditionalLogicContext.Provider value={ { conditionalLogic, updateConditionalLogic, removeConditionalLogic } }>
		{ children }
	</ConditionalLogicContext.Provider>;
};