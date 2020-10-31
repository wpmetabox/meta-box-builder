import React from 'react';
import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const Textarea = ( { name, defaultValue, ...rest } ) => {
  const { register } = useFormContext();

  return <DivRow { ...rest } htmlFor={ name }>
    <textarea ref={ register } defaultValue={ defaultValue } id={ name } name={ name } rows="2"></textarea>
  </DivRow>;
};
export default Textarea;