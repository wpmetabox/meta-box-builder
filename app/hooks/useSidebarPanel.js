import { create } from 'zustand';

const useSidebarPanel = create( set => ( {
	sidebarPanel: 'field_group_settings',
	setSidebarPanel: sidebarPanel => set( state => ( { sidebarPanel } ) ),
} ) );

export default useSidebarPanel;