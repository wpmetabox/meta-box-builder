import { create } from 'zustand';

const STORAGE_KEY = 'mbb-panels-states';

const getSavedStates = () => {
	try {
		const stored = localStorage.getItem( STORAGE_KEY );
		return stored ? JSON.parse( stored ) : {};
	} catch ( error ) {
		return {};
	}
};

const usePanelStates = create( ( set, get ) => ( {
	panelStates: getSavedStates(),

	getPanelState: ( panelId, defaultOpen = true ) => {
		const { panelStates } = get();
		return panelStates[ panelId ] !== undefined ? panelStates[ panelId ] : defaultOpen;
	},

	setPanelState: ( panelId, isOpen ) => {
		set( state => {
			const panelStates = { ...state.panelStates, [ panelId ]: isOpen };

			localStorage.setItem( STORAGE_KEY, JSON.stringify( panelStates ) );

			return { panelStates };
		} );
	},
} ) );

export default usePanelStates;