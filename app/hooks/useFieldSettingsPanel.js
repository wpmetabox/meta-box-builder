import { create } from 'zustand';

const useFieldSettingsPanel = create( set => ( {
	portalElement: null,
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
} ) );

export default useFieldSettingsPanel;