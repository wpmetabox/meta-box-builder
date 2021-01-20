import dotProp from 'dot-prop';
import Checkbox from '/components/Controls/Checkbox';
import Icon from '/components/Controls/Icon';
import Input from '/components/Controls/Input';
import KeyValue from '/components/Controls/KeyValue';
import Select from '/components/Controls/Select';
import Textarea from '/components/Controls/Textarea';

const Control = ( { field } ) => {
	const props = {
		...field,
		defaultValue: dotProp.get( MBSPUI.settings, field.name, field.defaultValue ),
		componentId: `settings-${ field.name }`,
		name: `settings[${ field.name }]`
	};

	switch ( field.type ) {
		case 'text':
			return <Input { ...props } />;
		case 'textarea':
			return <Textarea { ...props } />;
		case 'checkbox':
			return <Checkbox { ...props } />;
		case 'key_value':
			return <KeyValue { ...props } />;
		case 'select':
			return <Select { ...props } />;
		case 'icon':
			return <Icon icons={ MBSPUI.icons } { ...props } />;
	}
};

export default Control;