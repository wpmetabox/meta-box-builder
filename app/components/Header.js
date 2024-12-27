import { Button, Flex } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { drawerRight, listView, plus } from "@wordpress/icons";
import useNav from '../hooks/useNav';
import useSidebarPanel from '../hooks/useSidebarPanel';
// import { ReactComponent as Logo } from './logo.svg';

const Header = () => {
	const { sidebarPanel, setSidebarPanel } = useSidebarPanel();
	const { navPanel, setNavPanel } = useNav();

	const updateSidebarPanel = key => () => setSidebarPanel( key === sidebarPanel ? '' : key );
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
					label={ __( 'Add a new field', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ updateNavPanel( 'add_field' ) }
					isPressed={ navPanel === 'add_field' }
				/>
				<Button
					icon={ listView }
					size="compact"
					label={ __( 'Show field group structure', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ updateNavPanel( 'structure' ) }
					isPressed={ navPanel === 'structure' }
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
				<Button
					icon={ drawerRight }
					size="compact"
					label={ __( 'Edit field group settings', 'meta-box-builder' ) }
					showTooltip={ true }
					onClick={ updateSidebarPanel( 'field_group_settings' ) }
					isPressed={ sidebarPanel === 'field_group_settings' }
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