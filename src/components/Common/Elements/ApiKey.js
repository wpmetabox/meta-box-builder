import React from 'react';
import Input from '../Input';

const ApiKey = ({label, type, ...rest}) => <Input {...rest} label="<a href='https://developers.google.com/maps/documentation/javascript/get-api-key' target='_blank' rel='noopenner noreferrer'>Google Maps API key</a>" required="true" />
export default ApiKey;