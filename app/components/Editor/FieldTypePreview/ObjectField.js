import { lazy, Suspense, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ucwords } from "../../../functions";

const ObjectField = ( { field, defaultPlaceholder, defaultItemTitle } ) => {
	const ref = useRef();
	const type = field.field_type || 'select_advanced';

	// Don't change field directly as it can fill the field settings inputs.
	const normalizedField = {
		...field,
		class: `${ field.class || '' } rwmb-${ type }`,
		placeholder: field.placeholder || defaultPlaceholder,
		options: `${ defaultItemTitle } 1 \n${ defaultItemTitle } 2 \n${ defaultItemTitle } 3`,
	};

	const FieldType = lazy( () => import( `./${ ucwords( type, '_', '' ) }` ) );

	useEffect( () => {
		if ( ref.current ) {
			ref.current.querySelector( '.select2-container' )?.remove();
		}
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

export default ObjectField;