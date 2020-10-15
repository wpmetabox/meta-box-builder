import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const Checkbox = ({name, label, type, className, defaultValue, ...rest}) => {
  const [value, setValue] = useState(defaultValue)
  const handleOptionalClone = () => {
    const displayValue = value ? 'none' : 'flex'
    document.querySelectorAll('.clone_optional').forEach(item=>item.style.display = displayValue)
    setValue(prev => !prev)
  }

  const { register } = useFormContext();
  return <DivRow label={label} className={className} htmlFor={name} {...rest}>
    <input type="checkbox" id={name} name={name} onClick={() => label === 'Cloneable' && handleOptionalClone()} ref={register} defaultChecked={defaultValue} />
  </DivRow>
}
export default Checkbox;