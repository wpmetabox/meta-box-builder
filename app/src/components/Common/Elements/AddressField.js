import React from 'react';
import Input from '../Input';

const AddressField = ({label, type, ...rest}) => <Input {...rest} label="Address field" required="true" tooltip="The ID of address field. For multiple fields, separate them by comma." />
export default AddressField;