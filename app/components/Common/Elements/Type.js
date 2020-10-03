import React from 'react';
import Input from '../Input';
import { getLabel } from '../../../utility/functions';

const Type = ( { label, type, ...rest } ) => <Input { ...rest } type='hidden' label={ getLabel( label, type ) } />;
export default Type;