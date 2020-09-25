import React from 'react';
import DivRow from '../DivRow';

const FieldType = ({ name, register, ...rest }) => <DivRow {...rest} htmlFor={name} label="Field type">
    <select ref={register} id={name} name={name} defaultValue="select_advanced">
      <option value="select">Select</option>
      <option value="select_advanced">Select advanced</option>
      <option value="select_tree">Select tree</option>
      <option value="checkbox_list">Checkbox list</option>
      <option value="checkbox_tree">Checkbox tree</option>
      <option value="radio_list">Radio list</option>
    </select>
  </DivRow>

export default FieldType;