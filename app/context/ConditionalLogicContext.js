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
		setConditionalLogic( flatten( MbbApp.data_raw ) );
	}, [] );

	const updateConditionalLogic = ( id, field ) => setConditionalLogic( prev => {
		const oldField = dotProp.get( prev, id, {} );
		const newField = { ...oldField, ...field };
		return { ...prev, [ id ]: newField };
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