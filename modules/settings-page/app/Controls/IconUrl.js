import Icon from './Icon';
import Input from './Input';
import Textarea from './Textarea';

const IconUrl = ( { type, update, value } ) => {
	switch ( type ) {
		case '1': // base64
			return <Textarea name="icon_url" value={ value } update={ update } />
		case '2': // custom url
			return <Input name="icon_url" value={ value } update={ update } />
		default:
			return <Icon name="icon_url" value={ value } update={ update } />
	}
}

export default IconUrl;