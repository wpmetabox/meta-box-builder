import dotProp from 'dot-prop';
import { create } from 'zustand';

const useSettings = create( ( set, get ) => ( {
	settings: MbbApp.settings || {},

	getSetting: ( name, defaultValue = null ) => dotProp.get( get().settings, name, defaultValue ),

	updateSetting: ( key, value ) => {
		const settings = get().settings;
		const currentValue = dotProp.get( settings, key );

		// Don't update if the value is the same
		if ( currentValue === value ) {
			return;
		}

		// Create a deep clone of the settings to avoid reference issues
		const updatedSettings = structuredClone( settings );

		// Set the value using dot notation
		dotProp.set( updatedSettings, key, value );

		set( { settings: updatedSettings } );
	},
} ) );

export default useSettings;