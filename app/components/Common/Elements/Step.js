import React from 'react';
import Input from '../Input';

const Step = props => <Input { ...props } label="Step" tooltip="Set the increments at which a numeric value can be set. It can be the string 'any' (for floating numbers) or a positive number." />;
export default Step;