import { createContext, useEffect, useState } from "@wordpress/element";
import { request } from '../functions';

export const SettingsDataContext = createContext( {} );

export const SettingsDataProvider = ( { children } ) => {
	const [ settingsControls, setSettingsControls ] = useState( [] );

	useEffect( () => {
		request( 'settings-controls' ).then( setSettingsControls );
	}, [] );

	return <SettingsDataContext.Provider value={ { settingsControls } }>
		{ children }
	</SettingsDataContext.Provider>;
};