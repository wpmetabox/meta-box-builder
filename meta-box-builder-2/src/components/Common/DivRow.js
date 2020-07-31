import React from 'react';
import Tooltip from './Tooltip';

const DivRow = ({label, children, className = '', htmlFor = '', description = '', tooltip = '', keyValue = '', required = false}) => {
  return (
    <div className={`og-field ${className}`} key={keyValue}>
      <label className="og-label" htmlFor={htmlFor}>
        <span dangerouslySetInnerHTML={{__html: label}} />
        {required && <span className="og-required">*</span>}
        {tooltip && <Tooltip id={htmlFor} content={tooltip} />}
      </label>
      <div className="og-input">
        {children}
        {description && <div className="og-description">{description}</div>}
      </div>
    </div>
  )
}

export default DivRow;