import { Flex, Tooltip } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { ReactComponent as Logo } from '../../../../../assets/app/components/logo.svg';

const Header = () => (
	<Flex className="mb-header">
		<Flex expanded={ false }>
			<Tooltip delay={ 0 } text={ __( 'Back to all relationships', 'meta-box-builder' ) } placement='bottom'>
				<a className="mb-header__logo" href={ MbbApp.url }><Logo /></a>
			</Tooltip>
		</Flex>
		<input
			type="text"
			name="post_title"
			id="post_title"
			defaultValue={ MbbApp.title }
			placeholder={ __( 'Please enter the relationship title...', 'meta-box-builder' ) }
		/>
		<input
			type="submit"
			className="components-button is-primary"
			value={ __( 'Save Changes', 'meta-box-builder' ) }
		/>
	</Flex>
);

export default Header;