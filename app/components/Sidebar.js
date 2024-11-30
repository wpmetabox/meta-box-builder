import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { Suspense, useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SettingsContext } from "../contexts/SettingsContext";
import { getControlParams } from "../functions";
import useApi from "../hooks/useApi";
import ConditionalLogic from './Sidebar/ConditionalLogic';
import IncludeExclude from './Sidebar/IncludeExclude';
import Location from './Sidebar/Location';
import ShowHide from './Sidebar/ShowHide';
import Tabs from './Sidebar/Tabs';

const Sidebar = () => {
	const settingsControls = useApi( 'settings-controls', [] );
	const { settings, updateSettings } = useContext( SettingsContext );

	return (
		<Panel className="mb-sidebar">
			<PanelBody title={ __( 'Summary', 'meta-box-builder' ) } initialOpen={ true }>
				<PanelRow className="summary">
					<p className="status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> { MbbApp.status }</p>
					<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
					{ MbbApp.modifiedtime && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modifiedtime }</p> }
					<p><label>{ __( 'Author', 'meta-box-builder' ) }</label> { MbbApp.author }</p>
					<p><Button href={ MbbApp.trash } isDestructive={ true } variant="secondary">{ __( 'Move to trash', 'meta-box-builder' ) }</Button></p>
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Location', 'meta-box-builder' ) } initialOpen={ true }>
				<PanelRow><Location /></PanelRow>
				{ MbbApp.extensions.includeExclude && <PanelRow><IncludeExclude /></PanelRow> }
			</PanelBody>
			{
				MbbApp.extensions.showHide &&
				<PanelBody title={ __( 'Toggle rules', 'meta-box-builder' ) }>
					<PanelRow className="og-include-exclude"><ShowHide /></PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.conditionalLogic &&
				<PanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) }>
					<PanelRow className="og-include-exclude"><ConditionalLogic /></PanelRow>
				</PanelBody>
			}
			{
				settingsControls.length > 0 &&
				<PanelBody title={ __( 'Settings', 'meta-box-builder' ) } initialOpen={ true }>
					<PanelRow>
						{
							settingsControls.map( control => (
								<Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control, settings, updateSettings ) }</Suspense>
							) )
						}
					</PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.tabs &&
				<PanelBody title={ __( 'Tab settings', 'meta-box-builder' ) }>
					<PanelRow><Tabs /></PanelRow>
				</PanelBody>
			}
		</Panel>
	);
};

const getControlComponent = ( control, settings, updateSettings ) => {
	const [ Control, input, defaultValue ] = getControlParams( control, settings );

	return <Control
		componentId={ `settings-${ control.setting }` }
		name={ `settings${ input }` }
		{ ...control.props }
		defaultValue={ defaultValue }
		updateFieldData={ updateSettings }
	/>;
};

export default Sidebar;