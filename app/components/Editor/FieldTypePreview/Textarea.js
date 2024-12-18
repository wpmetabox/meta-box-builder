import { doNothing } from "../../../functions";

const Textarea = ( { field } ) => (
	<textarea
		placeholder={ field.placeholder }
		cols={ field.cols }
		rows={ field.rows }
		value={ field.std }
		onChange={ doNothing }
	/>
);

export default Textarea;