import { Button, Flex, Modal, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { DEFAULT_COLUMN_TYPE, parsedColumnsToEditor } from '../../constants/columnTypes';
import ColumnsEditor from '../../controls/ColumnsEditor';
import { maybeArrayToObject, uniqid } from '../../functions';
import { fetcher } from '../../hooks/useFetch';
import useSettings from '../../hooks/useSettings';
import { seedEditorColumns } from '../../utils/modelColumns';

const createColumnItem = ( overrides = {} ) => ( {
	id: uniqid(),
	name: '',
	type: DEFAULT_COLUMN_TYPE,
	custom_type: '',
	index: false,
	...overrides,
} );

const buildColumns = ( schemaColumns, schemaKeys, fieldIds ) => {
	const existing = parsedColumnsToEditor( schemaColumns || {}, schemaKeys || [] );
	return seedEditorColumns( existing, fieldIds, createColumnItem );
};

const SchemaModal = ( { model, fieldIds, onClose, onSaved } ) => {
	const { getSetting, updateSetting } = useSettings();
	const isCodeModel = ! model.post_id;
	const manageEnabled = !! getSetting( 'custom_table.enable', false );

	const [ manage, setManage ] = useState( () => isCodeModel && manageEnabled );
	const [ columns, setColumns ] = useState( {} );
	const [ schemaColumnNames, setSchemaColumnNames ] = useState( () => Object.keys( model.columns || {} ) );
	const [ saving, setSaving ] = useState( false );
	const [ loading, setLoading ] = useState( false );

	const readOnly = isCodeModel && ! manage;

	useEffect( () => {
		let cancelled = false;

		const load = async () => {
			let schemaColumns = model.columns || {};
			let schemaKeys = model.keys || [];
			const storedColumns = maybeArrayToObject( getSetting( 'custom_table.columns', {} ), 'id' );

			if ( isCodeModel && manage && Object.keys( storedColumns ).length > 0 ) {
				if ( cancelled ) {
					return;
				}
				setSchemaColumnNames(
					Object.values( storedColumns ).map( column => column.name ).filter( Boolean )
				);
				setColumns( seedEditorColumns( storedColumns, fieldIds, createColumnItem ) );
				return;
			}

			if ( isCodeModel && model.name ) {
				setLoading( true );
				try {
					const response = await fetcher( {
						api: 'custom-model/table-columns',
						params: {
							model: model.name,
							table: model.table,
						},
						method: 'GET',
						cache: false,
					} );
					if ( response.success ) {
						schemaColumns = response.columns || {};
						schemaKeys = response.keys || [];
					}
				} catch ( error ) {
					// Keep whatever schema we already have from page load.
				} finally {
					if ( ! cancelled ) {
						setLoading( false );
					}
				}
			}

			if ( cancelled ) {
				return;
			}

			setSchemaColumnNames( Object.keys( schemaColumns ) );
			setColumns( buildColumns( schemaColumns, schemaKeys, fieldIds ) );
		};

		load();

		return () => {
			cancelled = true;
		};
	}, [ model, fieldIds, isCodeModel, manage, getSetting ] );

	const applyManageSettings = () => {
		updateSetting( 'custom_table.enable', true );
		updateSetting( 'custom_table.create', true );
		updateSetting( 'custom_table.prefix', false );
		if ( model.table ) {
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

	const save = async () => {
		if ( readOnly ) {
			return;
		}

		if ( isCodeModel ) {
			const table = model.table || '';
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
			return;
		}

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

	const title = readOnly
		? sprintf(
			/* translators: %s: model label */
			__( 'Table schema: %s', 'meta-box-builder' ),
			model.label || model.name
		)
		: sprintf(
			/* translators: %s: model label */
			__( 'Edit table schema: %s', 'meta-box-builder' ),
			model.label || model.name
		);

	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			className={ `mb-schema-modal${ readOnly ? ' mb-schema-modal--read-only' : '' }` }
			size="large"
		>
			<p className="og-description">
				{
					readOnly
						? __( 'This model is registered in code, so the schema is read-only. Enable the option below to edit the table columns.', 'meta-box-builder' )
						: isCodeModel
							? __( 'Edit the columns below, then save the schema to create or update the table. Drop column permanently deletes the column and its data.', 'meta-box-builder' )
							: __( 'Adjust column types and indexes before saving. Remove from schema keeps the column in the database. Drop column permanently deletes it and its data.', 'meta-box-builder' )
				}
			</p>
			{
				isCodeModel && (
					<ToggleControl
						className="mb-schema-modal__manage"
						label={ __( 'Edit table columns', 'meta-box-builder' ) }
						checked={ manage }
						onChange={ toggleManage }
					/>
				)
			}
			{
				loading
					? <p className="og-description">{ __( 'Loading columns…', 'meta-box-builder' ) }</p>
					: (
						<ColumnsEditor
							label=""
							value={ columns }
							onChange={ setColumns }
							usedColumnNames={ fieldIds }
							existingColumnNames={ schemaColumnNames }
							model={ model.name }
							table={ model.table }
							postId={ model.post_id }
							readOnly={ readOnly }
							allowDrop={ ! readOnly && !! model.table }
							dropByTable={ isCodeModel }
						/>
					)
			}
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
