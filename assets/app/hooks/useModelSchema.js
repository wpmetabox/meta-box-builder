import { create } from 'zustand';

const useModelSchema = create( set => ( {
	missingFieldIds: [],
	selectedModel: null,
	fieldIds: [],
	models: MbbApp.models || [],
	schemaOpen: false,

	setModels: models => {
		MbbApp.models = models;
		set( { models } );
	},

	setMismatch: ( { missingFieldIds, selectedModel, fieldIds } ) => set( {
		missingFieldIds,
		selectedModel,
		fieldIds,
	} ),

	openSchema: () => set( { schemaOpen: true } ),
	closeSchema: () => set( { schemaOpen: false } ),
} ) );

export default useModelSchema;
