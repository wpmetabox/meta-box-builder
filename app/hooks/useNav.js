import { create } from 'zustand';

const useNav = create( set => ( {
	navPanel: 'add_field',
	setNavPanel: navPanel => {
		set( state => ( { navPanel } ) );

		// Add an extra class to the <body> for styling.
		document.body.classList.toggle( 'mb-no-nav', !navPanel );
	}
} ) );

export default useNav;