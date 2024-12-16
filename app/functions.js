import { lazy } from "@wordpress/element";
import { archive, backup, border, brush, button, buttons, calendar, captureVideo, category, check, chevronUpDown, cloudUpload, code, color, commentAuthorAvatar, drawerRight, flipHorizontal, formatListBullets, fullscreen, gallery, grid, group, heading, image, inbox, lineDotted, link, mapMarker, page, pages, paragraph, postDate, postFeaturedImage, queryPaginationNumbers, separator, shield, starEmpty, table, tag, textColor, typography, unseen, video } from '@wordpress/icons';
import dotProp from 'dot-prop';
import slugify from "slugify";

export const htmlDecode = innerHTML => Object.assign( document.createElement( 'textarea' ), { innerHTML } ).value;

const ucfirst = string => string.length > 0 ? string[ 0 ].toUpperCase() + string.slice( 1 ) : string;
export const ucwords = ( string, delimitor = ' ', join = ' ' ) => string.split( delimitor ).map( ucfirst ).join( join );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

export const fetcher = ( api, params = {}, method = 'GET' ) => {
	let options = {
		headers: { 'X-WP-Nonce': MbbApp.nonce, 'Content-Type': 'application/json' },
		method
	};
	let url = `${ MbbApp.rest }/mbb/${ api }`;

	if ( method === 'GET' ) {
		const query = ( new URLSearchParams( params ) ).toString();
		if ( query ) {
			url += MbbApp.rest.includes( '?' ) ? `&${ query }` : `?${ query }`;
		}
	} else {
		options.body = JSON.stringify( params );
	}

	return fetch( url, options ).then( response => response.json() );
};

export const ensureArray = arr => {
	if ( Array.isArray( arr ) ) {
		return arr;
	}
	if ( !arr ) {
		return [];
	}
	return typeof arr === 'object' ? Object.values( arr ) : [ arr ];
};

export const parseQueryString = queryString => {
	const params = new URLSearchParams( queryString );
	return convert( params );
};

export const getFieldValue = key => {
	const data = serializeForm( document.querySelector( '#post' ) );
	return dotProp.get( data, bracketsToDots( key ) );
};

const serializeForm = form => {
	const formData = new FormData( form );
	return convert( formData );
};

// Convert form data and query string to objects.
const convert = params => {
	const data = {};

	for ( let [ key, value ] of params ) {
		key = bracketsToDots( key );
		const oldValue = dotProp.get( data, key );
		if ( oldValue !== undefined ) {
			value = Array.isArray( oldValue ) ? [ ...oldValue, value ] : [ oldValue, value ];
		}
		value = value === 'false' ? false : value;
		dotProp.set( data, key, value );
	}

	return data;
};

const bracketsToDots = key => key.replace( '[]', '' ).replace( /\[(.+?)\]/g, '.$1' );

/**
 * Get parameters for a dynamic control.
 *
 * Returns array of:
 * - Lazy loaded control component
 * - Input name in format [name] or [name][subfield]
 * - Default value
 */
export const getControlParams = ( control, objectValue, importFallback, checkNewField = false ) => {
	const Control = lazy( () => import( `/controls/${ control.name }` ).catch( importFallback ) );

	const name = dotProp.get( control.props, 'name', control.setting );

	// Convert name => [name], name[subfield] => [name][subfield].
	const input = name.replace( /^([^\[]+)/, '[$1]' );

	let defaultFallbackValue = control.defaultValue;
	if ( checkNewField && !dotProp.get( objectValue, '_new', false ) ) {
		defaultFallbackValue = getDefaultControlValue( control.name );
	}

	let key = bracketsToDots( name );
	let defaultValue = dotProp.get( objectValue, key, defaultFallbackValue );

	if ( control.name === 'CloneSettings' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, 'clone_settings', [ 'clone', 'sortable', 'clone_default', 'clone_empty_start', 'clone_as_multiple', 'min_clone', 'max_clone', 'add_button' ] );
	}
	if ( control.name === 'InputAttributes' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, 'input_attributes', [ 'disabled', 'readonly' ], false );
	}
	if ( control.name === 'InputGroup' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, control.setting, [ control.props.key1, control.props.key2 ], '' );
	}

	return [ Control, input, defaultValue ];
};

const getFieldValueForCombinedControl = ( objectValue, name, inputName, params, defaultFallbackValue ) => {
	let defaultValue = {};
	params.forEach( param => {
		const key = bracketsToDots( name.replace( inputName, param ) );
		defaultValue[ param ] = dotProp.get( objectValue, key, defaultFallbackValue );
	} );

	return defaultValue;
};

const getDefaultControlValue = name => {
	const defaultValues = {
		Checkbox: false,
		KeyValue: [],
		ReactSelect: [],
		IncludeExclude: [],
		ShowHide: [],
		ConditionalLogic: [],
		CustomTable: [],
		TextLimiter: [],
	};
	return defaultValues.hasOwnProperty( name ) ? defaultValues[ name ] : '';
};

export const sanitizeId = text => slugify( text, { lower: true } )
	.replace( /[^a-z0-9_]/g, '_' )           // Only accepts alphanumeric and underscores.
	.replace( /[ _]{2,}/g, '_' )             // Remove duplicated `_`.
	.replace( /^_/, '' ).replace( /_$/, '' ) // Trim `_`.
	.replace( /^\d+/, '' )                   // Don't start with numbers.
	.replace( /^_/, '' ).replace( /_$/, '' ) // Trim `_` again.
	;

export const inside = ( el, selectors ) => el.matches( selectors ) || el.closest( selectors ) !== null;

export const getFieldIcon = type => {
	const iconMap = {
		autocomplete: lineDotted,
		background: brush,
		button: button,
		button_group: buttons,
		checkbox: check,
		checkbox_list: formatListBullets,
		color: color,
		custom_html: code,
		date: postDate,
		datetime: calendar,
		divider: separator,
		email: inbox,
		fieldset_text: grid,
		file: page,
		file_advanced: pages,
		file_input: flipHorizontal,
		file_upload: cloudUpload,
		map: mapMarker,
		heading: heading,
		hidden: unseen,
		icon: starEmpty,
		image: image,
		image_advanced: gallery,
		image_select: fullscreen,
		image_upload: cloudUpload,
		key_value: category,
		number: chevronUpDown,
		oembed: video,
		osm: mapMarker,
		password: shield,
		post: postFeaturedImage,
		radio: border,
		range: queryPaginationNumbers,
		select: chevronUpDown,
		select_advanced: chevronUpDown,
		sidebar: drawerRight,
		single_image: image,
		slider: queryPaginationNumbers,
		switch: border,
		taxonomy: tag,
		taxonomy_advanced: tag,
		text: textColor,
		text_list: table,
		textarea: paragraph,
		time: backup,
		user: commentAuthorAvatar,
		url: link,
		video: captureVideo,
		wysiwyg: typography,
		group: group,
		tab: archive,
	};

	if ( iconMap[ type ] ) {
		return iconMap[ type ];
	}
};
