import { useEffect, useState } from '@wordpress/element';
import { lists } from '../list-functions';

const useRootFields = () => {
	const [ fields, setFields ] = useState( [] );

	useEffect( () => {
		if ( ! lists.has( 'root' ) ) {
			setFields( [] );
			return undefined;
		}

		const store = lists.get( 'root' );
		const update = () => setFields( [ ...store.getState().fields ] );
		update();
		return store.subscribe( update );
	}, [] );

	return fields;
};

export default useRootFields;
