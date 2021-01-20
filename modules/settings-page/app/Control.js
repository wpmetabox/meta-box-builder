import dotProp from 'dot-prop';
import Checkbox from '/components/Controls/Checkbox';
import Icon from '/components/Controls/Icon';
import Input from '/components/Controls/Input';
import KeyValue from '/components/Controls/KeyValue';
import Select from '/components/Controls/Select';
import Textarea from '/components/Controls/Textarea';
const { useContext } = wp.element;

const Control = ( { field } ) => {
	const defaultValue = dotProp.get( MBSPUI.settings, field.name );

	switch ( field.type ) {
		case 'text':
			return <Input { ...field } defaultValue={ defaultValue } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
		case 'textarea':
			return <Textarea { ...field } defaultValue={ defaultValue } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
		case 'checkbox':
			return <Checkbox { ...field } defaultValue={ defaultValue } />;
		case 'key_value':
			return <KeyValue { ...field } defaultValue={ defaultValue } componentId={ `settings-${ field.name }` } name={`settings[${field.name}]`} />;
		case 'select':
			return <Select { ...field } defaultValue={ defaultValue } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
		case 'icon':
			return <Icon icons={ MBSPUI.icons } { ...field } defaultValue={ defaultValue } componentId={ `settings-${ field.name }` } name={ `settings[${ field.name }]` } />;
	}
};

export default Control;