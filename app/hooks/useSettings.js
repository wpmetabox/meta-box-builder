import dotProp from 'dot-prop';
import { create } from 'zustand';
import { ensureArray, parseQueryString } from '../functions';

const getSettings = () => {
	const urlParams = parseQueryString( window.location.search );
	const settings = MbbApp.settings || {};

	return { ...settings, ...urlParams.settings };
};

const sanitize = types => {
	let t = types && Array.isArray( types ) ? types : [ 'post' ];
	// Remove empty value.
	return t.filter( type => /\S/.test( type ) );
};

const useSettings = create( ( set, get ) => ( {
	settings: getSettings(),

	getPrefix: () => get().getSetting( 'prefix', '' ),
	updatePrefix: prefix => get().updateSetting( 'prefix', prefix ),

	getObjectType: () => get().getSetting( 'object_type', 'post' ),
	updateObjectType: object_type => get().updateSetting( 'object_type', object_type ),

	getPostTypes: () => sanitize( ensureArray( get().getSetting( 'post_types', [ 'post' ] ) ) ),
	updatePostTypes: post_types => get().updateSetting( 'post_types', sanitize( post_types ) ),

	getSetting: ( name, defaultValue = null ) => get().settings[ name ] || defaultValue,

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