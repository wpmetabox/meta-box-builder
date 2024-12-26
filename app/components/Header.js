import { Button, Flex } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { drawerRight, listView, plus } from "@wordpress/icons";
import useSidebarPanel from '../hooks/useSidebarPanel';
// import { ReactComponent as Logo } from './logo.svg';

const Header = () => {
	const { sidebarPanel, setSidebarPanel } = useSidebarPanel();
	const updateSidebarPanel = key => () => setSidebarPanel( key === sidebarPanel ? '' : key );

	return (
		<Flex className="mb-header">
			<Flex expanded={ false }>
				{/* <Tooltip delay={ 0 } text={ __( 'Back to all field groups', 'meta-box-builder' ) } placement='bottom'>
					<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
				</Tooltip> */}
				{/* <div className="mb-header__logo" href={ MbbApp.url }><Logo /></div> */ }

				<Button onClick={ updateSidebarPanel( 'add_field' ) } className="is-compact" icon={ plus } size="compact" variant="primary" label={ __( 'Add a new field', 'meta-box-builder' ) } showTooltip={ true } isPressed={ sidebarPanel === 'add_field' } />
				<Button onClick={ updateSidebarPanel( 'add_field' ) } className="is-compact" icon={ listView } size="compact" label={ __( 'Show field group structure', 'meta-box-builder' ) } showTooltip={ true } isPressed={ sidebarPanel === 'add_field' } />
			</Flex>
			<input
				type="text"
				name="post_title"
				id="post_title"
				defaultValue={ MbbApp.title }
				placeholder={ __( 'Field group title', 'meta-box-builder' ) }
			/>
			<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
				<input type="submit" data-status="draft" className="components-button is-compact is-tertiary" value={ MbbApp.status == 'publish' ? __( 'Switch to draft', 'meta-box-builder' ) : __( 'Save draft', 'meta-box-builder' ) } />
				<Button onClick={ updateSidebarPanel( 'field_group_settings' ) } className="is-compact" icon={ drawerRight } size="compact" label={ __( 'Edit field group settings', 'meta-box-builder' ) } showTooltip={ true } isPressed={ sidebarPanel === 'field_group_settings' } />
				<input type="submit" data-status="publish" className="components-button is-primary" value={ MbbApp.status == 'publish' ? __( 'Update', 'meta-box-builder' ) : __( 'Publish', 'meta-box-builder' ) } />
			</Flex>
		</Flex>
	);
};

export default Header;