import { useEffect, useRef, useState } from 'react';

const getSavedWidth = ( storageKey, defaultWidth, minWidth, maxWidth ) => {
	const savedWidth = localStorage.getItem( storageKey );
	if ( !savedWidth ) {
		return defaultWidth;
	}

	const parsedWidth = parseInt( savedWidth, 10 );
	if ( parsedWidth >= minWidth && parsedWidth <= maxWidth ) {
		return parsedWidth;
	}

	return defaultWidth;
};

const useResizable = ( {
	storageKey = 'mbb-nav-width',
	defaultWidth = 350,
	minWidth = 300,
	maxWidth = 600,
	callback,
} ) => {
	const [ width, setWidth ] = useState( getSavedWidth( storageKey, defaultWidth, minWidth, maxWidth ) );
	const [ resizing, setResizing ] = useState( false );
	const startXRef = useRef( 0 );
	const startWidthRef = useRef( 0 );

	useEffect( () => {
		callback?.( width );
	}, [ width, callback ] );

	const handleMouseDown = e => {
		e.preventDefault();
		setResizing( true );
		startXRef.current = e.clientX;
		startWidthRef.current = width;
	};

	const handleMouseMove = e => {
		if ( !resizing ) {
			return;
		}

		const deltaX = e.clientX - startXRef.current;
		const newWidth = Math.min( maxWidth, Math.max( minWidth, startWidthRef.current + deltaX ) );

		setWidth( newWidth );
		localStorage.setItem( storageKey, newWidth );
	};

	const handleMouseUp = () => setResizing( false );

	useEffect( () => {
		if ( resizing ) {
			document.addEventListener( 'mousemove', handleMouseMove );
			document.addEventListener( 'mouseup', handleMouseUp );
		}

		return () => {
			document.removeEventListener( 'mousemove', handleMouseMove );
			document.removeEventListener( 'mouseup', handleMouseUp );
		};
	}, [ resizing, handleMouseMove, handleMouseUp ] );

	return { width, handleMouseDown };
};

export default useResizable;