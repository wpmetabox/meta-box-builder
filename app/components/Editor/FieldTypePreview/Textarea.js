import { memo } from "@wordpress/element";
import { doNothing } from "../../../functions";

const Textarea = ( { field } ) => (
	<textarea
		placeholder={ field.placeholder }
		cols={ field.cols }
		rows={ field.rows }
		value={ field.std || '' }
		onChange={ doNothing }
	/>
);

export default memo( Textarea, ( prev, next ) => (
	prev.field.placeholder === next.field.placeholder
	&& prev.field.cols === next.field.cols
	&& prev.field.rows === next.field.rows
	&& prev.field.std === next.field.std
) );