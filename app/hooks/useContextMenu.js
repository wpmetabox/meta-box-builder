import { useState, useEffect } from '@wordpress/element';

const useContextMenu = () => {
	const [ isOpen, setOpen ] = useState( false );
	const [ position, setPosition ] = useState( {
		x: 0,
		y: 0,
	} );

	const openContextMenu = e => {
		e.preventDefault();
		setOpen( true );
		setPosition( { x: event.offsetX, y: event.offsetY } );
	};

	const clostContextMenu = () => setOpen( false );

	useEffect( () => {
		document.addEventListener( "click", clostContextMenu );

		return () => {
			document.removeEventListener( "click", clostContextMenu );
		};
	}, [] );

	return {
		isContextMenuOpen: isOpen,
		openContextMenu,
		contextMenuPosition: position,
	};
};

export default useContextMenu;
