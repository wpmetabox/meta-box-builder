import { useEffect, useRef } from '@wordpress/element';
import useFloatingStructurePanel from './useFloatingStructurePanel';

const useDraggable = () => {
	const elementRef = useRef();
	const { move, setPosition } = useFloatingStructurePanel( state => ( { move: state.move, setPosition: state.setPosition } ) );

	useEffect( () => {
		if ( !elementRef.current ) {
			return;
		}

		const header = elementRef.current.querySelector( '.components-panel__header' );
		let dragging = false;
		let startX = 0;
		let startY = 0;
		let offsetX = 0;
		let offsetY = 0;

		const onMouseDown = e => {
			if ( e.target.closest( 'button' ) || dragging ) {
				return;
			}

			dragging = true;
			startX = e.clientX;
			startY = e.clientY;
			offsetX = 0;
			offsetY = 0;

			// Add event listeners to document for mouse move and up
			// Mouse events are attached to the document so dragging continues even if the mouse moves outside the header.
			document.addEventListener( 'mousemove', onMouseMove );
			document.addEventListener( 'mouseup', onMouseUp );

			// Prevent text selection during drag
			e.preventDefault();
		};

		const onMouseMove = e => {
			if ( !dragging ) {
				return;
			}
			offsetX = e.clientX - startX;
			offsetY = e.clientY - startY;
			move( offsetX, offsetY );
		};

		const onMouseUp = () => {
			setPosition( offsetX, offsetY );
			offsetX = 0;
			offsetY = 0;
			dragging = false;
			document.removeEventListener( 'mousemove', onMouseMove );
			document.removeEventListener( 'mouseup', onMouseUp );
		};

		header.addEventListener( 'mousedown', onMouseDown );

		return () => {
			header.removeEventListener( 'mousedown', onMouseDown );
			document.removeEventListener( 'mousemove', onMouseMove );
			document.removeEventListener( 'mouseup', onMouseUp );
		};
	}, [ move, setPosition ] );

	return elementRef;
};

export default useDraggable;