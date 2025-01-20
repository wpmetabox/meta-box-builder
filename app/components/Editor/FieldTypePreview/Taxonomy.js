import { __ } from "@wordpress/i18n";
import ObjectField from "./ObjectField";

const Taxonomy = ( { field } ) => (
	<ObjectField
		field={ field }
		defaultPlaceholder={ __( 'Select a term', 'meta-box-builder' ) }
		defaultItemTitle={ __( 'Term', 'meta-box-builder' ) }
	/>
);

export default Taxonomy;