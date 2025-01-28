import { create } from 'zustand';

const useFieldSettingsPanel = create( set => ( {
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
			const fieldElement = document.getElementById( `mb-field-${ activeField._id }` );
			if ( !fieldElement ) {
				return;
			}
			const rect = fieldElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

            const isPartiallyInView = (
                rect.top < viewportHeight &&
                rect.bottom > 0 &&
                rect.left < viewportWidth &&
                rect.right > 0
            );

            if ( !isPartiallyInView ) {
                fieldElement.scrollIntoView( { behavior: 'smooth', block: 'center' } );
            }
		}, 0 );
	}
} ) );

export default useFieldSettingsPanel;