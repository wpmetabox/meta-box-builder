import { Button, Flex, Modal } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { DEFAULT_COLUMN_TYPE, parsedColumnsToEditor } from '../../constants/columnTypes';
import ColumnsEditor from '../../controls/ColumnsEditor';
import { uniqid } from '../../functions';
import { fetcher } from '../../hooks/useFetch';

const buildColumns = ( schemaColumns, schemaKeys, fieldIds ) => {
	const existing = parsedColumnsToEditor( schemaColumns || {}, schemaKeys || [] );
	const existingNames = new Set( Object.values( existing ).map( col => col.name ) );
	const missing = Object.fromEntries(
		fieldIds
			.filter( id => ! existingNames.has( id ) )
			.map( id => {
				const itemId = uniqid();
				return [ itemId, {
					id: itemId,
					name: id,
					type: DEFAULT_COLUMN_TYPE,
					custom_type: '',
					index: false,
				} ];
			} )
	);

	return { ...existing, ...missing };
};

const SchemaModal = ( { model, fieldIds, onClose, onSaved } ) => {
	const [ columns, setColumns ] = useState( {} );
	const [ schemaColumnNames, setSchemaColumnNames ] = useState( () => Object.keys( model.columns || {} ) );
	const [ saving, setSaving ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	const readOnly = ! model.post_id;

	useEffect( () => {
		let cancelled = false;

		const load = async () => {
			let schemaColumns = model.columns || {};
			let schemaKeys = model.keys || [];

			// Code-registered models: always refresh from the live DB table.
			if ( readOnly && model.name ) {
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
	}, [ model, fieldIds, readOnly ] );

	const save = async () => {
		if ( readOnly ) {
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
						? __( 'This model is registered in code, so the schema is read-only here. Change field IDs to match columns, or update the table in PHP.', 'meta-box-builder' )
						: __( 'Adjust column types and indexes before saving. Remove from schema keeps the column in the database. Drop column permanently deletes it and its data.', 'meta-box-builder' )
				}
			</p>
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
