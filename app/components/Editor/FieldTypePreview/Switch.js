import { doNothing } from "../../../functions";

const Switch = ( { field } ) => (
	<label className={ `rwmb-switch-label rwmb-switch-label--${ field.style || 'rounded' }` }>
		<input className="rwmb-switch" type="checkbox" checked={ !!field.std } onChange={ doNothing } />
		<div className="rwmb-switch-status">
			<span className="rwmb-switch-slider"></span>
			<span className="rwmb-switch-on">{ field.on_label }</span>
			<span className="rwmb-switch-off">{ field.off_label }</span>
		</div>
	</label>
);

export default Switch;