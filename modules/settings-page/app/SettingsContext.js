const { createContext, useState } = wp.element;

const SettingsContext = createContext();

const SettingsProvider = ( { children, initialValue } ) => {
	const [ settings, setSettings ] = useState( initialValue );
	const updateSettings = data => setSettings( prev => ( { ...prev, ...data } ) );

	return (
		<SettingsContext.Provider value={ { settings, updateSettings } }>
			{ children }
		</SettingsContext.Provider>
	);
};

export { SettingsProvider, SettingsContext };
