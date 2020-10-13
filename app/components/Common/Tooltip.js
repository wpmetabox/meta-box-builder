const { Tooltip: T, Dashicon } = wp.components;

const Tooltip = ( { content } ) => (
  <T text={ content }>
    <span className="og-tooltip-icon"><Dashicon icon="editor-help" /></span>
  </T>
);
export default Tooltip;