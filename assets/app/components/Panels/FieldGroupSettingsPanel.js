import { Panel, PanelRow, Tooltip } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
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
import Translation from './FieldGroupSettings/Translation';
import PersistentPanelBody from './PersistentPanelBody';

const Header = () => {
	// Prevent the default behavior of "Enter" key.
	const preventEnter = e => {
		if ( e.key === 'Enter' ) {
			e.preventDefault();
		}
	};

	return (
		<>
			<span className="mb-panel__header">{ __( 'Field group settings', 'meta-box-builder' ) }</span>
			<div className="mb-field-group-id">
				{ __( 'ID', 'meta-box-builder' ) }:&nbsp;
				<Tooltip text={ __( 'Click to edit. Must be unique between field groups. Use only lowercase letters, numbers, underscores, and dashes.', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
					<span
						id="post_name"
						contentEditable
						suppressContentEditableWarning={ true }
						onKeyDown={ preventEnter }
					>{ MbbApp.slug }</span>
				</Tooltip>
			</div>
		</>
	);
};

const FieldGroupSettingsPanel = () => {
	const { getObjectType, validateAndUpdateObjectType } = useSettings( state => ( {
		getObjectType: state.getObjectType,
		validateAndUpdateObjectType: state.validateAndUpdateObjectType,
	} ) );
	const objectType = getObjectType();

	// Validate and update object type after component mount to avoid setState during render
	useEffect( () => {
		validateAndUpdateObjectType();
	}, [ objectType ] );

	return (
		<Panel header={ <Header /> } className="mb-panel mb-panel--field-group-settings">
			<div className="mb-panel__inner">
				<PersistentPanelBody panelId="field-group-location" title={ __( 'Location', 'meta-box-builder' ) }>
					<PanelRow><Location /></PanelRow>
					{
						MbbApp.extensions.includeExclude && objectType !== 'block' &&
						<PanelRow><IncludeExclude /></PanelRow>
					}
				</PersistentPanelBody>
				{
					objectType === 'post' &&
					<PersistentPanelBody panelId="field-group-settings" title={ __( 'Settings', 'meta-box-builder' ) }>
						<Post />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody panelId="field-group-block-settings" title={ __( 'Block settings', 'meta-box-builder' ) }>
						<Block />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody panelId="field-group-block-render-settings" title={ __( 'Block render settings', 'meta-box-builder' ) }>
						<BlockRenderSettings />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' && <BlockJSONSettings />
				}
				{
					MbbApp.extensions.showHide && objectType !== 'block' &&
					<ShowHide />
				}
				{
					MbbApp.extensions.conditionalLogic && <ConditionalLogic />
				}
				{
					MbbApp.extensions.tabs &&
					<PersistentPanelBody panelId="field-group-tab-settings" title={ __( 'Tab settings', 'meta-box-builder' ) }>
						<Tabs />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
					<CustomTable />
				}
				{
					MbbApp.polylang &&
					<PersistentPanelBody panelId="field-group-translation" title={ __( 'Translation', 'meta-box-builder' ) }>
						<Translation />
					</PersistentPanelBody>
				}
				{
					![ 'setting', 'block' ].includes( objectType ) &&
					<PersistentPanelBody panelId="field-group-advanced" title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ false }>
						<Advanced />
					</PersistentPanelBody>
				}
			</div>
		</Panel>
	);
};

export default FieldGroupSettingsPanel;