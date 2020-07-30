import React from 'react';
import DivRow from './DivRow';

const Input = ({name, defaultValue, register, type = 'text', ...rest}) => (
  <DivRow htmlFor={name} {...rest}>
    <input type={type} id={name} name={name} ref={register} defaultValue={defaultValue} />
  </DivRow>
)

export default Input;