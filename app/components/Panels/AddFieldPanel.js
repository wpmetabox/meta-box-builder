import { Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import getList from '../../list-functions';
import AddFieldContent from '../AddFieldContent';

const AddFieldPanel = () => {
	const addField = getList( 'root' )( state => state.addField );

	return (
		<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className="mb-panel mb-panel--add">
			<AddFieldContent addField={ addField } className='mb-panel__inner' />
		</Panel>
	);
};

export default AddFieldPanel;