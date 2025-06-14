import { memo } from "@wordpress/element";
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

export default memo( Switch, ( prev, next ) => (
	prev.field.style === next.field.style
	&& prev.field.on_label === next.field.on_label
	&& prev.field.off_label === next.field.off_label
	&& prev.field.std === next.field.std
) );