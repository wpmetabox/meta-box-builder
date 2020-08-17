import React from 'react';
import DivRow from './DivRow';
import { useFormContext } from "react-hook-form";

const Textarea = ({ name, defaultValue, ...rest }) => {
  const { register, control } = useFormContext();
  const methods = useFormContext();
  console.log('gg',methods)

  return <DivRow {...rest} htmlFor={name}>
    <textarea ref={register} control={control} onChange={e => methods.setValue(name, e.target.value) } id={name} name={name} rows="2"></textarea>
  </DivRow>
}
export default Textarea;