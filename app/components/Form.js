import Box from './Box';
import Fields from './Tabs/Fields';
import { __ } from '@wordpress/i18n';

const Form = ( { show } ) => (
	<Box title={ __( 'Fields', 'meta-box-builder' ) } show={ show }>
		<Fields fields={ MbbApp.fields } />
	</Box>
);

export default Form;