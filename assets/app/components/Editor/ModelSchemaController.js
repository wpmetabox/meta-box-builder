import useModelSchemaSync from '../../hooks/useModelSchemaSync';
import useModelSchema from '../../hooks/useModelSchema';
import SchemaModal from '../Modals/SchemaModal';

const ModelSchemaController = () => {
	useModelSchemaSync();

	const schemaOpen = useModelSchema( state => state.schemaOpen );
	const closeSchema = useModelSchema( state => state.closeSchema );
	const selectedModel = useModelSchema( state => state.selectedModel );
	const fieldIds = useModelSchema( state => state.fieldIds );
	const models = useModelSchema( state => state.models );
	const setModels = useModelSchema( state => state.setModels );

	const onSchemaSaved = updatedModel => {
		const withDb = {
			...updatedModel,
			db_columns: updatedModel.db_columns || updatedModel.columns || {},
		};
		const exists = models.some( model => model.name === withDb.name );
		setModels(
			exists
				? models.map( model => model.name === withDb.name ? { ...model, ...withDb } : model )
				: [ ...models, withDb ]
		);
	};

	return schemaOpen && selectedModel && (
		<SchemaModal
			model={ selectedModel }
			fieldIds={ fieldIds }
			onClose={ closeSchema }
			onSaved={ onSchemaSaved }
		/>
	);
};

export default ModelSchemaController;
