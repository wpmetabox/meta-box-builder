import React, {memo} from 'react';
import {xIcon} from '../../../constants/icons';
import { useFormContext } from "react-hook-form";

const AdvancedAdditionalItem = ({ name, type, index, data, removeItem }) => {
    const { register } = useFormContext();
    
    return (
        <div className="og-attribute">
            <input type="text" placeholder="Enter key" ref={register} name={`${name}-${type}-${index}-key`} defaultValue={data.key} />
            <input type="text" placeholder="Enter value" ref={register} name={`${name}-${type}-${index}-value`} defaultValue={data.label} />
            <button type="button" onClick={() => removeItem(data.unixId)}>{xIcon}</button>
        </div>
    )
}

export default AdvancedAdditionalItem;