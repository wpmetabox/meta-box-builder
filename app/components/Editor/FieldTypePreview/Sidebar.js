import { __ } from "@wordpress/i18n";
import ObjectField from "./ObjectField";

const Sidebar = ( { field } ) => (
	<ObjectField
		field={ field }
		defaultPlaceholder={ __( 'Select a sidebar', 'meta-box-builder' ) }
		defaultItemTitle={ __( 'Sidebar', 'meta-box-builder' ) }
	/>
);

export default Sidebar;