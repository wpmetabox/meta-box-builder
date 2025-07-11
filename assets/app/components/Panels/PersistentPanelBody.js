import { PanelBody } from '@wordpress/components';
import usePanelStates from '../../hooks/usePanelStates';

const PersistentPanelBody = ( {
	panelId,
	title,
	children,
	initialOpen = true,
	...rest
} ) => {
	const { getPanelState, setPanelState } = usePanelStates();

	const handleToggle = open => setPanelState( panelId, open );

	return (
		<PanelBody
			title={ title }
			initialOpen={ getPanelState( panelId, initialOpen ) }
			onToggle={ handleToggle }
			{ ...rest }
		>
			{ children }
		</PanelBody>
	);
};

export default PersistentPanelBody;