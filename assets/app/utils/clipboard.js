export const CLIPBOARD_EVENT = 'mbb-clipboard';

// localStorage so a copy survives another field group or browser tab.
export const clipboardKey = type => `mbb_clipboard_${ type }`;

export const setClipboard = ( type, value ) => {
	localStorage.setItem( clipboardKey( type ), JSON.stringify( value ) );
	window.dispatchEvent( new CustomEvent( CLIPBOARD_EVENT, { detail: type } ) );
};

export const getClipboard = type => {
	try {
		const value = JSON.parse( localStorage.getItem( clipboardKey( type ) ) );
		return value && typeof value === 'object' ? value : null;
	} catch ( error ) {
		return null;
	}
};
