import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ensureArray } from '../../functions';
import useApi from "../../hooks/useApi";
import SettingsContent from './SettingsContent';

const Settings = ( { settings } ) => {
	const settingsControls = useApi( 'settings-controls', [] );

	const [ postTypes, setPostTypes ] = useState( ensureArray( settings.post_types || [ 'post' ] ) );

	if ( settingsControls.length === 0 ) {
		return <p>{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>;
	}

	return <SettingsContent
		settings={ settings }
		settingsControls={ settingsControls }
		postTypes={ postTypes }
		setPostTypes={ setPostTypes }
	></SettingsContent>;
};
export default Settings;
