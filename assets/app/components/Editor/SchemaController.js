import useModelSchemaSync from '../../hooks/useModelSchemaSync';
import useModelSchema from '../../hooks/useModelSchema';
import { getColumnNames } from '../../utils/modelColumns';
import SchemaModal from '../Modals/SchemaModal';

const SchemaController = () => {
	useModelSchemaSync();

	const schemaOpen = useModelSchema( state => state.schemaOpen );
	const schemaSource = useModelSchema( state => state.schemaSource );
	const closeSchema = useModelSchema( state => state.closeSchema );
	const selectedModel = useModelSchema( state => state.selectedModel );
	const fieldIds = useModelSchema( state => state.fieldIds );
	const models = useModelSchema( state => state.models );
	const setModels = useModelSchema( state => state.setModels );

	const onSchemaSaved = updatedModel => {
		const dbColumns = updatedModel.db_columns || updatedModel.columns || {};
		const withDb = {
			...updatedModel,
			db_columns: dbColumns,
			column_names: updatedModel.column_names?.length
				? updatedModel.column_names
				: getColumnNames( dbColumns ),
		};
		const exists = models.some( model => model.name === withDb.name );
		setModels(
			exists
				? models.map( model => model.name === withDb.name ? { ...model, ...withDb } : model )
				: [ ...models, withDb ]
		);
	};

	if ( ! schemaOpen ) {
		return null;
	}

	// Custom table "Edit columns" can open before the sync effect writes schemaSource.
	const source = schemaSource || ( selectedModel ? 'model' : 'custom_table' );
	if ( source === 'model' && ! selectedModel ) {
		return null;
	}

	return (
		<SchemaModal
			source={ source }
			model={ selectedModel }
			fieldIds={ fieldIds }
			onClose={ closeSchema }
			onSaved={ onSchemaSaved }
		/>
	);
};

export default SchemaController;
