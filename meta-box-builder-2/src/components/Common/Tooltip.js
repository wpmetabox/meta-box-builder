import React from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({id, content}) => (
  <>
    <svg viewBox="0 0 24 24" className="og-tooltip-icon" data-for={`tooltip-${id}`} data-tip={content}><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"/></svg>
    <ReactTooltip id={`tooltip-${id}`} effect="solid" />
  </>
)
export default Tooltip;