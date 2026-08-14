import { Button, Flex, Modal } from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { DEFAULT_COLUMN_TYPE } from '../../constants/columnTypes';
import { IGNORE_SCHEMA_FIELD_TYPES } from '../../constants/schemaFieldTypes';
import ColumnsEditor from '../../controls/ColumnsEditor';
import { maybeArrayToObject, uniqid } from '../../functions';
import useRootFields from '../../hooks/useRootFields';
import useSettings from '../../hooks/useSettings';
import { resolveTableName, seedEditorColumns } from '../../utils/modelColumns';

const createColumnItem = ( overrides = {} ) => ( {
	id: uniqid(),
	name: '',
	type: DEFAULT_COLUMN_TYPE,
	custom_type: '',
	index: false,
	...overrides,
} );

const CustomTableSchemaModal = ( { onClose } ) => {
	const { getSetting, updateSetting, getPrefix } = useSettings();
	const fields = useRootFields();
	const setting = getSetting( 'custom_table', {} );
	const fieldPrefix = getPrefix() || '';
	const table = resolveTableName(
		setting.name || '',
		!! setting.prefix,
		MbbApp.tablePrefix || ''
	);

	const fieldIds = useMemo(
		() => fields
			.filter( field => field.id && ! IGNORE_SCHEMA_FIELD_TYPES.includes( field.type ) )
			.map( field => `${ fieldPrefix }${ field.id }` ),
		[ fields, fieldPrefix ]
	);

	const storedColumns = maybeArrayToObject( setting.columns || {}, 'id' );
	const [ columns, setColumns ] = useState( () => seedEditorColumns( storedColumns, fieldIds, createColumnItem ) );
	const [ schemaColumnNames ] = useState( () => Object.values( storedColumns ).map( column => column.name ).filter( Boolean ) );

	useEffect( () => {
		setColumns( current => seedEditorColumns( current, fieldIds, createColumnItem ) );
	}, [ fieldIds ] );

	const save = () => {
		updateSetting( 'custom_table.columns', columns );
		onClose();
	};

	return (
		<Modal
			title={
				sprintf(
					/* translators: %s: table name */
					__( 'Edit table schema: %s', 'meta-box-builder' ),
					table || setting.name || ''
				)
			}
			onRequestClose={ onClose }
			className="mb-schema-modal"
			size="large"
		>
			<p className="og-description">
				{ __( 'Adjust column types and indexes before saving. Remove from schema keeps the column in the database. Drop column permanently deletes it and its data. Save the field group with Auto create table enabled to apply schema changes to the database.', 'meta-box-builder' ) }
			</p>
			<ColumnsEditor
				label=""
				value={ columns }
				onChange={ setColumns }
				usedColumnNames={ fieldIds }
				existingColumnNames={ schemaColumnNames }
				table={ table }
				allowDrop={ !! table }
				dropByTable
			/>
			<Flex justify="flex-end" gap={ 2 } className="mb-schema-modal__footer">
				<Button variant="tertiary" onClick={ onClose }>
					{ __( 'Cancel', 'meta-box-builder' ) }
				</Button>
				<Button variant="primary" onClick={ save }>
					{ __( 'Save schema', 'meta-box-builder' ) }
				</Button>
			</Flex>
		</Modal>
	);
};

export default CustomTableSchemaModal;
