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

	validateAndUpdateObjectType: () => {
		const objectType = get().getSetting( 'object_type', 'post' );

		// Map object types to their required extensions
		const extensionMap = {
			block: 'blocks',
			term: 'termMeta',
			user: 'userMeta',
			comment: 'commentMeta',
			setting: 'settingsPage'
		};

		// Check if the current object type requires an extension that's not available
		const requiredExtension = extensionMap[objectType];
		const isValidType = !requiredExtension || MbbApp.extensions[requiredExtension];

		// If invalid, fallback to 'post'
		const newObjectType = isValidType ? objectType : 'post';

		// Update setting if changed
		if ( newObjectType !== objectType ) {
			get().updateSetting( 'object_type', newObjectType );
		}

		return newObjectType;
	},
	updateObjectType: value => {
		const key = 'object_type';
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

		// Remove other settings that are not relevant for the selected object type.
		if ( value === 'post' ) {
			dotProp.delete( updatedSettings, 'taxonomies' );
			dotProp.delete( updatedSettings, 'settings_pages' );
			dotProp.delete( updatedSettings, 'type' );
		} else if ( value === 'term' ) {
			dotProp.delete( updatedSettings, 'post_types' );
			dotProp.delete( updatedSettings, 'settings_pages' );
			dotProp.delete( updatedSettings, 'type' );
		} else if ( value === 'setting' ) {
			dotProp.delete( updatedSettings, 'post_types' );
			dotProp.delete( updatedSettings, 'taxonomies' );
			dotProp.delete( updatedSettings, 'type' );
		} else if ( [ 'block', 'user', 'comment' ].includes( value ) ) {
			dotProp.delete( updatedSettings, 'post_types' );
			dotProp.delete( updatedSettings, 'taxonomies' );
			dotProp.delete( updatedSettings, 'settings_pages' );
		}

		set( { settings: updatedSettings } );
	},

	getPostTypes: () => sanitize( ensureArray( get().getSetting( 'post_types', [ 'post' ] ) ) ),
	updatePostTypes: post_types => get().updateSetting( 'post_types', sanitize( post_types ) ),

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