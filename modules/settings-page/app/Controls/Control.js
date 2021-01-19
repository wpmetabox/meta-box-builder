import dotProp from 'dot-prop';
import { SettingsContext } from '../SettingsContext';
import Checkbox from './Checkbox';
import Form from './Form';
import IconUrl from './IconUrl';
import Select from './Select';
import Textarea from './Textarea';
import Input from '/components/Controls/Input';
const { useContext } = wp.element;

const Control = ( { field } ) => {
	const { settings, updateSettings } = useContext( SettingsContext );

	const value = dotProp.get( settings, field.name );

	switch ( field.type ) {
		case 'text':
			return <Input { ...field } componentId={ `settings[${ field.name }]` } />;
		case 'textarea':
			return <Textarea { ...field } componentId={ `settings[${ field.name }]` } />;
		case 'checkbox':
			return <Checkbox { ...field } checked={ value } />;
		case 'form':
			return <Form { ...field } componentId={ `settings[${ field.name }]` } />;
		case 'select':
			return <Select { ...field } componentId={ `settings[${ field.name }]` } />;
		case 'icon_url':
			return <IconUrl name={ field.name } componentId={ `settings[${ field.name }]` } type={ dotProp.get( settings, 'icon_type' ) } />;
	}
};

export default Control;