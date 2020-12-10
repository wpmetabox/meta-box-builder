import dotProp from 'dot-prop';
import { Block } from './SettingsTab/Block';
import { CustomSettings } from './SettingsTab/CustomSettings';
import { CustomTable } from './SettingsTab/CustomTable';
import { IncludeExclude } from './SettingsTab/IncludeExclude';
import { Location } from './SettingsTab/Location';
import { Post } from './SettingsTab/Post';
import { ShowHide } from './SettingsTab/ShowHide';
import { Tabs } from './SettingsTab/Tabs';

const { useState } = wp.element;

const SettingsTab = ( { register, defaultValues } ) => {
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
			{ MbbApp.extensions.includeExclude && <IncludeExclude defaultValues={ dotProp.get( defaultValues, 'include_exclude', {} ) } /> }
			{ MbbApp.extensions.showHide && <ShowHide defaultValues={ defaultValues } /> }
			{ objectType === 'post' && postTypes.length > 0 && <Post defaultValues={ defaultValues } postTypes={ postTypes } /> }
			{ MbbApp.extensions.blocks && objectType === 'block' && <Block /> }
			{ MbbApp.extensions.customTable && <CustomTable /> }
			{ MbbApp.extensions.tabs && <Tabs defaultValues={ defaultValues } /> }
			<CustomSettings objectType={ objectType } name='custom_setting' defaultValue={ defaultValues && defaultValues.custom_setting ? Object.values( defaultValues?.custom_setting ) : [] } />
		</>
	);
};
export default SettingsTab;
