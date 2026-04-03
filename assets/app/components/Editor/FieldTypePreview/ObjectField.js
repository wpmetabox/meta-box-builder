import { lazy, Suspense, useEffect, useRef } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ucwords } from "../../../functions";

// Cache lazy components at module level to preserve identity across re-renders.
const lazyObjectFieldCache = new Map();
const getLazyObjectField = type => {
	if ( !lazyObjectFieldCache.has( type ) ) {
		lazyObjectFieldCache.set( type, lazy( () => import( `./${ ucwords( type, '_', '' ) }` ) ) );
	}
	return lazyObjectFieldCache.get( type );
};

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

	const FieldType = getLazyObjectField( type );

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