import { useEffect, useMemo } from '@wordpress/element';
import { useShallow } from 'zustand/react/shallow';
import { IGNORE_SCHEMA_FIELD_TYPES } from '../constants/schemaFieldTypes';
import { ensureArray } from '../functions';
import { getMissingColumnIds, resolveTableName } from '../utils/modelColumns';
import { fetcher } from './useFetch';
import useModelSchema from './useModelSchema';
import useRootFields from './useRootFields';
import useSettings from './useSettings';

const useModelSchemaSync = () => {
	const { settings, getObjectType, getSetting, getPrefix } = useSettings( useShallow( state => ( {
		settings: state.settings,
		getObjectType: state.getObjectType,
		getSetting: state.getSetting,
		getPrefix: state.getPrefix,
	} ) ) );
	const fields = useRootFields();
	const models = useModelSchema( state => state.models );
	const setModels = useModelSchema( state => state.setModels );
	const customTableDbColumns = useModelSchema( state => state.customTableDbColumns );
	const setCustomTableDbColumns = useModelSchema( state => state.setCustomTableDbColumns );
	const setMismatch = useModelSchema( state => state.setMismatch );

	const objectType = getObjectType();
	const fieldPrefix = getPrefix() || '';
	const customTable = getSetting( 'custom_table', {} );
	const customTableEnabled = objectType !== 'model'
		&& !! customTable.enable
		&& !! ( customTable.name || '' ).trim();
	const manageCodeModelTable = objectType === 'model' && !! customTable.enable;
	const customTableName = resolveTableName(
		customTable.name || '',
		!! customTable.prefix,
		MbbApp.tablePrefix || ''
	);

	const fieldIds = useMemo(
		() => {
			const ids = fields
				.filter( field => field.id && ! IGNORE_SCHEMA_FIELD_TYPES.includes( field.type ) )
				.map( field => field.id );

			if ( customTableEnabled ) {
				return ids.map( id => `${ fieldPrefix }${ id }` );
			}

			return ids;
		},
		[ fields, customTableEnabled, fieldPrefix ]
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
				const keys = response.keys || [];
				const current = useModelSchema.getState().models;

				setModels( current.map( model => {
					if ( model.name !== selectedModel.name ) {
						return model;
					}

					const next = { ...model, db_columns: dbColumns };
					if ( ! model.post_id ) {
						next.keys = keys;
					}
					return next;
				} ) );
			} catch ( error ) {
				// Keep page-load columns when the table cannot be read.
			}
		};

		loadTableColumns();

		return () => {
			cancelled = true;
		};
	}, [ selectedModel?.name, selectedModel?.table, setModels ] );

	useEffect( () => {
		if ( ! customTableEnabled || ! customTableName ) {
			setCustomTableDbColumns( {} );
			return;
		}

		let cancelled = false;
		const timer = setTimeout( async () => {
			try {
				const response = await fetcher( {
					api: 'custom-model/table-columns',
					params: { table: customTableName },
					method: 'GET',
					cache: false,
				} );

				if ( cancelled || ! response?.success ) {
					return;
				}

				setCustomTableDbColumns( response.columns || {} );
			} catch ( error ) {
				if ( ! cancelled ) {
					setCustomTableDbColumns( {} );
				}
			}
		}, 400 );

		return () => {
			cancelled = true;
			clearTimeout( timer );
		};
	}, [ customTableEnabled, customTableName, setCustomTableDbColumns ] );

	const missingFieldIds = useMemo( () => {
		if ( selectedModel ) {
			const editorColumns = manageCodeModelTable
				? ( customTable.columns || {} )
				: selectedModel.columns;
			return getMissingColumnIds( fieldIds, selectedModel.db_columns, editorColumns );
		}

		if ( customTableEnabled ) {
			return getMissingColumnIds( fieldIds, customTableDbColumns, customTable.columns || {} );
		}

		return [];
	}, [
		selectedModel,
		manageCodeModelTable,
		customTableEnabled,
		customTable.columns,
		customTableDbColumns,
		fieldIds,
	] );

	const schemaSource = selectedModel ? 'model' : ( customTableEnabled ? 'custom_table' : null );

	useEffect( () => {
		setMismatch( {
			missingFieldIds,
			selectedModel,
			fieldIds,
			schemaSource,
		} );
	}, [ missingFieldIds, selectedModel, fieldIds, schemaSource, setMismatch ] );
};

export default useModelSchemaSync;
