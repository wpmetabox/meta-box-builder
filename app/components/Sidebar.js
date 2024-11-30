import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SettingsContext } from "../contexts/SettingsContext";
import useApi from "../hooks/useApi";
import useObjectType from "../hooks/useObjectType";
import usePostTypes from "../hooks/usePostTypes";
import Advanced from './Sidebar/Advanced';
import Block from './Sidebar/Block';
import ConditionalLogic from './Sidebar/ConditionalLogic';
import CustomTable from './Sidebar/CustomTable';
import IncludeExclude from './Sidebar/IncludeExclude';
import Location from './Sidebar/Location';
import Post from './Sidebar/Post';
import ShowHide from './Sidebar/ShowHide';
import Tabs from './Sidebar/Tabs';

const Sidebar = () => {
	const settingsControls = useApi( 'settings-controls', [] );
	const { settings, updateSettings } = useContext( SettingsContext );
	const objectType = useObjectType( state => state.type );
	const postTypes = usePostTypes( state => state.types );

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
				{
					MbbApp.extensions.includeExclude && objectType !== 'block' &&
					<PanelRow><IncludeExclude /></PanelRow>
				}
			</PanelBody>
			{
				objectType === 'post' && postTypes.length > 0 &&
				<PanelBody title={ __( 'Settings', 'meta-box-builder' ) } initialOpen={ true }>
					<PanelRow><Post /></PanelRow>
				</PanelBody>
			}
			{
				objectType === 'block' &&
				<PanelBody title={ __( 'Block settings', 'meta-box-builder' ) } initialOpen={ true }>
					<PanelRow><Block /></PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.showHide && objectType !== 'block' &&
				<PanelBody title={ __( 'Toggle rules', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow className="og-include-exclude"><ShowHide /></PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.conditionalLogic &&
				<PanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow className="og-include-exclude"><ConditionalLogic /></PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.tabs &&
				<PanelBody title={ __( 'Tab settings', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow><Tabs /></PanelRow>
				</PanelBody>
			}
			{
				MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
				<PanelBody title={ __( 'Custom table', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow><CustomTable /></PanelRow>
				</PanelBody>
			}
			{
				![ 'setting', 'block' ].includes( objectType ) &&
				<PanelBody title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow><Advanced /></PanelRow>
				</PanelBody>
			}
		</Panel>
	);
};

export default Sidebar;