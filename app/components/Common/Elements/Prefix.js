import React from 'react';
import Input from '../Input';

const Prefix = props => <Input { ...props } label="Prefix" tooltip="Text displayed before the field value" />;
export default Prefix;