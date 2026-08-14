import useModelSchema from '../../hooks/useModelSchema';
import CustomTableSchemaModal from '../Modals/CustomTableSchemaModal';

const CustomTableSchemaController = () => {
	const schemaOpen = useModelSchema( state => state.customTableSchemaOpen );
	const closeSchema = useModelSchema( state => state.closeCustomTableSchema );

	return schemaOpen ? <CustomTableSchemaModal onClose={ closeSchema } /> : null;
};

export default CustomTableSchemaController;
