import { memo, Suspense } from "@wordpress/element";
import { getControlParams } from '/functions';

const SettingsContent = ( { settings, settingsControls, postTypes, setPostTypes } ) => {
	const getControlComponent = control => {
		const [ Control, input, defaultValue ] = getControlParams( control, settings );

		return <Control
			componentId={ `settings-${ control.setting }` }
			name={ `settings${ input }` }
			{ ...control.props }
			defaultValue={ defaultValue }
			settings={ settings }
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
