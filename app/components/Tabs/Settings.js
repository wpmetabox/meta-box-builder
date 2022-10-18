import { Suspense } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getControlParams, getSettings } from "../../functions";
import useApi from "../../hooks/useApi";

const settings = getSettings();

const getControlComponent = control => {
	const [ Control, input, defaultValue ] = getControlParams( control, settings );

	return <Control
		componentId={ `settings-${ control.setting }` }
		name={ `settings${ input }` }
		{ ...control.props }
		defaultValue={ defaultValue }
	/>;
};

const Settings = () => {
	const settingsControls = useApi( 'settings-controls', [] );

	return settingsControls.length === 0
		? <p>{ __( 'Loading settings, please wait...', 'meta-box-builder' ) }</p>
		: <>
			{
				settingsControls.map( control => (
					<Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> )
				)
			}
		</>;
};

export default Settings;
