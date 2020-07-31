import React from 'react';
import Textarea from '../Textarea';

const Options = props => <Textarea {...props} label="Choices" tooltip="Enter each choice on a line. For more control, you may specify both a value and label like 'red: Red' (without quotes)" />
export default Options;