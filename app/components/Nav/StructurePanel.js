import { Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import Fields from './Structure/Fields';

const StructurePanel = ( { show } ) => (
	<Panel header={ __( 'Structure', 'meta-box-builder' ) } className={ `mb-panel mb-panel--structure ${ show ? 'mb-panel--show' : '' }` }>
		<div className="mb-panel__inner">
			<Fields />
		</div>
	</Panel>
);

export default StructurePanel;