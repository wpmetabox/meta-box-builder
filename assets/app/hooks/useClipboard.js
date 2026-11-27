import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// localStorage throws in private mode or when the quota is full.
// The in-memory store still updates, so same-tab paste works.
const storageCall = ( fn, fallback ) => {
	try {
		return fn();
	} catch ( error ) {
		return fallback;
	}
};

const storage = {
	getItem: name => storageCall( () => localStorage.getItem( name ), null ),
	setItem: ( name, value ) => storageCall( () => localStorage.setItem( name, value ) ),
	removeItem: name => storageCall( () => localStorage.removeItem( name ) ),
};

const useClipboard = create( persist( set => ( {
	conditional_logic: null,
	copy: ( type, value ) => set( { [ type ]: value } ),
} ), {
	name: 'mbb-clipboard',
	storage: createJSONStorage( () => storage ),
} ) );

// Pick up copies made in other browser tabs.
window.addEventListener( 'storage', event => event.key === 'mbb-clipboard' && useClipboard.persist.rehydrate() );

export default useClipboard;
