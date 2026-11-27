import { useEffect, useState } from '@wordpress/element';
import { CLIPBOARD_EVENT, clipboardKey, getClipboard, setClipboard } from '../utils/clipboard';

const useClipboard = type => {
	const [ value, setValue ] = useState( () => getClipboard( type ) );

	useEffect( () => {
		const refresh = event => {
			const matches = event.type === 'storage'
				? event.key === clipboardKey( type )
				: event.detail === type;

			if ( matches ) {
				setValue( getClipboard( type ) );
			}
		};

		window.addEventListener( CLIPBOARD_EVENT, refresh );
		window.addEventListener( 'storage', refresh );

		return () => {
			window.removeEventListener( CLIPBOARD_EVENT, refresh );
			window.removeEventListener( 'storage', refresh );
		};
	}, [ type ] );

	return {
		value,
		copy: data => setClipboard( type, data ),
	};
};

export default useClipboard;
