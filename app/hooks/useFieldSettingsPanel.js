import { create } from 'zustand';

const useFieldSettingsPanel = create( set => ( {
	portalElement: null,
	activeField: {},
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
	setActiveField: activeField => set( state => ( { activeField: { ...activeField } } ) ),
} ) );

export default useFieldSettingsPanel;