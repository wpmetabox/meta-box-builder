import { Button, Flex, Modal } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { DEFAULT_COLUMN_TYPE, parsedColumnsToEditor } from '../../constants/columnTypes';
import ColumnsEditor from '../../controls/ColumnsEditor';
import { uniqid } from '../../functions';
import { fetcher } from '../../hooks/useFetch';

const IGNORE_FIELD_TYPES = [ 'heading', 'divider', 'button', 'custom_html', 'tab' ];

const SchemaModal = ( { model, fieldIds, onClose, onSaved } ) => {
	const [ columns, setColumns ] = useState( {} );
	const [ saving, setSaving ] = useState( false );

	useEffect( () => {
		const existing = parsedColumnsToEditor( model.columns || {}, model.keys || [] );
		const next = { ...existing };
		const existingNames = new Set( Object.values( next ).map( col => col.name ) );

		fieldIds.forEach( id => {
			if ( existingNames.has( id ) ) {
				return;
			}
			const itemId = uniqid();
			next[ itemId ] = {
				id: itemId,
				name: id,
				type: DEFAULT_COLUMN_TYPE,
				custom_type: '',
				index: false,
			};
		} );

		setColumns( next );
	}, [ model, fieldIds ] );

	const save = async () => {
		if ( ! model.post_id ) {
			alert( __( 'Cannot update this model because its post ID is missing. Please re-save the custom model first.', 'meta-box-builder' ) );
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

	return (
		<Modal
			title={ sprintf(
				/* translators: %s: model label */
				__( 'Edit table schema: %s', 'meta-box-builder' ),
				model.label || model.name
			) }
			onRequestClose={ onClose }
			className="mb-schema-modal"
			size="large"
		>
			<p className="og-description">
				{ __( 'Adjust column types and indexes before saving. Remove from schema keeps the column in the database. Drop column permanently deletes it and its data.', 'meta-box-builder' ) }
			</p>
			<ColumnsEditor
				value={ columns }
				onChange={ setColumns }
				usedColumnNames={ fieldIds }
				existingColumnNames={ Object.keys( model.columns || {} ) }
				postId={ model.post_id }
			/>
			<Flex justify="flex-end" gap={ 2 } className="mb-schema-modal__footer">
				<Button variant="tertiary" onClick={ onClose } disabled={ saving }>
					{ __( 'Cancel', 'meta-box-builder' ) }
				</Button>
				<Button variant="primary" onClick={ save } isBusy={ saving } disabled={ saving }>
					{ __( 'Save schema', 'meta-box-builder' ) }
				</Button>
			</Flex>
		</Modal>
	);
};

export { IGNORE_FIELD_TYPES };
export default SchemaModal;
