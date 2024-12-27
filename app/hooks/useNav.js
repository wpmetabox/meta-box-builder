import { create } from 'zustand';

document.body.classList.add( 'mb-no-nav' );

const useNav = create( set => ( {
	navPanel: '',
	setNavPanel: navPanel => {
		set( state => ( { navPanel } ) );

		// Add an extra class to the <body> for styling.
		document.body.classList.toggle( 'mb-no-nav', !navPanel );
	}
} ) );

export default useNav;