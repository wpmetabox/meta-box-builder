import { lazy, Suspense } from "@wordpress/element";
import { ucwords } from "../../../functions";

const Post = ( { field } ) => {
	const type = field.field_type || 'select_advanced';
	field.class = `${ field.class || '' } rwmb-${ type }`;

	const FieldType = lazy( () => import( `../${ ucwords( field.field_type, '_', '' ) }` ) );

	return (
		<Suspense fallback={ null } >
			<FieldType field={ field } />
		</Suspense>
	);
};

export default Post;;