import { __ } from "@wordpress/i18n";
import ObjectField from "./ObjectField";

const User = ( { field } ) => (
	<ObjectField
		field={ field }
		defaultPlaceholder={ __( 'Select a user', 'meta-box-builder' ) }
		defaultItemTitle={ __( 'User', 'meta-box-builder' ) }
	/>
);

export default User;