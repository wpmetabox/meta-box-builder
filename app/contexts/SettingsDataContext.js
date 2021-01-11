import { request } from '../functions';
const { createContext, useState, useEffect } = wp.element;

export const SettingsDataContext = createContext( {} );

export const SettingsDataProvider = ( { children } ) => {
	const [ settingsControls, setSettingsControls ] = useState( {} );

	useEffect( () => {
		request( 'settings' ).then( setSettingsControls );
	}, [] );

	return <SettingsDataContext.Provider value={ { settingsControls } }>
		{ children }
	</SettingsDataContext.Provider>;
};