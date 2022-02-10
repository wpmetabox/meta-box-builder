import { memo, Suspense } from "@wordpress/element";
import { getControlParams } from '/functions';

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
