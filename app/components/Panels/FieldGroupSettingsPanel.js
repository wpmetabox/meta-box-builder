import { Panel, PanelBody, PanelRow } from '@wordpress/components';
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
import Summary from './FieldGroupSettings/Summary';
import Tabs from './FieldGroupSettings/Tabs';
import Translation from './FieldGroupSettings/Translation';

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
		<Panel header={ __( 'Edit field group settings', 'meta-box-builder' ) } className="mb-panel mb-panel--field-group-settings">
			<div className="mb-panel__inner">
				<Summary />
				<PanelBody title={ __( 'Location', 'meta-box-builder' ) }>
					<PanelRow><Location /></PanelRow>
					{
						MbbApp.extensions.includeExclude && objectType !== 'block' &&
						<PanelRow><IncludeExclude /></PanelRow>
					}
				</PanelBody>
				{
					objectType === 'post' &&
					<PanelBody title={ __( 'Settings', 'meta-box-builder' ) }>
						<Post />
					</PanelBody>
				}
				{
					objectType === 'block' &&
					<PanelBody title={ __( 'Block settings', 'meta-box-builder' ) }>
						<Block />
					</PanelBody>
				}
				{
					objectType === 'block' &&
					<PanelBody title={ __( 'Block render settings', 'meta-box-builder' ) }>
						<BlockRenderSettings />
					</PanelBody>
				}
				{
					objectType === 'block' &&
					<PanelBody title={ __( 'Block JSON settings', 'meta-box-builder' ) }>
						<BlockJSONSettings />
					</PanelBody>
				}
				{
					MbbApp.extensions.showHide && objectType !== 'block' &&
					<PanelBody title={ __( 'Toggle rules', 'meta-box-builder' ) }>
						<ShowHide />
					</PanelBody>
				}
				{
					MbbApp.extensions.conditionalLogic &&
					<PanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) }>
						<ConditionalLogic />
					</PanelBody>
				}
				{
					MbbApp.extensions.tabs &&
					<PanelBody title={ __( 'Tab settings', 'meta-box-builder' ) }>
						<Tabs />
					</PanelBody>
				}
				{
					MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
					<PanelBody title={ __( 'Custom table', 'meta-box-builder' ) }>
						<CustomTable />
					</PanelBody>
				}
				{
					MbbApp.polylang &&
					<PanelBody title={ __( 'Translation', 'meta-box-builder' ) }>
						<Translation />
					</PanelBody>
				}
				{
					![ 'setting', 'block' ].includes( objectType ) &&
					<PanelBody title={ __( 'Advanced', 'meta-box-builder' ) } initialOpen={ false }>
						<Advanced />
					</PanelBody>
				}
			</div>
		</Panel>
	);
};

export default FieldGroupSettingsPanel;