import { create } from 'zustand';

const useSidebarPanel = create( set => ( {
	sidebarPanel: 'add_field',
	setSidebarPanel: sidebarPanel => {
		set( state => ( { sidebarPanel } ) );

		// Add an extra class to the <body> for styling.
		document.body.classList.toggle( 'mb-no-sidebar', !sidebarPanel );
	}
} ) );

export default useSidebarPanel;