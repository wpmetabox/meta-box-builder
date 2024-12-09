import { create } from 'zustand';

const useMainArea = create( set => ( {
	area: 'fields',
	toggleArea: area => set( state => ( { area: state.area === area ? 'fields' : area } ) ),
} ) );

export default useMainArea;