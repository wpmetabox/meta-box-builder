import { create } from 'zustand';

const useEditFieldSettingsPanel = create( set => ( {
	portalElement: null,
	activeFieldId: '',
	setPortalElement: portalElement => set( state => ( { portalElement } ) ),
	setActiveFieldId: activeFieldId => set( state => ( { activeFieldId } ) ),
} ) );

export default useEditFieldSettingsPanel;