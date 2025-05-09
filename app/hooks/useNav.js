import { create } from 'zustand';

document.body.classList.add( 'mb-no-nav' );

const useNav = create( ( set, get ) => ( {
	navPanel: '',
	setNavPanel: panel => {
		if ( get().navPanel === panel ) {
			return;
		}

		set( state => ( { navPanel: panel } ) );

		// Add an extra class to the <body> for styling.
		document.body.classList.toggle( 'mb-no-nav', !panel );
	}
} ) );

export default useNav;