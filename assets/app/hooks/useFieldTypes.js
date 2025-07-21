/**
 * Hook to fetch data from the API and store it globally.
 */

import { create } from 'zustand';
import { fetcher } from './useFetch';
import useSettings from './useSettings';

const useFieldTypes = create( ( set, get ) => ( {
	fieldTypes: {},
	fetched: false,

	fetch: async () => {
		if ( get().fetched ) {
			return;
		}

		const fieldTypes = await fetcher( { api: 'field-types', params: { mode: useSettings.getState().getSetting( 'mode' ) } } );
		set( { fieldTypes, fetched: true } );
	},
} ) );

export default useFieldTypes;