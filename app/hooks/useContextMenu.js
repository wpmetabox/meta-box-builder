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

		const rect = parent.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		e.preventDefault();
		e.stopPropagation();
		setOpen( true );
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
