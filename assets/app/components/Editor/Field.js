import { memo } from "@wordpress/element";
import { isEqual } from 'lodash';
import FieldPreview from "./FieldPreview";
import FieldSettings from './FieldSettings';

const Field = ( { field, parent = '', ...fieldActions } ) => field.type && (
	<>
		<FieldPreview field={ field } parent={ parent } { ...fieldActions } />
		<FieldSettings field={ field } parent={ parent } { ...fieldActions } />
	</>
);

export default memo( Field, ( prev, next ) => {
	delete prev.field.fields;
	delete next.field.fields;

	return prev.parent === next.parent && isEqual( prev.field, next.field );
} );
