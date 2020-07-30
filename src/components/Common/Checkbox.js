import React from 'react';
import DivRow from './DivRow';

const Checkbox = ({name, defaultValue, register, ...rest}) => (
  <DivRow htmlFor={name} {...rest}>
    <input type="checkbox" id={name} name={name} ref={register} defaultChecked={defaultValue} />
  </DivRow>
)
export default Checkbox;