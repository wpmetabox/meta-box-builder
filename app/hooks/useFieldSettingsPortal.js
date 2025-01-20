import { create } from 'zustand';

const useFieldSettingsPortal = create( set => ( {
	portalElement: null,
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
} ) );

export default useFieldSettingsPortal;