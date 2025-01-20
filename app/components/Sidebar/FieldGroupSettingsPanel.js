import { Panel, PanelRow } from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
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

const FieldGroupSettingsPanel = ( { show = false } ) => {
	const { getObjectType } = useSettings();
	const objectType = getObjectType();

	const [ activeTab, setActiveTab ] = useState( 'location' );
	const updateActiveTab = key => () => setActiveTab( key === activeTab ? '' : key );

	const ref = useRef();

	useEffect( () => {
		if ( ref.current ) {
			ref.current.scrollTop = 0; // Reset scroll position to top.
		}
	}, [ activeTab ] );

	return (
		<Panel header={ __( 'Edit field group settings', 'meta-box-builder' ) } className={ `mb-panel ${ show ? 'mb-panel--show' : '' }` }>
			<div className="mb-panel__inner" ref={ ref }>
				<Summary />
				<PersistentPanelBody
					title={ __( 'Location', 'meta-box-builder' ) }
					open={ activeTab === 'location' }
					onClick={ updateActiveTab( 'location' ) }
				>
					<PanelRow><Location /></PanelRow>
					{
						MbbApp.extensions.includeExclude && objectType !== 'block' &&
						<PanelRow><IncludeExclude /></PanelRow>
					}
				</PersistentPanelBody>
				{
					objectType === 'post' &&
					<PersistentPanelBody
						title={ __( 'Settings', 'meta-box-builder' ) }
						open={ activeTab === 'settings' }
						onClick={ updateActiveTab( 'settings' ) }
					>
						<Post />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody
						title={ __( 'Block settings', 'meta-box-builder' ) }
						open={ activeTab === 'block_settings' }
						onClick={ updateActiveTab( 'block_settings' ) }
					>
						<Block />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody
						title={ __( 'Block render settings', 'meta-box-builder' ) }
						open={ activeTab === 'block_render' }
						onClick={ updateActiveTab( 'block_render' ) }
					>
						<BlockRenderSettings />
					</PersistentPanelBody>
				}
				{
					objectType === 'block' &&
					<PersistentPanelBody
						title={ __( 'Block JSON settings', 'meta-box-builder' ) }
						open={ activeTab === 'block_json' }
						onClick={ updateActiveTab( 'block_json' ) }
					>
						<BlockJSONSettings />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.showHide && objectType !== 'block' &&
					<PersistentPanelBody
						title={ __( 'Toggle rules', 'meta-box-builder' ) }
						className="og-include-exclude"
						open={ activeTab === 'show_hide' }
						onClick={ updateActiveTab( 'show_hide' ) }
					>
						<ShowHide />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.conditionalLogic &&
					<PersistentPanelBody
						title={ __( 'Conditional logic', 'meta-box-builder' ) }
						className="og-include-exclude"
						open={ activeTab === 'conditional_logic' }
						onClick={ updateActiveTab( 'conditional_logic' ) }
					>
						<ConditionalLogic />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.tabs &&
					<PersistentPanelBody
						title={ __( 'Tab settings', 'meta-box-builder' ) }
						open={ activeTab === 'tabs' }
						onClick={ updateActiveTab( 'tabs' ) }
					>
						<Tabs />
					</PersistentPanelBody>
				}
				{
					MbbApp.extensions.customTable && ![ 'setting', 'block' ].includes( objectType ) &&
					<PersistentPanelBody
						title={ __( 'Custom table', 'meta-box-builder' ) }
						open={ activeTab === 'custom_table' }
						onClick={ updateActiveTab( 'custom_table' ) }
					>
						<CustomTable />
					</PersistentPanelBody>
				}
				{
					![ 'setting', 'block' ].includes( objectType ) &&
					<PersistentPanelBody
						title={ __( 'Advanced', 'meta-box-builder' ) }
						open={ activeTab === 'advanced' }
						onClick={ updateActiveTab( 'advanced' ) }
					>
						<Advanced />
					</PersistentPanelBody>
				}
			</div>
		</Panel>
	);
};

export default FieldGroupSettingsPanel;