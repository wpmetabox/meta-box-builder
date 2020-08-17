import React from 'react';
import DivRow from './DivRow';
import { useFormContext } from "react-hook-form";

const Input = ({name, defaultValue, type = 'text', ...rest}) => {
  const { register } = useFormContext();
  return <DivRow htmlFor={name} {...rest}>
    <input type={type} id={name} name={name} ref={register} defaultValue={defaultValue} />
  </DivRow>
}

export default Input;