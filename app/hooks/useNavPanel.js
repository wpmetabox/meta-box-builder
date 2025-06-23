import { create } from 'zustand';

document.body.dataset.navPanel = 'field-group-settings';

const useNavPanel = create( ( set, get ) => ( {
	navPanel: 'field-group-settings',
	setNavPanel: panel => {
		if ( get().navPanel === panel ) {
			return;
		}

		set( state => ( { navPanel: panel } ) );

		// Add an [data-nav-panel] to the <body> for CSS.
		document.body.dataset.navPanel = panel;
	}
} ) );

export default useNavPanel;