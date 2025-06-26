import { Flex, Tooltip } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from '../../../../../app/components/logo.svg';

const Header = () => {
	return (
		<Flex className="mb-header">
			<Flex expanded={ false }>
				<Tooltip delay={ 0 } text={ __( 'Back to all settings pages', 'meta-box-builder' ) } placement='bottom'>
					<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
				</Tooltip>
			</Flex>
			<input
				type="text"
				name="post_title"
				id="post_title"
				defaultValue={ MbbApp.title }
				placeholder={ __( 'Settings page title title', 'meta-box-builder' ) }
			/>
			<Flex gap={ 3 } expanded={ false } className="mb-header__actions">
				<input
					type="submit"
					data-status="draft"
					className="components-button is-compact is-tertiary"
					value={ MbbApp.status === 'publish' ? MbbApp.texts.switchToDraft : MbbApp.texts.saveDraft }
				/>
				<input
					type="submit"
					data-status="publish"
					className="components-button is-primary"
					value={ MbbApp.status === 'publish' ? MbbApp.texts.update : MbbApp.texts.publish }
				/>
			</Flex>
		</Flex>
	);
};

export default Header;