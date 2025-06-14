import { useEffect, useState } from '@wordpress/element';
import { lists } from '../list-functions';

const useAllFields = () => {
	const [ fields, setFields ] = useState( [] );

	useEffect( () => {
		const unsubscribes = [];

		const updateFields = () => {
			const all = Array.from( lists.values() ).flatMap( store => store.getState().fields );
			setFields( all );
		};

		// Subscribe to each store
		lists.forEach( store => {
			const unsubscribe = store.subscribe( () => {
				updateFields();
			} );
			unsubscribes.push( unsubscribe );
		} );

		// Initial call
		updateFields();

		return () => {
			unsubscribes.forEach( unsub => unsub() );
		};
	}, [] );

	return fields;
};

export default useAllFields;