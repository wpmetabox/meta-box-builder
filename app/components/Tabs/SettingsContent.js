import dotProp from 'dot-prop';

const { lazy, memo, Suspense } = wp.element;

const SettingsContent = ( { settings, settingsControls, objectType, setObjectType, postTypes, setPostTypes } ) => {
	const getControlComponent = ( { name, setting, props, defaultValue } ) => {
		const Control = lazy( () => import( `/controls/${ name }` ) );

		// If API specifies input name, then use it. Otherwise use setting.
		const n = dotProp.get( props, 'name', setting );

		// Convert name, name[subfield] to [name], [name][subfield].
		const input = n.replace( /^([^\[]+)/, '[$1]' );

		// Convert name[subfield] to name.subfield to get default value.
		const key = n.replace( '[', '.' ).replace( ']', '' );

		return <Control
			componentId={ `settings-${ setting }` }
			name={ `settings${ input }` }
			{ ...props }
			defaultValue={ dotProp.get( settings, key, defaultValue ) }
			settings={ settings }
			objectType={ objectType }
			setObjectType={ setObjectType }
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
export default memo( SettingsContent );
