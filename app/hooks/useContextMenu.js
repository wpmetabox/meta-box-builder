import { useEffect, useState } from '@wordpress/element';

const useContextMenu = () => {
	const [ isOpen, setOpen ] = useState( false );
	const [ position, setPosition ] = useState( {
		x: 0,
		y: 0,
	} );

	const openContextMenu = e => {
		e.preventDefault();
		setOpen( true );

		const parent = e.target.closest( '.og-item' );
		const rect = parent.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		setPosition( { x, y } );
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
