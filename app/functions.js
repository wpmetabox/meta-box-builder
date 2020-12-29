import dotProp from 'dot-prop';

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

export const getFieldValue = key => {
	const data = serializeForm( document.querySelector( '#post' ) );
	return dotProp.get( data, bracketsToDots( key ) );
}

const serializeForm = form => {
	const formData = new FormData( form );

	let data = {};

	// Convert `<select multiple>` and checkboxes values to array when more than one option is selected.
	for ( let [ key, value ] of formData ) {
		key = bracketsToDots( key );
		if ( key in data ) {
			const oldValue = dotProp.get( data, key );
			value = Array.isArray( oldValue ) ? [ ...oldValue, value ] : [ oldValue, value ];
		}
		dotProp.set( data, key, value );
	}

	return data;
};

const bracketsToDots = key => key.replace( /\[\]/g, '' ).replace( /\[(.+?)\]/g, '.$1' );