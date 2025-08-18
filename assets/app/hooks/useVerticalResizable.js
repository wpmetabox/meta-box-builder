import { useEffect, useRef, useState } from 'react';

const getSavedHeight = ( storageKey, defaultHeight, minHeight, maxHeight ) => {
	const savedHeight = localStorage.getItem( storageKey );
	if ( !savedHeight ) {
		return defaultHeight;
	}

	const parsedHeight = parseInt( savedHeight, 10 );
	if ( parsedHeight >= minHeight && parsedHeight <= maxHeight ) {
		return parsedHeight;
	}

	return defaultHeight;
};

const useVerticalResizable = ( {
	storageKey = 'mbb-nav-height',
	defaultHeight = 480,
	minHeight = 300,
	maxHeight = 800,
	callback,
} ) => {
	const [ height, setHeight ] = useState( getSavedHeight( storageKey, defaultHeight, minHeight, maxHeight ) );
	const [ resizing, setResizing ] = useState( false );
	const startYRef = useRef( 0 );
	const startHeightRef = useRef( 0 );

	useEffect( () => {
		callback?.( height );
	}, [ height, callback ] );

	const handleMouseDown = e => {
		e.preventDefault();
		setResizing( true );
		startYRef.current = e.clientY;
		startHeightRef.current = height;
	};

	const handleMouseMove = e => {
		if ( !resizing ) {
			return;
		}

		const deltaY = e.clientY - startYRef.current;
		const newHeight = Math.min( maxHeight, Math.max( minHeight, startHeightRef.current + deltaY ) );

		setHeight( newHeight );
		localStorage.setItem( storageKey, newHeight );
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

	return { height, handleMouseDown };
};

export default useVerticalResizable;