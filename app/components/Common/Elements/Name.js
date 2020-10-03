import React from 'react';
import { useFormContext } from 'react-hook-form';
import DivRow from '../DivRow';

const Name = ( { name, defaultValue, ...rest } ) => {
  const changeFieldLabel = e => document.getElementById( `og-item__title__${ rest.data.id }` ).textContent = e.target.value;
  const { register } = useFormContext();

  return (
    <DivRow htmlFor={ name } { ...rest } label="Label" tooltip="Optional field label. If empty, the field input is 100% width.">
      <input type="text" id={ name } name={ name } ref={ register } defaultValue={ defaultValue } onChange={ changeFieldLabel } />
    </DivRow>
  );
};
export default Name;