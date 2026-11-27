import { Button, Icon } from '@wordpress/components';
import { chevronDown, chevronUp, plus } from '@wordpress/icons';
import usePanelStates from '../hooks/usePanelStates';

const PersistentPanelBodyWithAdd = ( {
	panelId,
	initialOpen = false,
	title,
	children,
	onAdd,
	empty,
	titleActions,
} ) => {
	const storedOpen = usePanelStates( state => state.panelStates[ panelId ] );
	const setPanelState = usePanelStates( state => state.setPanelState );
	const open = storedOpen ?? initialOpen;

	const toggle = () => {
		if ( empty ) {
			return;
		}

		setPanelState( panelId, ! open );
	};

	const addNew = e => {
		if ( ! empty ) {
			return;
		}

		e.stopPropagation();
		setPanelState( panelId, true );
		onAdd();
	};

	return (
		<div className={ `components-panel__body ${ open && ! empty ? 'is-opened' : '' }` }>
			<h2 className={ `components-panel__body-title${ titleActions ? ' has-actions' : '' }` }>
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
				{
					titleActions && (
						<>
							<div className="mb-panel-title-actions">{ titleActions }</div>
							<span className="mb-panel-title-fill" onClick={ toggle } />
						</>
					)
				}
			</h2>
			{ open && ! empty && children }
		</div>
	);
};

export default PersistentPanelBodyWithAdd;