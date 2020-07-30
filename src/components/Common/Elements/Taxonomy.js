import React from 'react';
import DivRow from '../DivRow';

const Taxonomy = ({name, register, ...rest}) => (
  <DivRow {...rest} htmlFor={name} label="Taxonomy">
    <select ref={register} id={name} name={name} defaultValue="category">
      <option value="category">Category</option>
      <option value="post_tag">Tag</option>
    </select>
  </DivRow>
)
export default Taxonomy;