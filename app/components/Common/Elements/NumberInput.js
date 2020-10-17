import React from 'react';
import { getLabel } from '../../../utility/functions';
import Input from '../Input';

const NumberInput = ( { label, type, ...rest } ) => <Input { ...rest } inputType="number" label={ getLabel( label, type ) } />;
export default NumberInput;