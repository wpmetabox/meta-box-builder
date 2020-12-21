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