import { memo } from "@wordpress/element";
import { doNothing } from "../../../functions";

const Text = ( { field, type = "text" } ) => {
	const prepend = field.prepend && <span className="rwmb-input-group-text">{ field.prepend }</span>;
	const append = field.append && <span className="rwmb-input-group-text">{ field.append }</span>;
	const input = <input type={ type } placeholder={ field.placeholder } size={ field.size } value={ field.std || '' } onChange={ doNothing } />;

	return prepend || append
		? <div className="rwmb-input-group">{ prepend }{ input }{ append }</div>
		: input;
};

// Memo to avoid re-rendering because there might be a lot of fields with this field type.
export default memo( Text, ( prev, next ) => (
	prev.type === next.type
	&& prev.field.prepend === next.field.prepend
	&& prev.field.append === next.field.append
	&& prev.field.placeholder === next.field.placeholder
	&& prev.field.size === next.field.size
	&& prev.field.std === next.field.std
) );