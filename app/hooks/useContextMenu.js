import { create } from 'zustand';

const useContextMenu = create( set => ( {
	isOpen: false,
	isModalOpen: false,
	position: { left: 0, top: 0 },
	field: null,
	fieldActions: null,

	openContextMenu: ( e, field, fieldActions ) => {
		const parent = e.target.closest( '.mb-field' );
		if ( !parent ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		set( {
			isOpen: true,
			position: { left: e.clientX, top: e.clientY },
			field,
			fieldActions,
		} );
	},

	closeContextMenu: () => set( { isOpen: false } ),
	openModal: () => set( { isModalOpen: true } ),
	closeModal: () => set( { isModalOpen: false } ),
} ) );

export default useContextMenu;
