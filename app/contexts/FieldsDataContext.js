import { request } from '../functions';
const { createContext, useState, useEffect } = wp.element;

export const FieldsDataContext = createContext( {} );

export const FieldsDataProvider = ( { children } ) => {
	const [ fieldTypes, setFieldsTypes ] = useState( {} );
	const [ fieldCategories, setFieldCategories ] = useState( [] );

	useEffect( () => {
		request( 'field-types' ).then( setFieldsTypes );
		request( 'field-categories' ).then( setFieldCategories );
	}, [] );

	return <FieldsDataContext.Provider value={ { fieldTypes, fieldCategories } }>
		{ children }
	</FieldsDataContext.Provider>;
};