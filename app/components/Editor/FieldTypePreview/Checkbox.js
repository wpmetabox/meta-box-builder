import { doNothing } from "../../../functions";

const Checkbox = ( { field } ) => {
	let output = <input type="checkbox" checked={ !!field.std } onChange={ doNothing } />;
	if ( field.desc ) {
		output = <label className="description">{ output } { field.desc }</label>;
	}

	return output;
};

export default Checkbox;