import React, { useEffect, useContext, useState } from 'react';
import DivRow from '../DivRow';
import { Context, actions } from '../../../context/FieldTypes/FieldTypesContext';

const PostType = ({ name, register, ...rest }) => {
  const { state } = useContext(Context);
  const [postTypes, setPostTypes] = useState([]);

  // get post types
  useEffect(() => {
    if (!state.posts) {
      actions.getFieldTypes('posts')
    }
  }, [])

  // update list post types 
  useEffect(() => {
    if (state.posts) {
      setPostTypes(state.posts)
    }
  }, [state])

  return <DivRow {...rest} htmlFor={name} label="Post type">
    <select ref={register} id={name} name={name} multiple>
      {
        postTypes.map(item => <option key={item.id} value={item.id}>{item.text}</option>)
      }
    </select>
  </DivRow>
}

export default PostType;