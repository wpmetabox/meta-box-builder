import { create } from 'zustand';

const useStructureCollapse = create( ( set, get ) => ( {
	allExpanded: true,
	toggleAll: () => set( state => ( { allExpanded: !state.allExpanded } ) ),
	setAllExpanded: expanded => set( { allExpanded: expanded } )
} ) );

export default useStructureCollapse;