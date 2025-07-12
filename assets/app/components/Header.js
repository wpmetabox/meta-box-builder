import { Button, Flex } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { cog, listView, plus } from "@wordpress/icons";
import useFloatingStructurePanel from '../hooks/useFloatingStructurePanel';
import useNavPanel from '../hooks/useNavPanel';

const Header = () => {
	const { navPanel, setNavPanel } = useNavPanel();
	const { floating, visible, toggleVisible } = useFloatingStructurePanel();

	const updateNavPanel = key => () => setNavPanel( key === navPanel ? '' : key );

	const handleStructureClick = () => {
		if ( floating ) {
			toggleVisible();
		} else {
			setNavPanel( navPanel === 'structure' ? '' : 'structure' );
		}
	};

	// Show structure panel if it's in floating mode and visible, or if it's in normal mode and navPanel is 'structure'
	const isStructurePressed = floating ? visible : navPanel === 'structure';

	return (
		<Flex className="mb-header">
			<Flex expanded={ false }>
				<Button
					variant="primary"
					icon={ plus }
					size="compact"
					className="mb-header__add"
					label={ __( 'Add a new field', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ updateNavPanel( 'add' ) }
					isPressed={ navPanel === 'add' }
				/>
				<Button
					icon={ listView }
					size="compact"
					label={ __( 'Show field group structure', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ handleStructureClick }
					isPressed={ isStructurePressed }
				/>
				<Button
					icon={ cog }
					size="compact"
					label={ __( 'Edit field group settings', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ updateNavPanel( 'field-group-settings' ) }
					isPressed={ navPanel === 'field-group-settings' }
				/>
			</Flex>
			<input
				type="text"
				name="post_title"
				id="post_title"
				defaultValue={ MbbApp.title }
				placeholder={ __( 'Please enter the field group title here...', 'meta-box-builder' ) }
			/>
			<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
				<input
					type="submit"
					className="components-button is-primary"
					value={ __( 'Save Changes', 'meta-box-builder' ) }
				/>
			</Flex>
		</Flex>
	);
};

export default Header;