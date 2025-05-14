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

	// Close context menu when scroll inside the editor, or click, or press any key.
	const closeContextMenu = () => setOpen( false );
	const editor = document.querySelector( '.mb-body__inner' );

	useEffect( () => {
		editor.addEventListener( 'scroll', closeContextMenu );
		document.addEventListener( 'keydown', closeContextMenu );
		document.addEventListener( 'click', closeContextMenu );

		return () => {
			editor.removeEventListener( 'scroll', closeContextMenu );
			document.removeEventListener( 'keydown', closeContextMenu );
			document.removeEventListener( 'click', closeContextMenu );
		};
	}, [] );

	return {
		isContextMenuOpen: isOpen,
		openContextMenu,
		contextMenuPosition: position,
	};
};

export default useContextMenu;
