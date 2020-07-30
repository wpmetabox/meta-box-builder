import React from 'react';
import Input from '../Input';
import {getLabel} from '../../../utility/functions';

const TextInput = ({label, type, ...rest}) => <Input {...rest} label={getLabel(label, type)} />
export default TextInput;