import { useEffect, useMemo } from '@wordpress/element';
import { useShallow } from 'zustand/react/shallow';
import { IGNORE_SCHEMA_FIELD_TYPES } from '../constants/schemaFieldTypes';
import { ensureArray } from '../functions';
import { getColumnNames } from '../utils/modelColumns';
import { fetcher } from './useFetch';
import useModelSchema from './useModelSchema';
import useRootFields from './useRootFields';
import useSettings from './useSettings';

const useModelSchemaSync = () => {
	const { settings, getObjectType, getSetting } = useSettings( useShallow( state => ( {
		settings: state.settings,
		getObjectType: state.getObjectType,
		getSetting: state.getSetting,
	} ) ) );
	const fields = useRootFields();
	const models = useModelSchema( state => state.models );
	const setModels = useModelSchema( state => state.setModels );
	const setMismatch = useModelSchema( state => state.setMismatch );

	const objectType = getObjectType();

	const fieldIds = useMemo(
		() => fields
			.filter( field => field.id && ! IGNORE_SCHEMA_FIELD_TYPES.includes( field.type ) )
			.map( field => field.id ),
		[ fields ]
	);

	const selectedModel = useMemo( () => {
		if ( objectType !== 'model' ) {
			return null;
		}

		return ensureArray( getSetting( 'models', [] ) )
			.map( name => models.find( model => model.name === name ) )
			.filter( Boolean )[ 0 ] || null;
	}, [ objectType, settings, models, getSetting ] );

	useEffect( () => {
		let cancelled = false;

		const loadTableColumns = async () => {
			if ( ! selectedModel?.name || ! selectedModel?.table ) {
				return;
			}

			try {
				const response = await fetcher( {
					api: 'custom-model/table-columns',
					params: {
						model: selectedModel.name,
						table: selectedModel.table,
					},
					method: 'GET',
					cache: false,
				} );

				if ( cancelled || ! response?.success ) {
					return;
				}

				const dbColumns = response.columns || {};
				const current = useModelSchema.getState().models;
				const existing = current.find( model => model.name === selectedModel.name );
				if (
					existing
					&& JSON.stringify( existing.db_columns || {} ) === JSON.stringify( dbColumns )
				) {
					return;
				}

				setModels( current.map( model => (
					model.name === selectedModel.name
						? { ...model, db_columns: dbColumns }
						: model
				) ) );
			} catch ( error ) {
				// Keep page-load columns when the table cannot be read.
			}
		};

		loadTableColumns();

		return () => {
			cancelled = true;
		};
	}, [ selectedModel?.name, selectedModel?.table, setModels ] );

	const missingFieldIds = useMemo( () => {
		if ( ! selectedModel ) {
			return [];
		}

		const hasDbColumns = Object.keys( selectedModel.db_columns || {} ).length > 0;
		const columnNames = getColumnNames(
			hasDbColumns ? selectedModel.db_columns : selectedModel.columns
		);

		return fieldIds.filter( id => ! columnNames.includes( id ) );
	}, [ selectedModel, fieldIds ] );

	useEffect( () => {
		setMismatch( {
			missingFieldIds,
			selectedModel,
			fieldIds,
		} );
	}, [ missingFieldIds, selectedModel, fieldIds, setMismatch ] );
};

export default useModelSchemaSync;
