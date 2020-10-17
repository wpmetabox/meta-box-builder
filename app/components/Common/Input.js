import React from 'react';
import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const Input = ( { name, test, defaultValue, inputType = 'text', ...rest } ) => {
  const { register } = useFormContext();

  return <DivRow htmlFor={ name } { ...rest }>
    <input type={ inputType } id={ name } name={ name } ref={ register } defaultValue={ defaultValue } />
  </DivRow>;
};

export default Input;