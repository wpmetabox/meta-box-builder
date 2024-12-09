import { create } from 'zustand';

const useSidebarPanel = create( set => ( {
	sidebarPanel: 'add_field',
	setSidebarPanel: sidebarPanel => set( state => ( { sidebarPanel } ) ),
} ) );

export default useSidebarPanel;