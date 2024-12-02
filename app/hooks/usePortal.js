import { create } from 'zustand';

const usePortal = create( set => ( {
	portal: null,
	setup: element => set( state => ( { portal: element } ) ),
} ) );

export default usePortal;