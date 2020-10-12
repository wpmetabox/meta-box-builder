import React from 'react';
import DivRow from '../DivRow';

const PostType = ({ name, register, ...rest }) => {

  return <DivRow {...rest} htmlFor={name} label="Post type">
    <select ref={register} id={name} name={name} multiple>
      {
        MbbApp.postTypes.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)
      }
    </select>
  </DivRow>
}

export default PostType;