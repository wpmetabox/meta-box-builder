import dotProp from 'dot-prop';
const { lazy } = wp.element;

const ucfirst = string => string[ 0 ].toUpperCase() + string.slice( 1 );
export const ucwords = ( string, delimitor = ' ', join = ' ' ) => string.split( delimitor ).map( ucfirst ).join( join );

export const uniqid = () => Math.random().toString( 36 ).substr( 2 );

let apiCache = {};
export const request = async ( apiName, params = {}, method = 'GET', cache = true ) => {
	let cacheKey = JSON.stringify( { apiName, params, method } );
	if ( cache && apiCache[ cacheKey ] ) {
		return apiCache[ cacheKey ];
	}

	let options = {
		method,
		headers: { 'X-WP-Nonce': MbbApp.nonce, 'Content-Type': 'application/json' },
	};
	if ( 'POST' === method ) {
		options.body = JSON.stringify( params );
	} else {
		apiName += '?' + ( new URLSearchParams( params ) ).toString();
	}
	const result = await fetch( `${ MbbApp.rest }/mbb/${ apiName }`, options ).then( response => response.json() );
	apiCache[ cacheKey ] = result;
	return result;
};

export const ensureArray = arr => {
	if ( Array.isArray( arr ) ) {
		return arr;
	}
	const isObject = typeof arr === 'object' && null !== arr;
	return isObject ? Object.values( arr ) : [];
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
export const getControlParams = ( control, objectValue, importFallback ) => {
	const Control = lazy( () => import( `/controls/${ control.name }` ).catch( importFallback ) );

	const name = dotProp.get( control.props, 'name', control.setting );

	// Convert name => [name], name[subfield] => [name][subfield].
	const input = name.replace( /^([^\[]+)/, '[$1]' );

	const key = bracketsToDots( name );
	let defaultValue = dotProp.get( objectValue, key );

	if ( defaultValue === undefined ) {
		const isNew = dotProp.get( objectValue, '_new', false );
		defaultValue = isNew ? control.defaultValue : getDefaultControlValue( control.name );
	}

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