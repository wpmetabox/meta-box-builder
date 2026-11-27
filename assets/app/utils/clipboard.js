export const CLIPBOARD_EVENT = 'mbb-clipboard';

// localStorage so a copy survives another field group or browser tab.
const memory = {};

export const clipboardKey = type => `mbb_clipboard_${ type }`;

const readStored = type => {
	try {
		const value = JSON.parse( localStorage.getItem( clipboardKey( type ) ) );
		return value && typeof value === 'object' ? value : null;
	} catch ( error ) {
		return null;
	}
};

export const setClipboard = ( type, value ) => {
	memory[ type ] = value;
	try {
		localStorage.setItem( clipboardKey( type ), JSON.stringify( value ) );
	} catch ( error ) {
		// Private mode or a full quota. Same-tab paste still reads memory.
	}
	window.dispatchEvent( new CustomEvent( CLIPBOARD_EVENT, { detail: type } ) );
};

export const getClipboard = type => memory[ type ] ?? readStored( type );

// Another tab wrote storage. Prefer that over this tab's memory.
export const syncClipboard = type => {
	const value = readStored( type );
	if ( value ) {
		memory[ type ] = value;
		return value;
	}
	delete memory[ type ];
	return null;
};
