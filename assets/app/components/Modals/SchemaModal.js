import { Button, Flex, Modal, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { parsedColumnsToEditor } from '../../constants/columnTypes';
import ColumnsEditor from '../../controls/ColumnsEditor';
import { maybeArrayToObject } from '../../functions';
import { fetcher } from '../../hooks/useFetch';
import useSettings from '../../hooks/useSettings';
import { resolveTableName, seedEditorColumns } from '../../utils/modelColumns';

const SchemaModal = ( { source, model, fieldIds, onClose, onSaved } ) => {
	const { getSetting, updateSetting } = useSettings();
	const isCustomTable = source === 'custom_table';
	const isCodeModel = ! isCustomTable && ! model?.post_id;
	const manageEnabled = !! getSetting( 'custom_table.enable', false );
	const customTable = getSetting( 'custom_table', {} );
	const customTableName = resolveTableName(
		customTable.name || '',
		!! customTable.prefix,
		MbbApp.tablePrefix || ''
	);
	const table = isCustomTable ? customTableName : ( model?.table || '' );

	const [ manage, setManage ] = useState( () => isCodeModel && manageEnabled );
	const [ columns, setColumns ] = useState( {} );
	const [ schemaColumnNames, setSchemaColumnNames ] = useState( [] );
	const [ saving, setSaving ] = useState( false );

	const readOnly = isCodeModel && ! manage;

	useEffect( () => {
		const storedColumns = maybeArrayToObject( customTable.columns || {}, 'id' );
		if ( isCustomTable || ( isCodeModel && manage && Object.keys( storedColumns ).length > 0 ) ) {
			setSchemaColumnNames(
				Object.values( storedColumns ).map( column => column.name ).filter( Boolean )
			);
			setColumns( seedEditorColumns( storedColumns, fieldIds ) );
			return;
		}

		const live = model?.db_columns || {};
		const schemaColumns = isCodeModel && Object.keys( live ).length ? live : ( model?.columns || {} );
		setSchemaColumnNames( Object.keys( schemaColumns ) );
		setColumns( seedEditorColumns(
			parsedColumnsToEditor( schemaColumns, model?.keys || [] ),
			fieldIds
		) );
	}, [ model, fieldIds, isCodeModel, isCustomTable, manage, customTable.columns ] );

	const applyManageSettings = () => {
		updateSetting( 'custom_table.enable', true );
		updateSetting( 'custom_table.create', true );
		updateSetting( 'custom_table.prefix', false );
		if ( model?.table ) {
			updateSetting( 'custom_table.name', model.table );
		}
	};

	const toggleManage = value => {
		if ( value ) {
			const confirmed = window.confirm(
				__( 'Edit the table columns here? If you use PHP to create this table, remove that code to avoid conflicts.', 'meta-box-builder' )
			);
			if ( ! confirmed ) {
				return;
			}
			setManage( true );
			applyManageSettings();
			return;
		}

		setManage( false );
		updateSetting( 'custom_table.enable', false );
	};

	const saveCustomTable = () => {
		updateSetting( 'custom_table.columns', columns );
		onClose();
	};

	const saveCodeModel = async () => {
		if ( ! table ) {
			alert( __( 'Could not resolve the model table.', 'meta-box-builder' ) );
			return;
		}

		const tableExists = Object.keys( model.db_columns || {} ).length > 0;
		if ( ! tableExists ) {
			const confirmed = window.confirm(
				sprintf(
					/* translators: %s: table name */
					__( 'Create table "%s" with the columns below?', 'meta-box-builder' ),
					table
				)
			);
			if ( ! confirmed ) {
				return;
			}
		}

		setSaving( true );
		try {
			const response = await fetcher( {
				api: 'custom-model/create-table',
				params: {
					table,
					model: model.name,
					columns,
				},
				method: 'POST',
				cache: false,
			} );

			if ( ! response.success ) {
				alert( response.message || __( 'Could not update the table schema.', 'meta-box-builder' ) );
				return;
			}

			applyManageSettings();
			updateSetting( 'custom_table.columns', columns );
			onSaved( {
				...model,
				columns: response.columns || {},
				db_columns: response.columns || {},
				keys: response.keys || [],
			} );
			onClose();
		} catch ( error ) {
			alert( error.message || __( 'Could not update the table schema.', 'meta-box-builder' ) );
		} finally {
			setSaving( false );
		}
	};

	const saveBuilderModel = async () => {
		setSaving( true );
		try {
			const response = await fetcher( {
				api: 'custom-model/columns',
				params: {
					post_id: model.post_id,
					columns,
				},
				method: 'POST',
				cache: false,
			} );

			if ( ! response.success ) {
				alert( response.message || __( 'Could not update the model schema.', 'meta-box-builder' ) );
				return;
			}

			onSaved( response.model );
			onClose();
		} catch ( error ) {
			alert( error.message || __( 'Could not update the model schema.', 'meta-box-builder' ) );
		} finally {
			setSaving( false );
		}
	};

	const save = async () => {
		if ( readOnly ) {
			return;
		}

		if ( isCustomTable ) {
			saveCustomTable();
			return;
		}

		if ( isCodeModel ) {
			await saveCodeModel();
			return;
		}

		await saveBuilderModel();
	};

	const modelLabel = model?.label || model?.name || '';
	const title = isCustomTable
		? sprintf(
			/* translators: %s: table name */
			__( 'Edit table schema: %s', 'meta-box-builder' ),
			table || customTable.name || ''
		)
		: readOnly
			? sprintf(
				/* translators: %s: model label */
				__( 'Table schema: %s', 'meta-box-builder' ),
				modelLabel
			)
			: sprintf(
				/* translators: %s: model label */
				__( 'Edit table schema: %s', 'meta-box-builder' ),
				modelLabel
			);

	const description = isCustomTable
		? __( 'Adjust column types and indexes before saving. Remove from schema keeps the column and its data in the database. Save the field group with Auto create table enabled to apply schema changes to the database.', 'meta-box-builder' )
		: readOnly
			? __( 'This model is registered in code, so the schema is read-only. Enable the option below to edit the table columns.', 'meta-box-builder' )
			: isCodeModel
				? __( 'Edit the columns below, then save the schema to create or update the table. Remove from schema keeps the column and its data in the database.', 'meta-box-builder' )
				: __( 'Adjust column types and indexes before saving. Remove from schema keeps the column and its data in the database.', 'meta-box-builder' );

	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			className={ `mb-schema-modal${ readOnly ? ' mb-schema-modal--read-only' : '' }` }
			size="large"
		>
			<p className="og-description">{ description }</p>
			{
				isCodeModel && (
					<div className="mb-schema-modal__options">
						<ToggleControl
							className="mb-schema-modal__manage"
							label={ __( 'Edit table columns', 'meta-box-builder' ) }
							checked={ manage }
							onChange={ toggleManage }
						/>
					</div>
				)
			}
			<ColumnsEditor
				label=""
				value={ columns }
				onChange={ setColumns }
				usedColumnNames={ fieldIds }
				existingColumnNames={ schemaColumnNames }
				model={ model?.name }
				table={ table }
				readOnly={ readOnly }
			/>
			{
				! readOnly && (
					<Flex justify="flex-end" gap={ 2 } className="mb-schema-modal__footer">
						<Button variant="tertiary" onClick={ onClose } disabled={ saving }>
							{ __( 'Cancel', 'meta-box-builder' ) }
						</Button>
						<Button variant="primary" onClick={ save } isBusy={ saving } disabled={ saving }>
							{ __( 'Save schema', 'meta-box-builder' ) }
						</Button>
					</Flex>
				)
			}
		</Modal>
	);
};

export default SchemaModal;
