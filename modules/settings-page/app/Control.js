import dotProp from 'dot-prop';
import { SettingsContext } from './SettingsContext';
import Checkbox from '/components/Controls/Checkbox';
import Input from '/components/Controls/Input';
import KeyValue from '/components/Controls/KeyValue';
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
		case 'key_value':
			return <KeyValue { ...field } componentId={ `settings-${ field.name }` } name={`settings[${field.name}]`} />;
		case 'select':
			return <Select { ...field } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
	}
};

export default Control;