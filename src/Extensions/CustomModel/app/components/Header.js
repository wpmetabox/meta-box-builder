import { Flex, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ReactComponent as Logo } from '../../../../../assets/app/components/logo.svg';
import { isMac } from '../../../../../assets/app/functions';

const shortcut = isMac() ? '⌘S' : 'Ctrl+S';

const Header = () => (
	<Flex className="mb-header">
		<Tooltip delay={ 0 } text={ __( 'Back to all custom models', 'meta-box-builder' ) } placement="bottom">
			<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
		</Tooltip>
		<h1>{ MbbApp.action === 'add' ? __( 'Add Custom Model', 'meta-box-builder' ) : __( 'Edit Custom Model', 'meta-box-builder' ) }</h1>
		<input
			type="submit"
			className="components-button is-primary"
			value={ `${ __( 'Save Changes', 'meta-box-builder' ) } (${ shortcut })` }
		/>
	</Flex>
);

export default Header;
