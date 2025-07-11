import { Button, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import usePanelStates from '../hooks/usePanelStates';

const PersistentPanelBodyWithToggle = ( {
	panelId,
	title,
	children,
	value,
	toggleValue,
	tooltip,
} ) => {
	const { getPanelState, setPanelState } = usePanelStates();
	const [ open, setOpen ] = useState( getPanelState( panelId, value ) );

	const toggle = () => {
		// Allow toggle only if it's enabled.
		if ( !value ) {
			return;
		}
		const newState = !open;
		setOpen( newState );
		setPanelState( panelId, newState );
	};

	const localToggleValue = value => {
		setOpen( value );
		setPanelState( panelId, value );
		toggleValue( value );
	};

	return (
		<div className={ `components-panel__body ${ open && value ? 'is-opened' : '' }` }>
			<h2 className="components-panel__body-title">
				<Button
					__next40pxDefaultSize
					className="components-panel__body-toggle"
					onClick={ toggle }
					label={ tooltip }
					showTooltip={ !!tooltip }
					tooltipPosition="top right"
				>
					{ /* Prevent toggle from being triggered when clicking on the arrow */ }
					<div className="components-panel__arrow" onClick={ e => e.stopPropagation() }>
						<ToggleControl
							checked={ value }
							onChange={ localToggleValue }
						/>
					</div>
					{ title }
				</Button>
			</h2>
			{ open && value && children }
		</div>
	);
};

export default PersistentPanelBodyWithToggle;