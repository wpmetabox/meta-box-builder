import { Button, Flex, Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { arrowLeft, close, external } from '@wordpress/icons';
import useDraggable from '../../hooks/useDraggable';
import useFloatingStructurePanel from '../../hooks/useFloatingStructurePanel';
import useNavPanel from '../../hooks/useNavPanel';
import Fields from './Structure/Fields';

const NormalHeader = () => {
	const { setFloating } = useFloatingStructurePanel();
	const { setNavPanel } = useNavPanel();

	const enableFloating = () => {
		setFloating( true );
		setNavPanel( '' );
	};

	return (
		<Flex align="center" justify="space-between" gap={ 1 }>
			<span className="mb-panel__header">{ __( 'Structure', 'meta-box-builder' ) }</span>
			<Button
				icon={ external }
				iconSize={ 16 }
				label={ __( 'Show as a floating panel', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ enableFloating }
			/>
		</Flex>
	);
};

const FloatingHeader = () => {
	const { setFloating, setVisible } = useFloatingStructurePanel();
	const { setNavPanel } = useNavPanel();

	const disableFloating = () => {
		setFloating( false );
		setNavPanel( 'structure' );
	};

	return (
		<Flex align="center" justify="space-between" gap={ 1 }>
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
				icon={ close }
				iconSize={ 12 }
				label={ __( 'Close panel', 'meta-box-builder' ) }
				showTooltip={ true }
				onClick={ () => setVisible( false ) }
				size="small"
			/>
		</Flex>
	);
};

const NormalStructurePanel = () => {
	const { navPanel } = useNavPanel();
	if ( navPanel !== 'structure' ) {
		return;
	}

	return (
		<Panel header={ <NormalHeader /> } className="mb-panel mb-panel--structure">
			<div className="mb-panel__inner">
				<Fields />
			</div>
		</Panel>
	);
};

const FloatingStructurePanel = () => {
	const { visible, position, offsetX, offsetY } = useFloatingStructurePanel();
	const panelRef = useDraggable();

	if ( !visible ) {
		return;
	}

	// Apply position for floating panel
	const floatingStyle = {
		top: `${ position.top }px`,
		right: `${ position.right }px`,
		transform: `translate(${ offsetX }px, ${ offsetY }px)`,
	};

	return (
		<div className="mb-panel--floating" style={ floatingStyle }>
			<Panel ref={ panelRef } header={ <FloatingHeader /> } className="mb-panel mb-panel--structure">
				<div className="mb-panel__inner">
					<Fields />
				</div>
			</Panel>
		</div>
	);
};

const StructurePanel = () => {
	const { floating } = useFloatingStructurePanel();
	return floating ? <FloatingStructurePanel /> : <NormalStructurePanel />;
};

export default StructurePanel;