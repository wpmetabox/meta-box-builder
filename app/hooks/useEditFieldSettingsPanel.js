import { create } from 'zustand';

const useEditFieldSettingsPanel = create( set => ( {
	portalElement: null,
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
} ) );

export default useEditFieldSettingsPanel;