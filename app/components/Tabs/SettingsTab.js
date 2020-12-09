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
	const [ objectType, setObjectType ] = useState( 'post' );
	const [ postTypes, setPostTypes ] = useState( defaultValues ? JSON.parse( defaultValues[ 'post_types' ] ) : [ 'post' ] );

	const updateObjectType = e => setObjectType( e.target.value );
	const updatePostTypes = items => {
		let newPostTypes = items ? items.map( item => item.value ) : [];
		setPostTypes( newPostTypes );
	};

	return (
		<>
			<Location
				objectType={ objectType }
				updateObjectType={ updateObjectType }
				postTypes={ postTypes }
				defaultValues={ defaultValues }
				updatePostTypes={ updatePostTypes }
			/>
			{ MbbApp.extensions.includeExclude && <IncludeExclude defaultValues={ defaultValues } /> }
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
