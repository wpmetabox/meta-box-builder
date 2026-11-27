import { useEffect, useState } from '@wordpress/element';
import { CLIPBOARD_EVENT, clipboardKey, getClipboard, setClipboard, syncClipboard } from '../utils/clipboard';

const useClipboard = type => {
	const [ value, setValue ] = useState( () => getClipboard( type ) );

	useEffect( () => {
		const refresh = event => {
			if ( event.type === 'storage' && event.key === clipboardKey( type ) ) {
				setValue( syncClipboard( type ) );
			}
			if ( event.detail === type ) {
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
