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

	getPrefix: () => get().settings.prefix || '',
	updatePrefix: prefix => set( state => ( {
		settings: { ...state.settings, prefix }
	} ) ),

	getObjectType: () => get().settings.object_type || 'post',
	updateObjectType: object_type => set( state => ( {
		settings: { ...state.settings, object_type }
	} ) ),

	getPostTypes: () => sanitize( ensureArray( get().settings.post_types || [ 'post' ] ) ),
	updatePostTypes: post_types => set( state => ( {
		settings: { ...state.settings, post_types: sanitize( post_types ) }
	} ) ),

	getSetting: ( name, defaultValue = null ) => get().settings[ name ] || defaultValue,
} ) );

export default useSettings;