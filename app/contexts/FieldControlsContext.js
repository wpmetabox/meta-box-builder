import { request } from '../functions';
const { createContext, useState, useEffect } = wp.element;

export const FieldControlsContext = createContext( {} );

export const FieldControlsProvider = ( { children } ) => {
	const [ fieldControls, setFieldControls ] = useState( {} );

	useEffect( () => {
		request( 'field-controls' ).then( setFieldControls );
	}, [] );

	return <FieldControlsContext.Provider value={ fieldControls }>
		{ children }
	</FieldControlsContext.Provider>;
};