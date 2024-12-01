import { Dashicon, Tooltip as T } from "@wordpress/components";

const Tooltip = ( { content } ) => (
  <T text={ content } delay={ 0 } placement="bottom">
    <span className="og-tooltip-icon"><Dashicon icon="editor-help" /></span>
  </T>
);
export default Tooltip;