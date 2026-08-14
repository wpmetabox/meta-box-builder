import { create } from 'zustand';

const useModelSchema = create( set => ( {
	missingFieldIds: [],
	selectedModel: null,
	fieldIds: [],
	models: MbbApp.models || [],
	schemaSource: null, // 'model' | 'custom_table' | null
	customTableDbColumns: {},
	schemaOpen: false,

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

	openSchema: () => set( { schemaOpen: true } ),
	closeSchema: () => set( { schemaOpen: false } ),
} ) );

export default useModelSchema;
