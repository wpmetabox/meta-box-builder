import dotProp from 'dot-prop';
import { SettingsDataContext } from '../../contexts/SettingsDataContext';

const { useContext, useState } = wp.element;
const { __ } = wp.i18n;

const Settings = ( { settings } ) => {
	const { settingsControls } = useContext( SettingsDataContext );

	const [ objectType, setObjectType ] = useState( dotProp.get( settings, 'object_type', 'post' ) );
	const [ postTypes, setPostTypes ] = useState( dotProp.get( settings, 'post_types', [ 'post' ] ) );

	if ( settingsControls.length === 0 ) {
		return <p className="og-none">{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>;
	}

	const updateObjectType = e => setObjectType( e.target.value );

	const getControlComponent = ( { name, setting, props, defaultValue } ) => {
		const Control = lazy( () => import( `../Controls/${ name }` ) );

		// If API specifies input name, then use it. Otherwise use setting. Convert name, name[subfield] to [name], [name][subfield].
		const input = dotProp.get( props, 'name', setting ).replace( /^([^\[]+)/, '[$1]' );

		// Convert name[subfield] to name.subfield to get default value.
		const key = dotProp.get( props, 'name', setting ).replace( '[', '.' ).replace( ']', '' );

		return <Control
			componentId={ `settings-${ setting }` }
			name={ `settings${ input }` }
			{ ...props }
			defaultValue={ dotProp.get( settings, key, defaultValue ) }
			defaultValues={ settings }
			objectType={ objectType }
			updateObjectType={ updateObjectType }
			postTypes={ postTypes }
			setPostTypes={ setPostTypes }
		/>;
	};

	return (
		<>
			{ settingsControls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</>
	);
};
export default Settings;
