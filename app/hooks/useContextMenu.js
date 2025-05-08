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

	// Close context menu when click or scroll inside the editor, or press any key.
	const closeContextMenu = () => setOpen( false );
	const events = [ 'click', 'scroll' ];
	const editor = document.querySelector( '.mb-body__inner' );

	useEffect( () => {
		events.forEach( event => editor.addEventListener( event, closeContextMenu ) );
		document.addEventListener( 'keydown', closeContextMenu );

		return () => {
			events.forEach( event => editor.removeEventListener( event, closeContextMenu ) );
			document.removeEventListener( 'keydown', closeContextMenu );
		};
	}, [] );

	return {
		isContextMenuOpen: isOpen,
		openContextMenu,
		contextMenuPosition: position,
	};
};

export default useContextMenu;
