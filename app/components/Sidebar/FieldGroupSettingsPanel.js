import { Button, Panel, PanelRow } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import useSettings from '../../hooks/useSettings';
import PersistentPanelBody from '../PersistentPanelBody';
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

			<PersistentPanelBody title={ __( 'Summary', 'meta-box-builder' ) } className="summary" initialOpen={ true }>
				<p className="status"><label>{ __( 'Status', 'meta-box-builder' ) }</label> { MbbApp.status }</p>
				<p><label>{ __( 'Published', 'meta-box-builder' ) }</label> { MbbApp.published }</p>
				{ MbbApp.modified && <p><label>{ __( 'Last modified', 'meta-box-builder' ) }</label> { MbbApp.modified }</p> }
				<p><label>{ __( 'Author', 'meta-box-builder' ) }</label> { MbbApp.author }</p>
				<p><Button href={ MbbApp.trash } isDestructive={ true } variant="secondary">{ __( 'Move to trash', 'meta-box-builder' ) }</Button></p>
			</PersistentPanelBody>
			<PersistentPanelBody title={ __( 'Location', 'meta-box-builder' ) } initialOpen={ true }>
				<PanelRow><Location /></PanelRow>
				{
					MbbApp.extensions.includeExclude && objectType !== 'block' &&
					<PanelRow><IncludeExclude /></PanelRow>
				}
			</PersistentPanelBody>
			{
				objectType === 'post' &&
				<PersistentPanelBody title={ __( 'Settings', 'meta-box-builder' ) } initialOpen={ true }>
					<Post />
				</PersistentPanelBody>
			}
			{
				objectType === 'block' &&
				<PersistentPanelBody title={ __( 'Block settings', 'meta-box-builder' ) } initialOpen={ true }>
					<Block />
				</PersistentPanelBody>
			}
			{
				objectType === 'block' &&
				<PersistentPanelBody title={ __( 'Block render settings', 'meta-box-builder' ) } initialOpen={ false }>
					<BlockRenderSettings />
				</PersistentPanelBody>
			}
			{
				objectType === 'block' &&
				<PersistentPanelBody title={ __( 'Block JSON settings', 'meta-box-builder' ) } initialOpen={ false }>
					<BlockJSONSettings />
				</PersistentPanelBody>
			}
			{
				MbbApp.extensions.showHide && objectType !== 'block' &&
				<PersistentPanelBody title={ __( 'Toggle rules', 'meta-box-builder' ) } className="og-include-exclude" initialOpen={ false }>
					<ShowHide />
				</PersistentPanelBody>
			}
			{
				MbbApp.extensions.conditionalLogic &&
				<PersistentPanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) } className="og-include-exclude" initialOpen={ false }>
					<ConditionalLogic />
				</PersistentPanelBody>
			}
			{
				MbbApp.extensions.tabs &&
				<PersistentPanelBody title={ __( 'Tab settings', 'meta-box-builder' ) } initialOpen={ false }>
					<Tabs />
				</PersistentPanelBody>
			}
			{
				MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
				<PersistentPanelBody title={ __( 'Custom table', 'meta-box-builder' ) } initialOpen={ false }>
					<CustomTable />
				</PersistentPanelBody>
			}
			{
				![ 'setting', 'block' ].includes( objectType ) &&
				<PersistentPanelBody title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ false }>
					<Advanced />
				</PersistentPanelBody>
			}
		</Panel>
	);
};

export default FieldGroupSettingsPanel;