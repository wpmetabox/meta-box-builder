import React from 'react';
import Textarea from '../Textarea';

const AddButton = props => <Textarea {...props} className='clone_optional' label="Add more text" tooltip='Leave empty for unlimited clones' />
export default AddButton;