import { Button, Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { external } from '@wordpress/icons';
import useFloatingStructurePanel from '../../hooks/useFloatingStructurePanel';
import useNavPanel from '../../hooks/useNavPanel';
import useStructureCollapse from '../../hooks/useStructureCollapse';
import Fields from './Structure/Fields';

const NormalHeader = () => {
	const { setFloating } = useFloatingStructurePanel();
	const { setNavPanel } = useNavPanel();
	const { allExpanded, toggleAll } = useStructureCollapse();

	const enableFloating = () => {
		setFloating( true );
		setNavPanel( '' );
	};

	return (
		<>
			<span className="mb-panel__header">{ __( 'Structure', 'meta-box-builder' ) }</span>
			<Button
				icon={ allExpanded ? `minus` : `plus-alt2` }
				iconSize={ 16 }
				label={ allExpanded ? __( 'Collapse all groups', 'meta-box-builder' ) : __( 'Expand all groups', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ toggleAll }
				size="small"
			/>
			<Button
				icon={ external }
				iconSize={ 16 }
				label={ __( 'Show as a floating panel', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ enableFloating }
			/>
		</>
	);
};

const NormalStructurePanel = () => {
	const { navPanel } = useNavPanel();

	return navPanel === 'structure' && (
		<Panel header={ <NormalHeader /> } className="mb-panel mb-panel--structure">
			<div className="mb-panel__inner">
				<Fields />
			</div>
		</Panel>
	);
};

export default NormalStructurePanel;