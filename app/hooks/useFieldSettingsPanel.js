import { create } from 'zustand';
import { scrollIntoView } from '../functions';

const useFieldSettingsPanel = create( ( set, get ) => ( {
	portalElement: null,
	activeField: {},
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
	setActiveField: activeField => {
		set( state => ( { activeField: { ...activeField } } ) );

		if ( !activeField._id ) {
			return;
		}

		// Scroll to active field in the editor.
		setTimeout( () => {
			scrollIntoView( `mb-field-${ activeField._id }` );
		}, 0 );
	},
	isActiveField: field => field._id === get().activeField._id,
} ) );

export default useFieldSettingsPanel;