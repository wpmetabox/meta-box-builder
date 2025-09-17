/**
 * Hook to fetch data from the API and store it globally.
 */

import { create } from 'zustand';
import { fetcher } from './useFetch';

const useFieldTypes = create( ( set, get ) => ( {
	fieldTypes: {},
	fetched: false,

	fetch: async () => {
		if ( get().fetched ) {
			return;
		}

		const fieldTypes = await fetcher( { api: 'field-types' } );
		// Store field types in MbbApp to access them globally, e.g. to get icon for custom field types.
		MbbApp.field_types = fieldTypes;
		set( { fieldTypes, fetched: true } );
	},
} ) );

export default useFieldTypes;