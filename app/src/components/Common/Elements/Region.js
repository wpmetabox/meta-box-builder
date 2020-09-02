import React from 'react';
import Input from '../Input';

const Region = ({label, type, ...rest}) => <Input {...rest} label="<a href='https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Country_code_top-level_domains' target='_blank' rel='noopenner noreferrer'>Region code</a>" tooltip="The region code, specified as a country code top-level domain. This parameter returns autocompleted address results influenced by the region (typically the country) from the address field." />
export default Region;