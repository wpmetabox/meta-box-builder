import { request } from '../functions';
const { createContext, useState, useEffect } = wp.element;

export const FieldsDataContext = createContext( {} );

export const FieldsDataProvider = ( { children } ) => {
	const [ fieldsData, setFieldsData ] = useState( {} );

	useEffect( () => {
		request( 'fields' ).then( setFieldsData );
	}, [] );

	return <FieldsDataContext.Provider value={ fieldsData }>
		{ children }
	</FieldsDataContext.Provider>;
};