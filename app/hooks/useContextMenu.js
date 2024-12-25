import { useEffect, useState } from '@wordpress/element';

const useContextMenu = () => {
	const [ isOpen, setOpen ] = useState( false );
	const [ position, setPosition ] = useState( {
		x: 0,
		y: 0,
	} );

	const openContextMenu = e => {
		const parent = e.target.closest( '.mb-field' );
		if ( !parent ) {
			return;
		}

		const x = e.clientX;
		const y = e.clientY;

		e.preventDefault();
		e.stopPropagation();
		setOpen( true );
		setPosition( { x, y } );
	};

	const closeContextMenu = () => setOpen( false );

	useEffect( () => {
		document.addEventListener( "click", closeContextMenu );

		return () => {
			document.removeEventListener( "click", closeContextMenu );
		};
	}, [] );

	return {
		isContextMenuOpen: isOpen,
		openContextMenu,
		contextMenuPosition: position,
	};
};

export default useContextMenu;
