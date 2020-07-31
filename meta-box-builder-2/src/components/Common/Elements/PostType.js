import React from 'react';
import DivRow from '../DivRow';

const PostType = ({name, register, ...rest}) => (
  <DivRow {...rest} htmlFor={name} label="Post type">
    <select ref={register} id={name} name={name} multiple>
      <option value="post">Post</option>
      <option value="page">Page</option>
    </select>
  </DivRow>
)
export default PostType;