import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useClipboard = create( persist( set => ( {
	conditional_logic: null,
	copy: ( type, value ) => set( { [ type ]: value } ),
} ), { name: 'mbb-clipboard' } ) );

// Pick up copies made in other browser tabs.
window.addEventListener( 'storage', event => event.key === 'mbb-clipboard' && useClipboard.persist.rehydrate() );

export default useClipboard;
