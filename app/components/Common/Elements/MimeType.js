import React from 'react';
import Input from '../Input';

const MimeType = props => <Input {...props} label="MIME types" type="text" tooltip="This is a filter for items in Media Library popup, it does not restrict file types when upload." />
export default MimeType;