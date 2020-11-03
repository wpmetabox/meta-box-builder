import { Block } from './SettingsTab/Block';
import { CustomSettings } from './SettingsTab/CustomSettings';
import { CustomTable } from './SettingsTab/CustomTable';
import { IncludeExclude } from './SettingsTab/IncludeExclude';
import { Location } from './SettingsTab/Location';
import { Post } from './SettingsTab/Post';
import { ShowHide } from './SettingsTab/ShowHide';
const { useState } = wp.element;

const SettingsTab = ( { register } ) => {
	const [ objectType, setObjectType ] = useState( 'post' );
	const [ postTypes, setPostTypes ] = useState( [ 'post' ] );

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
				updatePostTypes={ updatePostTypes }
			/>
			{ MbbApp.extensions.includeExclude && <IncludeExclude /> }
			{ MbbApp.extensions.showHide && <ShowHide /> }
			{ objectType === 'post' && postTypes.length > 0 && <Post postTypes={ postTypes } /> }
			{ MbbApp.extensions.blocks && objectType === 'block' && <Block /> }
			{ MbbApp.extensions.customTable && <CustomTable /> }
			<CustomSettings objectType={ objectType } />
		</>
	);
};
export default SettingsTab;
