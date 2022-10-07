import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import dotProp from 'dot-prop';
import { ensureArray, get } from '../../functions';
import SettingsContent from './SettingsContent';

const Settings = ( { settings } ) => {
	const settingsControls = get( 'settings-controls', [] );

	const [ objectType, setObjectType ] = useState( dotProp.get( settings, 'object_type', 'post' ) );
	const [ postTypes, setPostTypes ] = useState( ensureArray( dotProp.get( settings, 'post_types', [ 'post' ] ) ) );

	if ( settingsControls.length === 0 ) {
		return <p>{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>;
	}

	return <SettingsContent
		settings={ settings }
		settingsControls={ settingsControls }
		objectType={ objectType }
		setObjectType={ setObjectType }
		postTypes={ postTypes }
		setPostTypes={ setPostTypes }
	></SettingsContent>;
};
export default Settings;
