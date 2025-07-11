import { Icon } from "@wordpress/components";
import { moreHorizontal, moreVertical } from "@wordpress/icons";

export default ( { onMouseDown, type = 'horizontal' } ) => (
	<div className={ `mb-resizer mb-resizer--${ type }` } onMouseDown={ onMouseDown }>
		<Icon icon={ type === 'horizontal' ? moreVertical : moreHorizontal } />
	</div>
);