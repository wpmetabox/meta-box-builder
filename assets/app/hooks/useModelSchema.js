import { create } from 'zustand';

const useModelSchema = create( set => ( {
	missingFieldIds: [],
	selectedModel: null,
	fieldIds: [],
	models: MbbApp.models || [],
	schemaSource: null, // 'model' | 'custom_table' | null
	customTableDbColumns: {},
	schemaOpen: false,
	customTableSchemaOpen: false,

	setModels: models => {
		MbbApp.models = models;
		set( { models } );
	},

	setCustomTableDbColumns: customTableDbColumns => set( { customTableDbColumns } ),

	setMismatch: ( { missingFieldIds, selectedModel, fieldIds, schemaSource } ) => set( {
		missingFieldIds,
		selectedModel,
		fieldIds,
		schemaSource: schemaSource || null,
	} ),

	openSchema: () => set( state => (
		state.schemaSource === 'custom_table'
			? { customTableSchemaOpen: true }
			: { schemaOpen: true }
	) ),
	closeSchema: () => set( { schemaOpen: false } ),
	openCustomTableSchema: () => set( { customTableSchemaOpen: true } ),
	closeCustomTableSchema: () => set( { customTableSchemaOpen: false } ),
} ) );

export default useModelSchema;
