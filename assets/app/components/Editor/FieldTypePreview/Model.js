import { __ } from "@wordpress/i18n";
import ObjectField from "./ObjectField";

const Model = ( { field } ) => (
	<ObjectField
		field={ field }
		defaultPlaceholder={ __( 'Select an item', 'meta-box-builder' ) }
		defaultItemTitle={ __( 'Item', 'meta-box-builder' ) }
	/>
);

export default Model;
