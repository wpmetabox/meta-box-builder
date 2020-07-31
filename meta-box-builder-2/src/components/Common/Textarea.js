import React from 'react';
import DivRow from './DivRow';

const Textarea = ({ name, register, defaultValue, ...rest }) => (
  <DivRow {...rest} htmlFor={name}>
    <textarea ref={register} defaultValue={defaultValue} id={name} name={name} rows="2"></textarea>
  </DivRow>
)
export default Textarea;