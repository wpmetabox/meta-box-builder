import { Dashicon, Tooltip } from "@wordpress/components";

export default ( { content } ) => (
	<Tooltip text={ content } delay={ 0 } placement="bottom">
		<span className="og-tooltip-icon"><Dashicon icon="editor-help" /></span>
	</Tooltip>
);