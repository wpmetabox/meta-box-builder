import { Button, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import useSettings from '../../hooks/useSettings';
import Advanced from './FieldGroupSettings/Advanced';
import Block from './FieldGroupSettings/Block';
import BlockJSONSettings from './FieldGroupSettings/BlockJSONSettings';
import BlockRenderSettings from './FieldGroupSettings/BlockRenderSettings';
import ConditionalLogic from './FieldGroupSettings/ConditionalLogic';
import CustomTable from './FieldGroupSettings/CustomTable';
import IncludeExclude from './FieldGroupSettings/IncludeExclude';
import Location from './FieldGroupSettings/Location';
import Post from './FieldGroupSettings/Post';
import ShowHide from './FieldGroupSettings/ShowHide';
import Tabs from './FieldGroupSettings/Tabs';

const FieldGroupSettingsPanel = ( { show = false } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	return (
		<Panel className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<PanelBody title={ __( 'Summary', 'meta-box-builder' ) } initialOpen={ true }>
				<PanelRow className="summary">
					<p className="status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> { MbbApp.status }</p>
					<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
					{ MbbApp.modified && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modified }</p> }
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
				objectType === 'post' &&
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
				objectType === 'block' &&
				<PanelBody title={ __( 'Block render settings', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow><BlockRenderSettings /></PanelRow>
				</PanelBody>
			}
			{
				objectType === 'block' &&
				<PanelBody title={ __( 'Block JSON settings', 'meta-box-builder' ) } initialOpen={ false }>
					<PanelRow><BlockJSONSettings /></PanelRow>
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

export default FieldGroupSettingsPanel;