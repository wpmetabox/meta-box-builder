import { create } from 'zustand';

const useSidebarPanel = create( ( set, get ) => ( {
	sidebarPanel: 'field_group_settings',
	setSidebarPanel: sidebarPanel => {
		if ( get().sidebarPanel !== sidebarPanel ) {
			set( state => ( { sidebarPanel } ) );
		}
	},
} ) );

export default useSidebarPanel;