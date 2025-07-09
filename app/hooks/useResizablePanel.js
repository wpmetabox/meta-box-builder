import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'mbb-structure-panel-width';
const MIN_WIDTH = 300;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 350;

const getSavedWidth = () => {
	const savedWidth = localStorage.getItem( STORAGE_KEY );
	if ( !savedWidth ) {
		return DEFAULT_WIDTH;
	}

	const parsedWidth = parseInt( savedWidth, 10 );
	if ( parsedWidth >= MIN_WIDTH ) {
		return parsedWidth;
	}

	return DEFAULT_WIDTH;
};

const useResizablePanel = () => {
	const [ width, setWidth ] = useState( getSavedWidth() );
	const [ resizing, setResizing ] = useState( false );
	const startXRef = useRef( 0 );
	const startWidthRef = useRef( 0 );

	useEffect( () => {
		document.querySelector( '.mb' )?.style.setProperty( '--nav-width', `${ width }px` );
	}, [ width ] );

	const updateWidth = value => {
		setWidth( value );
		localStorage.setItem( STORAGE_KEY, value );
	};

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
		const newWidth = Math.min( MAX_WIDTH, Math.max( MIN_WIDTH, startWidthRef.current + deltaX ) );
		updateWidth( newWidth );
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

export default useResizablePanel;