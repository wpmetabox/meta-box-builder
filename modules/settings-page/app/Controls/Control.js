import dotProp from 'dot-prop';
import slugify from 'slugify';
import { SettingsContext } from '../SettingsContext';
import Checkbox from './Checkbox';
import Form from './Form';
import IconUrl from './IconUrl';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
const { useContext } = wp.element;

const Control = ( { field } ) => {
	const { settings, updateSettings } = useContext( SettingsContext );

	const update = e => {
		const name = e.target.name || e.target.dataset.name;
		let value = 'checkbox' === e.target.type ? e.target.checked : e.target.value;

		let newSettings = { ...settings };
		dotProp.set( newSettings, name, value );

		if ( field.autoFill ) {
			dotProp.set( newSettings, field.autoFill, slugify( value, { lower: true } ) );
		}

		if ( field.autoFillDash ) {
			dotProp.set( newSettings, field.autoFillDash, slugify( value, { replacement: '_', lower: true } ) );
		}

		updateSettings( newSettings );
	};

	const value = dotProp.get( settings, field.name );

	switch ( field.type ) {
		case 'text':
			return <Input { ...field } value={ value } update={ update } />;
		case 'textarea':
			return <Textarea { ...field } value={ value } update={ update } />;
		case 'checkbox':
			return <Checkbox { ...field } checked={ value } update={ update } />;
		case 'form':
			return <Form { ...field } value={ value } />;
		case 'select':
			return <Select { ...field } value={ value } update={ update } />;
		case 'icon_url':
			return <IconUrl name={ field.name } value={ value } type={ dotProp.get( settings, 'icon_type' ) } update={ update } />;
	}
};

export default Control;