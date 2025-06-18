import { Button, Flex, Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { arrowLeft, close, external } from '@wordpress/icons';
import useDraggable from '../../hooks/useDraggable';
import useFloatingStructurePanel from '../../hooks/useFloatingStructurePanel';
import useNavPanel from '../../hooks/useNavPanel';
import Fields from './Structure/Fields';

const Header = ( { onClose } ) => {
	const { floating, setFloating, setVisible } = useFloatingStructurePanel();
	const { navPanel, setNavPanel } = useNavPanel();

	const enableFloating = () => {
		setFloating( true );
		setNavPanel( '' );
	};

	const disableFloating = () => {
		setFloating( false );
		setNavPanel( 'structure' );
	};

	return (
		<Flex align="center" justify="space-between" gap={ 1 }>
			<span className="mb-panel__header">{ __( 'Structure', 'meta-box-builder' ) }</span>
			{
				floating ? (
					<>
						<Button
							icon={ arrowLeft }
							iconSize={ 16 }
							label={ __( 'Back to normal mode', 'meta-box-builder' ) }
							showTooltip={ true }
							onClick={ disableFloating }
							size="small"
						/>
						<Button
							icon={ close }
							iconSize={ 16 }
							label={ __( 'Close panel', 'meta-box-builder' ) }
							showTooltip={ true }
							onClick={ () => setVisible( false ) }
							size="small"
						/>
					</>
				) : (
					<Button
						icon={ external }
						iconSize={ 16 }
						label={ __( 'Show as a floating panel', 'meta-box-builder' ) }
						showTooltip={ true }
						onClick={ enableFloating }
					/>
				)
			}
		</Flex>
	);
};

const StructurePanel = () => {
	const { floating, visible, position, setVisible } = useFloatingStructurePanel();
	const { navPanel } = useNavPanel();
	const panelRef = useDraggable( floating );

	// Show panel if it's in floating mode and visible, or if it's in normal mode and navPanel is 'structure'
	const show = floating ? visible : navPanel === 'structure';
	if ( !show ) {
		return;
	}

	// Apply position for floating panel
	const floatingStyle = floating ? {
		top: `${ position.top }px`,
		right: `${ position.right }px`,
	} : {};

	return (
		<Panel
			ref={ panelRef }
			header={ <Header /> }
			className={ `mb-panel mb-panel--structure ${ floating ? 'mb-panel--floating' : '' }` }
			style={ floatingStyle }
		>
			<div className="mb-panel__inner">
				<Fields />
			</div>
		</Panel>
	);
};

export default StructurePanel;