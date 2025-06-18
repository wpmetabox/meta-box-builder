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

		const element = elementRef.current;
		const header = element.querySelector( '.components-panel__header' );

		if ( !header ) {
			return;
		}

		const onMouseDown = e => {
			if ( e.target.closest( 'button' ) ) {
				return;
			}

			dragRef.current = {
				dragging: true,
				x: e.clientX - position.right,
				y: e.clientY - position.top
			};

			document.addEventListener( 'mousemove', onMouseMove );
			document.addEventListener( 'mouseup', onMouseUp );
		};

		const onMouseMove = e => {
			if ( !dragRef.current.dragging ) {
				return;
			}

			const newRight = e.clientX - dragRef.current.x;
			const newTop = e.clientY - dragRef.current.y;

			// Keep panel within viewport bounds
			const maxRight = window.innerWidth - 50;
			const maxTop = window.innerHeight - 100;
			const minRight = 50;
			const minTop = 50;

			const constrainedRight = Math.max( minRight, Math.min( maxRight, newRight ) );
			const constrainedTop = Math.max( minTop, Math.min( maxTop, newTop ) );

			setPosition( {
				top: constrainedTop,
				right: constrainedRight
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