import { Button, Flex, Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { external } from '@wordpress/icons';
import Fields from './Structure/Fields';

const Header = () => (
	<Flex align="center" justify="space-between" gap={ 1 }>
		{ __( 'Structure', 'meta-box-builder' ) }
		<Button
			icon={ external }
			iconSize={ 16 }
			label={ __( 'Show as a floating panel', 'meta-box-builder' ) }
			showTooltip={ true }
		/>
	</Flex>
);

const StructurePanel = () => (
	<Panel header={ <Header /> } className="mb-panel mb-panel--structure">
		<div className="mb-panel__inner">
			<Fields />
		</div>
	</Panel>
);

export default StructurePanel;