import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

const cacheData = {};

export const fetcher = ( { api, params = {}, method = 'GET', cache = true } ) => {
	const key = JSON.stringify( { api, params, method } );
	if ( cache && cacheData[ key ] ) {
		return cacheData[ key ];
	}

	let path = `/mbb/${ api }`;
	if ( method === 'GET' ) {
		path = addQueryArgs( path, params );
	}

	const data = apiFetch( {
		path,
		method,
		data: method === 'POST' ? params : null
	} );
	cacheData[ key ] = data;
	return data;
};

export const useFetch = ( {
	api,
	params = {},
	method = 'GET',
	defaultValue = null,
	cache = true,
} ) => {
	const [ data, setData ] = useState( defaultValue );
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		const fetchData = async () => {
			setLoading( true );
			try {
				const data = await fetcher( { api, params, method, cache } );
				setData( data );
			} catch ( error ) {
				setError( error );
			} finally {
				setLoading( false );
			}
		};
		fetchData();
	}, [] );

	return { data, loading, error };
};
