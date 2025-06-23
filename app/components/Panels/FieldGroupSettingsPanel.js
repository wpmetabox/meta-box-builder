import { Panel, PanelRow } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
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
				<PersistentPanelBody title={ __( 'Location', 'meta-box-builder' ) }>
					<PanelRow><Location /></PanelRow>
					{
						MbbApp.extensions.includeExclude && objectType !== 'block' &&
						<PanelRow><IncludeExclude /></PanelRow>
					}
				</PersistentPanelBody>
				{
					objectType === 'post' &&
					<PersistentPanelBody title={ __( 'Settings', 'meta-box-builder' ) }>
						<Post />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody title={ __( 'Block settings', 'meta-box-builder' ) }>
						<Block />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody title={ __( 'Block render settings', 'meta-box-builder' ) }>
						<BlockRenderSettings />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody title={ __( 'Block JSON settings', 'meta-box-builder' ) }>
						<BlockJSONSettings />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.showHide && objectType !== 'block' &&
					<PersistentPanelBody title={ __( 'Toggle rules', 'meta-box-builder' ) } className="og-include-exclude">
						<ShowHide />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.conditionalLogic &&
					<PersistentPanelBody title={ __( 'Conditional logic', 'meta-box-builder' ) } className="og-include-exclude">
						<ConditionalLogic />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.tabs &&
					<PersistentPanelBody title={ __( 'Tab settings', 'meta-box-builder' ) }>
						<Tabs />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
					<PersistentPanelBody title={ __( 'Custom table', 'meta-box-builder' ) }>
						<CustomTable />
					</PersistentPanelBody>
				}
				{
					MbbApp.polylang &&
					<PersistentPanelBody title={ __( 'Translation', 'meta-box-builder' ) }>
						<Translation />
					</PersistentPanelBody>
				}
				{
					![ 'setting', 'block' ].includes( objectType ) &&
					<PersistentPanelBody title={ __( 'Advanced', 'meta-box-builder' ) }>
						<Advanced />
					</PersistentPanelBody>
				}
			</div>
		</Panel>
	);
};

export default FieldGroupSettingsPanel;