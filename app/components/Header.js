import { Button, Flex, Tooltip } from '@wordpress/components';
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { cog, plusCircle } from "@wordpress/icons";
import AutosizeInput from 'react-input-autosize';
import useSidebarPanel from '../hooks/useSidebarPanel';
import { ReactComponent as Logo } from './logo.svg';

const Header = () => {
	const { sidebarPanel, setSidebarPanel } = useSidebarPanel();
	const [ title, setTitle ] = useState( MbbApp.title );
	const [ slug, setSlug ] = useState( MbbApp.slug );

	const updateTitle = e => setTitle( e.target.value );
	const updateSlug = e => setSlug( e.target.value );

	return (
		<Flex className="mb-header">
			<Flex expanded={ false }>
				<Tooltip delay={ 0 } text={ __( 'Back to all field groups', 'meta-box-builder' ) } placement='bottom'>
					<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
				</Tooltip>

				<Flex gap={ 3 } align="baseline">
					<div className="mb-header__title" title={ __( 'Field group title', 'meta-box-builder' ) }>
						<AutosizeInput
							name="post_title"
							id="post_title"
							inputStyle={ { fontSize: 20 } }
							value={ title }
							onChange={ updateTitle }
							placeholder={ __( 'Field group title', 'meta-box-builder' ) }
						/>
					</div>
					<Flex gap={ 0 } align="stretch" expanded={ false } className="mb-header__badge" title={ __( 'Field group ID (slug)', 'meta-box-builder' ) }>
						<Flex align="center" expanded={ false } className="mb-header__badge__name" as="label" htmlFor="post_name">
							{ __( 'ID', 'meta-box-builder' ) }
						</Flex>
						<Flex align="center" expanded={ false } className="mb-header__badge__content">
							<AutosizeInput
								name="post_name"
								id="post_name"
								inputStyle={ { fontSize: 13 } }
								value={ slug }
								onChange={ updateSlug }
								placeholder={ __( 'Field group ID', 'meta-box-builder' ) }
							/>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
				<input type="submit" data-status="draft" className="components-button is-compact is-tertiary" value={ MbbApp.status == 'publish' ? __( 'Switch to draft', 'meta-box-builder' ) : __( 'Save draft', 'meta-box-builder' ) } />
				<Button onClick={ () => setSidebarPanel( 'add_field' ) } className="is-compact" icon={ plusCircle } size="compact" label={ __( 'Add a new field', 'meta-box-builder' ) } showTooltip={ true } isPressed={ sidebarPanel === 'add_field' } />
				<Button onClick={ () => setSidebarPanel( 'field_group_settings' ) } className="is-compact" icon={ cog } size="compact" label={ __( 'Edit field group settings', 'meta-box-builder' ) } showTooltip={ true } isPressed={ sidebarPanel === 'field_group_settings' } />
				<input type="submit" data-status="publish" className="components-button is-primary" value={ MbbApp.status == 'publish' ? __( 'Update', 'meta-box-builder' ) : __( 'Publish', 'meta-box-builder' ) } />
			</Flex>
		</Flex>
	);
};

export default Header;