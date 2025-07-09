import { Icon } from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";

export default ( { onMouseDown } ) => (
	<div className="mb-resizer" onMouseDown={ onMouseDown }>
		<Icon icon={ moreVertical } />
	</div>
);