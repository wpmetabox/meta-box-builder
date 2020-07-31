import React from 'react';
import {xIcon} from '../../../constants/icons';

const AdvancedAdditionalItem = ({register, name, type, index, data, removeItem}) => {
    return (
        <div className="og-attribute">
            <input type="text" placeholder="Enter key" ref={register} name={`${name}-${type}-${index}-key`} defaultValue={data.key} />
            <input type="text" placeholder="Enter value" ref={register} name={`${name}-${type}-${index}-value`} defaultValue={data.label} />
            <button type="button" onClick={() => removeItem(index)}>{xIcon}</button>
        </div>
    )
}

export default AdvancedAdditionalItem;