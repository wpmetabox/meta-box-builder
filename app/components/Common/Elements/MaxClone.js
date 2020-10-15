import React from 'react';
import Textarea from '../Textarea';

const MaxClone = props => <Textarea {...props} className='clone_optional' label="Maximum number of clones" tooltip='Leave empty for unlimited clones' />
export default MaxClone;