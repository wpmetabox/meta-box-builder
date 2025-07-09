import { Button, Panel } from '@wordpress/components';
import { useEffect, useReducer, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { arrowLeft, chevronDown, chevronUp, close } from '@wordpress/icons';
import useFloatingStructurePanel from '../../hooks/useFloatingStructurePanel';
import useNavPanel from '../../hooks/useNavPanel';
import useStructureCollapse from '../../hooks/useStructureCollapse';
import Fields from './Structure/Fields';

const FloatingHeader = ( { expanded, togglePanel } ) => {
	const { setFloating, setVisible } = useFloatingStructurePanel();
	const { setNavPanel } = useNavPanel();
	const { allExpanded, toggleAll } = useStructureCollapse();

	const disableFloating = () => {
		setFloating( false );
		setNavPanel( 'structure' );
	};

	return (
		<>
			<span className="mb-panel__header">{ __( 'Structure', 'meta-box-builder' ) }</span>
			<Button
				icon={ arrowLeft }
				iconSize={ 12 }
				label={ __( 'Back to normal mode', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ disableFloating }
				size="small"
			/>
			<Button
				icon={ allExpanded ? `minus` : `plus-alt2` }
				iconSize={ 12 }
				label={ allExpanded ? __( 'Collapse all groups', 'meta-box-builder' ) : __( 'Expand all groups', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ toggleAll }
				size="small"
			/>
			<Button
				icon={ expanded ? chevronDown : chevronUp }
				iconSize={ 16 }
				label={ expanded ? __( 'Collapse panel', 'meta-box-builder' ) : __( 'Expand panel', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ togglePanel }
				size="small"
			/>
			<Button
				icon={ close }
				iconSize={ 12 }
				label={ __( 'Close panel', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ () => setVisible( false ) }
				size="small"
			/>
		</>
	);
};

const FloatingStructurePanel = () => {
	const { visible, position, offsetX, offsetY, move, setPosition } = useFloatingStructurePanel();
	const [ expanded, togglePanel ] = useReducer( prev => !prev, true );
	const ref = useRef();

	// Apply position for floating panel
	const floatingStyle = {
		top: `${ position.top }px`,
		right: `${ position.right }px`,
		transform: `translate(${ offsetX }px, ${ offsetY }px)`,
	};

	useEffect( () => {
		if ( !ref.current ) {
			return;
		}

		const header = ref.current.querySelector( '.components-panel__header' );
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
	}, [ visible, move, setPosition ] );

	return visible && (
		<div className="mb-panel--floating" style={ floatingStyle } ref={ ref }>
			<Panel header={ <FloatingHeader expanded={ expanded } togglePanel={ togglePanel } /> } className="mb-panel mb-panel--structure">
				{ expanded && <div className="mb-panel__inner"><Fields /></div> }
			</Panel>
		</div>
	);
};

export default FloatingStructurePanel;