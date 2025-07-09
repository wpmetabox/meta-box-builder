import { Button, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const PanelBody = ( {
	title,
	children,
	onToggle,
	value,
	toggleValue,
	tooltip,
} ) => {
	const [ open, setOpen ] = useState( value );

	const toggle = () => {
		// Allow toggle only if it's enabled.
		if ( !value ) {
			return;
		}
		setOpen( state => !state );
		onToggle?.( !open );
	};

	const localToggleValue = value => {
		setOpen( value );
		toggleValue( value );
	};

	return (
		<div className={ `components-panel__body ${ open ? 'is-opened' : '' }` }>
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
			{ open && children }
		</div>
	);
};

export default PanelBody;
