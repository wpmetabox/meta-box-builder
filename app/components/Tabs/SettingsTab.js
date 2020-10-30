import Input from '../Common/Input';
import { Block } from './SettingsTab/Block';
import { IncludeExclude } from './SettingsTab/IncludeExclude';
import { Location } from './SettingsTab/Location';
import { Post } from './SettingsTab/Post';
import { ShowHide } from './SettingsTab/ShowHide';
const { useState } = wp.element;

const SettingsTab = ( { register } ) => {
	const [ objectType, setObjectType ] = useState( 'post' );
	const [ postTypes, setPostTypes ] = useState( ['post'] );

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
			<h3>Advanced</h3>
			<Input register={ register } name="prefix" label="Field ID prefix" defaultValue="prefix-" description="Prefix for all fields' ID. Leave empty to ignore or use _ to make fields hidden." tooltip="Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins." />
			<Input register={ register } name="text_domain" label="Text domain" defaultValue="online-generator" tooltip="Required for multilingual website. Used in the exported code only." />
		</>
	);
};
export default SettingsTab;
