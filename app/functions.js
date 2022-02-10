import { lazy } from "@wordpress/element";
import dotProp from 'dot-prop';

const ucfirst = string => string[ 0 ].toUpperCase() + string.slice( 1 );
export const ucwords = ( string, delimitor = ' ', join = ' ' ) => string.split( delimitor ).map( ucfirst ).join( join );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

let apiCache = {};
export const request = async ( apiName, params = {}, method = 'GET', cache = true ) => {
	const cacheKey = JSON.stringify( { apiName, params, method } );
	if ( cache && apiCache[ cacheKey ] ) {
		return apiCache[ cacheKey ];
	}

	let options = {
		method,
		headers: { 'X-WP-Nonce': MbbApp.nonce, 'Content-Type': 'application/json' },
	};
	let url = `${ MbbApp.rest }/mbb/${ apiName }`;

	const query = ( new URLSearchParams( params ) ).toString();
	if ( 'POST' === method ) {
		options.body = JSON.stringify( params );
	} else if ( query ) {
		url += MbbApp.rest.includes( '?' ) ? query : `?${ query }`;
	}
	const result = await fetch( url, options ).then( response => response.json() );
	apiCache[ cacheKey ] = result;
	return result;
};

export const ensureArray = arr => {
	if ( Array.isArray( arr ) ) {
		return arr;
	}
	if ( ! arr ) {
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

	const key = bracketsToDots( name );
	const defaultValue = dotProp.get( objectValue, key, defaultFallbackValue );

	return [ Control, input, defaultValue ];
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
	};
	return defaultValues.hasOwnProperty( name ) ? defaultValues[ name ] : '';
};