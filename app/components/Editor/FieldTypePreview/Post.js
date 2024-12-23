import { lazy, Suspense, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ucwords } from "../../../functions";

const Post = ( { field } ) => {
	const ref = useRef();
	const type = field.field_type || 'select_advanced';

	// Don't change field directly as it can fill the field settings inputs.
	const normalizedField = {
		...field,
		class: `${ field.class || '' } rwmb-${ type }`,
		placeholder: field.placeholder || __( 'Select a post', 'meta-box-builder' ),
		options: `${ __( 'Post title 1', 'meta-box-builder' ) }\n${ __( 'Post title 2', 'meta-box-builder' ) }\n${ __( 'Post title 3', 'meta-box-builder' ) }`,
	};

	const FieldType = lazy( () => import( `./${ ucwords( type, '_', '' ) }` ) );

	useEffect( () => {
		ref.current.querySelector( '.select2-container' )?.remove();
	}, [ type ] );

	return (
		<Suspense fallback={ null }>
			<div ref={ ref }>
				<FieldType field={ normalizedField } />
				{
					field.add_new && <a href="#" className="rwmb-modal-add-button">{ __( 'Add new', 'meta-box-builder' ) }</a>
				}
			</div>
		</Suspense>
	);
};

export default Post;