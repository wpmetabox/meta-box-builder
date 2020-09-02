import React from 'react';
import DivRow from './DivRow';
import { useFormContext } from "react-hook-form";

const Checkbox = ({name, defaultValue, ...rest}) => {
  const { register } = useFormContext();
  return <DivRow htmlFor={name} {...rest}>
    <input type="checkbox" id={name} name={name} ref={register} defaultChecked={defaultValue} />
  </DivRow>
}
export default Checkbox;