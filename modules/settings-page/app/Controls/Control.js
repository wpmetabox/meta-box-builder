import dotProp from 'dot-prop';
import { SettingsContext } from '../SettingsContext';
import Checkbox from '/components/Controls/Checkbox';
// import Form from '/components/Controls/Form';
import Input from '/components/Controls/Input';
import Select from '/components/Controls/Select';
import Textarea from '/components/Controls/Textarea';
const { useContext } = wp.element;

const Control = ( { field } ) => {
	const { settings, updateSettings } = useContext( SettingsContext );

	const value = dotProp.get( settings, field.name );

	switch ( field.type ) {
		case 'text':
			return <Input { ...field } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
		case 'textarea':
			return <Textarea { ...field } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
		case 'checkbox':
			return <Checkbox { ...field } checked={ value } />;
		case 'form':
		// return <Form { ...field } componentId={ `settings-${ field.name }` } name={`settings[${field.name}]`} />;
		case 'select':
			return <Select { ...field } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
	}
};

export default Control;