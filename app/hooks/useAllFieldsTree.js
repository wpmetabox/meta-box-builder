import { useEffect, useState } from '@wordpress/element';
import { lists } from '../list-functions';

const useAllFieldsTree = () => {
	const [ fields, setFields ] = useState( [] );

	useEffect( () => {
		const unsubscribes = [];

		const buildFieldsTree = () => {
			// Get all root fields first
			const rootFields = lists.has( 'root' )
				? [ ...lists.get( 'root' ).getState().fields ]
				: [];

			// Process each field to include sub-fields for groups
			const processField = ( field ) => {
				// Deep clone the field to avoid reference issues
				const processedField = { ...field };

				// If it's a group field, get its sub-fields
				if ( field.type === 'group' && lists.has( field._id ) ) {
					processedField.fields = lists.get( field._id ).getState().fields.map( processField );
				}

				return processedField;
			};

			// Process all root fields
			const allFields = rootFields.map( processField );
			setFields( allFields );
		};

		// Subscribe to each store
		lists.forEach( store => {
			const unsubscribe = store.subscribe( () => {
				buildFieldsTree();
			} );
			unsubscribes.push( unsubscribe );
		} );

		// Initial call
		buildFieldsTree();

		return () => {
			unsubscribes.forEach( unsub => unsub() );
		};
	}, [] );

	return fields;
};

export default useAllFieldsTree;
