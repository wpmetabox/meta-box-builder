import { useEffect, useRef } from '@wordpress/element';
import useFloatingStructurePanel from './useFloatingStructurePanel';

const useDraggable = ( enabled = true ) => {
	const elementRef = useRef( null );
	const { position, setPosition } = useFloatingStructurePanel();
	const dragRef = useRef( { dragging: false, x: 0, y: 0 } );

	useEffect( () => {
		if ( !enabled || !elementRef.current ) {
			return;
		}

		const header = elementRef.current.querySelector( '.components-panel__header' );

		const onMouseDown = e => {
			// Don't start drag if clicking on buttons
			if ( e.target.closest( 'button' ) ) {
				return;
			}

			dragRef.current = {
				dragging: true,
				x: e.clientX,
				y: e.clientY,
			};

			// Add event listeners to document for mouse move and up
			// Mouse events are attached to the document so dragging continues even if the mouse moves outside the header.
			document.addEventListener( 'mousemove', onMouseMove );
			document.addEventListener( 'mouseup', onMouseUp );

			// Prevent text selection during drag
			e.preventDefault();
		};

		const onMouseMove = e => {
			if ( !dragRef.current.dragging ) {
				return;
			}

			const horizontal = e.clientX - dragRef.current.x;
			const vertical = e.clientY - dragRef.current.y;

			setPosition( {
				top: position.top + vertical,
				right: position.right - horizontal,
			} );
		};

		const onMouseUp = () => {
			dragRef.current.dragging = false;
			document.removeEventListener( 'mousemove', onMouseMove );
			document.removeEventListener( 'mouseup', onMouseUp );
		};

		header.addEventListener( 'mousedown', onMouseDown );

		return () => {
			header.removeEventListener( 'mousedown', onMouseDown );
			document.removeEventListener( 'mousemove', onMouseMove );
			document.removeEventListener( 'mouseup', onMouseUp );
		};
	}, [ enabled, position, setPosition ] );

	return elementRef;
};

export default useDraggable;