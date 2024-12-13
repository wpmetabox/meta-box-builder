import { Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import AddFieldContent from '../AddFieldContent';

const AddFieldPanel = ( { show = true } ) => (
	<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className={ `mb-panel mb-panel--add ${ show ? 'mb-panel--show' : '' }` }>
		<AddFieldContent className='mb-panel__inner' />
	</Panel>
);

export default AddFieldPanel;