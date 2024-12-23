import { doNothing } from "../../../functions";

const Range = ( { field } ) => (
	<div className="rwmb-range-inner">
		<input type="range" value={ field.std || '' } min={ field.min || 0 } max={ field.max || 10 } onChange={ doNothing } />
		<span className="rwmb-range-output">{ field.std }</span>
	</div>
);

export default Range;