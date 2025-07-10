import { Button, Icon } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { chevronDown, chevronUp, plus } from '@wordpress/icons';
import usePanelStates from '../hooks/usePanelStates';

const PersistentPanelBodyWithAdd = ( {
	panelId,
	initialOpen = false,
	title,
	children,
	onAdd,
	empty,
} ) => {
	const { getPanelState, setPanelState } = usePanelStates();
	const [ open, setOpen ] = useState( getPanelState( panelId, initialOpen ) );

	const toggle = () => {
		if ( empty ) {
			return;
		}

		const newState = !open;
		setOpen( newState );
		setPanelState( panelId, newState );
	};

	const addNew = e => {
		if ( ! empty ) {
			return;
		}

		e.stopPropagation();
		setOpen( true );
		setPanelState( panelId, true );
		onAdd();
	};

	return (
		<div className={ `components-panel__body ${ open && ! empty ? 'is-opened' : '' }` }>
			<h2 className="components-panel__body-title">
				<Button
					__next40pxDefaultSize
					className="components-panel__body-toggle"
					onClick={ toggle }
				>
					<span aria-hidden="true" onClick={ addNew }>
						<Icon
							className="components-panel__arrow"
							icon={ empty ? plus : ( open ? chevronUp : chevronDown ) }
						/>
					</span>
					{ title }
				</Button>
			</h2>
			{ open && ! empty && children }
		</div>
	);
};

export default PersistentPanelBodyWithAdd;