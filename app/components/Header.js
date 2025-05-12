import { Button, Flex } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { cog, listView, plus } from "@wordpress/icons";
import useNavPanel from '../hooks/useNavPanel';
// import { ReactComponent as Logo } from './logo.svg';

const Header = () => {
	const { navPanel, setNavPanel } = useNavPanel();
	const updateNavPanel = key => () => setNavPanel( key === navPanel ? '' : key );

	return (
		<Flex className="mb-header">
			<Flex expanded={ false }>
				{/* <Tooltip delay={ 0 } text={ __( 'Back to all field groups', 'meta-box-builder' ) } placement='bottom'>
					<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
				</Tooltip> */}
				{/* <div className="mb-header__logo" href={ MbbApp.url }><Logo /></div> */ }

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
					onClick={ updateNavPanel( 'structure' ) }
					isPressed={ navPanel === 'structure' }
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
				placeholder={ __( 'Field group title', 'meta-box-builder' ) }
			/>
			<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
				<input
					type="submit"
					data-status="draft"
					className="components-button is-compact is-tertiary"
					value={ MbbApp.status == 'publish' ? __( 'Switch to draft', 'meta-box-builder' ) : __( 'Save draft', 'meta-box-builder' ) }
				/>
				<input
					type="submit"
					data-status="publish"
					className="components-button is-primary"
					value={ MbbApp.status == 'publish' ? __( 'Update', 'meta-box-builder' ) : __( 'Publish', 'meta-box-builder' ) }
				/>
			</Flex>
		</Flex>
	);
};

export default Header;