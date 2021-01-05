import dotProp from 'dot-prop';
import ConditionalLogic from '../Controls/ConditionalLogic';
import Input from '../Controls/Input';
import KeyValue from '../Controls/KeyValue';
import { Block } from './SettingsTab/Block';
import { CustomTable } from './SettingsTab/CustomTable';
import { IncludeExclude } from './SettingsTab/IncludeExclude';
import { Location } from './SettingsTab/Location';
import { Post } from './SettingsTab/Post';
import { ShowHide } from './SettingsTab/ShowHide';
import { Tabs } from './SettingsTab/Tabs';

const { useState } = wp.element;
const { __ } = wp.i18n;

const SettingsTab = ( { defaultValues } ) => {
	const [ objectType, setObjectType ] = useState( dotProp.get( defaultValues, 'object_type', 'post' ) );
	const [ postTypes, setPostTypes ] = useState( dotProp.get( defaultValues, 'post_types', [ 'post' ] ) );

	const updateObjectType = e => setObjectType( e.target.value );

	return (
		<>
			<Location
				objectType={ objectType }
				updateObjectType={ updateObjectType }
				postTypes={ postTypes }
				defaultValues={ defaultValues }
				setPostTypes={ setPostTypes }
			/>
			{ MbbApp.extensions.includeExclude && objectType !== 'block' && <IncludeExclude objectType={ objectType } postTypes={ postTypes } defaultValues={ dotProp.get( defaultValues, 'include_exclude', {} ) } /> }
			{ MbbApp.extensions.showHide && objectType !== 'block' && <ShowHide objectType={ objectType } defaultValues={ dotProp.get( defaultValues, 'show_hide', {} ) } /> }
			{ MbbApp.extensions.conditionalLogic && objectType !== 'block' && <ConditionalLogic defaultValue={ dotProp.get( defaultValues, 'conditional_logic', {} ) } name="settings[conditional_logic]" /> }
			{ objectType === 'post' && postTypes.length > 0 && <Post defaultValues={ defaultValues } postTypes={ postTypes } /> }
			{ MbbApp.extensions.blocks && objectType === 'block' && <Block defaultValues={ defaultValues } /> }
			{ MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) && <CustomTable defaultValues={ dotProp.get( defaultValues, 'custom_table', {} ) } /> }
			{ MbbApp.extensions.tabs && <Tabs defaultValues={ defaultValues } /> }
			<Input
				name="settings[prefix]"
				label={ __( 'Field ID prefix', 'meta-box-builder' ) }
				tooltip={ __( 'Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins. Leave empty to ignore this or use underscore (_) to make the fields hidden.', 'meta-box-builder' ) }
				componentId="prefix"
			/>
			<KeyValue
				name="settings[custom_settings]"
				defaultValue={ dotProp.get( defaultValues, 'custom_settings', {} ) }
				label={ __( 'Custom settings', 'meta-box-builder' ) }
				tooltip={ __( 'Apply to the current field group. For individual fields, please go to each field > tab Advanced.', 'meta-box-builder' ) }
			/>
		</>
	);
};
export default SettingsTab;
