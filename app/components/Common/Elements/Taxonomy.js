import React from 'react';
import DivRow from '../DivRow';

const Taxonomy = ({ name, register, ...rest }) => {
  return <DivRow {...rest} htmlFor={name} label="Taxonomy">
    <select ref={register} id={name} name={name} defaultValue="category">
      {
        MbbApp.taxonomies.map(item => <option value={item.slug} key={item.slug}>{item.name}</option>)
      }
    </select>
  </DivRow>
}
export default Taxonomy;