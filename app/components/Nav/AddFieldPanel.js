import { Panel } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import useLists from '../../hooks/useLists';
import AddFieldContent from '../AddFieldContent';

const AddFieldPanel = ( { show } ) => {
	const { getForList } = useLists();
	const { addField } = getForList( 'root' );

	return (
		<Panel header={ __( 'Add a new field', 'meta-box-builder' ) } className={ `mb-panel mb-panel--add ${ show ? 'mb-panel--show' : '' }` }>
			<AddFieldContent addField={ addField } className='mb-panel__inner' />
		</Panel>
	);
};

export default AddFieldPanel;