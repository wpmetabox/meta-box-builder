import React from 'react';
import DivRow from './DivRow';
import { useFormContext } from "react-hook-form";

const Select = ({name, options, defaultValue, type = 'text', ...rest}) => {
  const { register } = useFormContext();
  return <DivRow htmlFor={name} {...rest}>
      <select ref={register} id={name} name={name} multiple>
      {
        options.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)
      }
    </select>
  </DivRow>
}

export default Select;