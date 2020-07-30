import React from 'react';
import Input from '../Input';

const StdMap = ({label, type, ...rest}) => <Input {...rest} label="Default location" tooltip="Format: latitude,longitude" />
export default StdMap;