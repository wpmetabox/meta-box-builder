import { __ } from "@wordpress/i18n";
import ObjectField from "./ObjectField";

const Post = ( { field } ) => (
	<ObjectField
		field={ field }
		defaultPlaceholder={ __( 'Select a post', 'meta-box-builder' ) }
		defaultItemTitle={ __( 'Post title', 'meta-box-builder' ) }
	/>
);

export default Post;