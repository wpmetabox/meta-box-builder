import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ensureArray } from '../../functions';
import useApi from "../../hooks/useApi";
import SettingsContent from './SettingsContent';

const Settings = ( { settings } ) => {
	const settingsControls = useApi( 'settings-controls', [] );

	const [ objectType, setObjectType ] = useState( settings.object_type || 'post' );
	const [ postTypes, setPostTypes ] = useState( ensureArray( settings.post_types || [ 'post' ] ) );

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
