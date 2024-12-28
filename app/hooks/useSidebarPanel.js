import { create } from 'zustand';

const useSidebarPanel = create( set => ( {
	sidebarPanel: 'field_group_settings',
	setSidebarPanel: sidebarPanel => {
		set( state => ( { sidebarPanel } ) );

		// Add an extra class to the <body> for styling.
		document.body.classList.toggle( 'mb-no-sidebar', !sidebarPanel );
	}
} ) );

export default useSidebarPanel;