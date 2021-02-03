import { getControlParams } from '/functions';
const { memo, Suspense } = wp.element;

const SettingsContent = ( { settings, settingsControls, objectType, setObjectType, postTypes, setPostTypes } ) => {
	const getControlComponent = control => {
		const [ Control, input, defaultValue ] = getControlParams( control, settings );

		return <Control
			componentId={ `settings-${ control.setting }` }
			name={ `settings${ input }` }
			{ ...control.props }
			defaultValue={ defaultValue }
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
