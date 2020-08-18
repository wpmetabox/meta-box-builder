import React, { useEffect, useContext, useState } from 'react';
import DivRow from '../DivRow';
import { Context, actions } from '../../../context/FieldTypes/FieldTypesContext';

const Taxonomy = ({ name, register, ...rest }) => {
  const { state } = useContext(Context);
  const [categories, setCategories] = useState([]);

  // get post types
  useEffect(() => {
    if (!state.categories) {
      actions.getFieldTypes('categories')
    }
  }, [])

  // update list post types 
  useEffect(() => {
    if (state.categories) {
      setCategories(state.categories)
    }
  }, [state])

  return <DivRow {...rest} htmlFor={name} label="Taxonomy">
    <select ref={register} id={name} name={name} defaultValue="category">
      {
        categories.map(item => <option value={item.term_id} key={item.term_id}>{item.name}</option>)
      }
    </select>
  </DivRow>
}
export default Taxonomy;