import { doNothing } from "../../../functions";

const Text = ( { field, type = "text" } ) => {
	const prepend = field.prepend && <span className="rwmb-input-group-text">{ field.prepend }</span>;
	const append = field.append && <span className="rwmb-input-group-text">{ field.append }</span>;
	const input = <input type={ type } placeholder={ field.placeholder } size={ field.size } value={ field.std || '' } onChange={ doNothing } />;

	return prepend || append
		? <div className="rwmb-input-group">{ prepend }{ input }{ append }</div>
		: input;
};

export default Text;