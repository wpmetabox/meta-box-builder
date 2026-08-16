import { Button, Tooltip } from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import {
	COLUMN_TYPE_GROUPS,
	CUSTOM_COLUMN_TYPE,
	DEFAULT_COLUMN_TYPE,
	createColumnItem,
	dbTypeToEditorColumn,
	isIndexableType,
	resolveColumnSqlType,
} from '../constants/columnTypes';
import { maybeArrayToObject } from '../functions';
import { fetcher } from '../hooks/useFetch';
import DivRow from './DivRow';

const stripSortableMeta = item => {
	const { chosen, selected, ...column } = item;
	return column;
};

const FIELD_STATUS = {
	matched: {
		id: 'matched',
		type: 'matched',
		icon: 'yes-alt',
		label: __( 'Field and column match', 'meta-box-builder' ),
		tooltip: __( 'A field in this group uses this name, and the model table schema already includes this column.', 'meta-box-builder' ),
	},
	missing: {
		id: 'missing',
		type: 'missing',
		icon: 'plus-alt2',
		label: __( 'Field exists, column missing', 'meta-box-builder' ),
		tooltip: __( 'A field in this group uses this name, but the column is not in the schema yet. Save schema to add it.', 'meta-box-builder' ),
	},
	'missing-code': {
		id: 'missing-code',
		type: 'missing',
		icon: 'plus-alt2',
		label: __( 'Field exists, column missing', 'meta-box-builder' ),
		tooltip: __( 'A field in this group uses this name, but the table has no matching column. Change the field ID, or add the column in the PHP that registers this model.', 'meta-box-builder' ),
	},
	'no-field': {
		id: 'no-field',
		type: 'no-field',
		icon: 'editor-unlink',
		label: __( 'Column exists, field missing', 'meta-box-builder' ),
		tooltip: __( 'This column is in the model table schema, but this field group has no field with this ID.', 'meta-box-builder' ),
	},
};

const getFieldStatus = ( name, fieldIds, existingColumnNames, readOnly ) => {
	if ( ! name ) {
		return null;
	}

	const inFields = fieldIds.includes( name );
	const inSchema = existingColumnNames.includes( name );

	if ( inFields && inSchema ) {
		return FIELD_STATUS.matched;
	}
	if ( inFields ) {
		return readOnly ? FIELD_STATUS[ 'missing-code' ] : FIELD_STATUS.missing;
	}
	if ( inSchema ) {
		return FIELD_STATUS[ 'no-field' ];
	}

	return null;
};

const StatusIcon = ( { type, icon } ) => (
	<span
		className={ `mb-columns-editor__status-icon mb-columns-editor__status-icon--${ type } dashicons dashicons-${ icon }` }
		aria-hidden="true"
	/>
);

const ColumnStatus = ( { status } ) => status && (
	<Tooltip text={ status.tooltip } delay={ 0 } placement="top">
		<span className="mb-columns-editor__status-indicator" aria-label={ status.label }>
			<StatusIcon type={ status.type } icon={ status.icon } />
		</span>
	</Tooltip>
);

const ACTION_TOOLTIPS = {
	remove: __( 'Remove from the schema.', 'meta-box-builder' ),
	addToSchema: __( 'Add this column to the schema.', 'meta-box-builder' ),
};

const ActionButton = ( { icon, label, onClick, isDestructive = false, disabled = false } ) => (
	<Tooltip text={ label } delay={ 0 } placement="top">
		<button
			type="button"
			className={ `mb-columns-editor__action-btn${ isDestructive ? ' mb-columns-editor__action-btn--destructive' : '' }` }
			onClick={ onClick }
			disabled={ disabled }
			aria-label={ label }
		>
			<span className={ `dashicons dashicons-${ icon }` } aria-hidden="true" />
		</button>
	</Tooltip>
);

const ColumnTypeSelect = ( { item, updateItem } ) => (
	<>
		<select
			value={ item.type || DEFAULT_COLUMN_TYPE }
			onChange={ e => updateItem( item.id, 'type', e.target.value ) }
		>
			{
				COLUMN_TYPE_GROUPS.map( group => (
					<optgroup key={ group.label } label={ group.label }>
						{
							Object.entries( group.options ).map( ( [ typeValue, typeLabel ] ) => (
								<option key={ typeValue } value={ typeValue }>{ typeLabel }</option>
							) )
						}
					</optgroup>
				) )
			}
			<option value={ CUSTOM_COLUMN_TYPE }>{ __( 'Custom…', 'meta-box-builder' ) }</option>
		</select>
		{
			CUSTOM_COLUMN_TYPE === item.type && (
				<input
					type="text"
					placeholder={ __( 'e.g. ENUM(\'a\',\'b\')', 'meta-box-builder' ) }
					value={ item.custom_type || '' }
					onChange={ e => updateItem( item.id, 'custom_type', e.target.value ) }
				/>
			)
		}
	</>
);

const SchemaRow = ( {
	item,
	readOnly,
	showFieldContext,
	usedColumnNames,
	existingColumnNames,
	updateItem,
	removeFromSchema,
} ) => {
	const sqlType = resolveColumnSqlType( item );
	const canIndex = isIndexableType( sqlType );
	const status = showFieldContext
		? getFieldStatus( item.name, usedColumnNames, existingColumnNames, readOnly )
		: null;
	const typeLabel = item.db_type || ( existingColumnNames.includes( item.name ) ? sqlType : '—' );

	return (
		<tr>
			{
				! readOnly && (
					<td className="mb-columns-editor__reorder">
						<span
							className="mb-columns-editor__handle dashicons dashicons-menu"
							title={ __( 'Drag to reorder', 'meta-box-builder' ) }
							aria-label={ __( 'Drag to reorder', 'meta-box-builder' ) }
						/>
					</td>
				)
			}
			<td className="mb-columns-editor__name">
				{
					readOnly
						? item.name
						: (
							<input
								type="text"
								placeholder={ __( 'column_name', 'meta-box-builder' ) }
								value={ item.name || '' }
								onChange={ e => updateItem( item.id, 'name', e.target.value ) }
							/>
						)
				}
			</td>
			<td className="mb-columns-editor__type">
				{ readOnly ? typeLabel : <ColumnTypeSelect item={ item } updateItem={ updateItem } /> }
			</td>
			<td className="mb-columns-editor__index">
				<input
					type="checkbox"
					checked={ !! item.index && canIndex }
					disabled={ readOnly || ! canIndex }
					onChange={ e => updateItem( item.id, 'index', e.target.checked ) }
				/>
			</td>
			{ showFieldContext && <td className="mb-columns-editor__status"><ColumnStatus status={ status } /></td> }
			{
				! readOnly && (
					<td className="mb-columns-editor__action">
						<ActionButton
							icon="remove"
							label={ ACTION_TOOLTIPS.remove }
							isDestructive
							onClick={ () => removeFromSchema( item.id, item.name ) }
						/>
					</td>
				)
			}
		</tr>
	);
};

const OrphanRow = ( { item, onAdd } ) => (
	<tr>
		<td className="mb-columns-editor__name">{ item.name }</td>
		<td className="mb-columns-editor__type">{ item.db_type }</td>
		<td className="mb-columns-editor__index">
			<input type="checkbox" checked={ false } disabled />
		</td>
		<td className="mb-columns-editor__action">
			<ActionButton
				icon="plus-alt2"
				label={ ACTION_TOOLTIPS.addToSchema }
				onClick={ () => onAdd( item ) }
			/>
		</td>
	</tr>
);

const ColumnsEditor = ( {
	name = 'columns',
	label = __( 'Columns', 'meta-box-builder' ),
	defaultValue,
	value,
	updateField,
	onChange,
	usedColumnNames = [],
	existingColumnNames = [],
	model = '',
	table = '',
	readOnly = false,
} ) => {
	const isControlled = value !== undefined;
	const [ localItems, setLocalItems ] = useState( () => maybeArrayToObject( defaultValue, 'id' ) );
	const [ dbColumns, setDbColumns ] = useState( {} );

	const items = isControlled ? maybeArrayToObject( value, 'id' ) : localItems;
	const showFieldContext = usedColumnNames.length > 0;
	const showDbSync = ! readOnly && !! table;
	const schemaColumns = Object.values( items );

	useEffect( () => {
		if ( ! showDbSync ) {
			return;
		}

		let cancelled = false;

		fetcher( {
			api: 'custom-model/table-columns',
			params: { model, table },
			method: 'GET',
			cache: false,
		} ).then( response => {
			if ( ! cancelled && response.success ) {
				setDbColumns( response.columns || {} );
			}
		} ).catch( () => {
			// Table may not exist yet.
		} );

		return () => {
			cancelled = true;
		};
	}, [ model, table, showDbSync ] );

	const orphanColumns = useMemo( () => {
		if ( ! showDbSync ) {
			return [];
		}

		const schemaNames = new Set( schemaColumns.map( column => column.name ).filter( Boolean ) );

		return Object.entries( dbColumns )
			.filter( ( [ columnName ] ) => ! schemaNames.has( columnName ) )
			.map( ( [ columnName, sqlType ] ) => ( {
				name: columnName,
				...dbTypeToEditorColumn( sqlType ),
				db_type: sqlType,
			} ) );
	}, [ dbColumns, schemaColumns, showDbSync ] );

	const commit = next => {
		if ( ! isControlled ) {
			setLocalItems( next );
		}
		if ( onChange ) {
			onChange( next );
			return;
		}
		if ( updateField ) {
			updateField( name, next );
		}
	};

	const addColumn = () => {
		const column = createColumnItem();
		commit( { ...items, [ column.id ]: column } );
	};

	const removeFromSchema = ( id, columnName ) => {
		const hasName = !! ( columnName || '' ).trim();
		if ( hasName && ! window.confirm(
			sprintf(
				/* translators: %s: column name */
				__( 'Do you really want to remove "%s" from the schema?', 'meta-box-builder' ),
				columnName
			)
		) ) {
			return;
		}

		const next = { ...items };
		delete next[ id ];
		commit( next );
	};

	const addToSchema = item => {
		const column = createColumnItem( {
			name: item.name,
			type: item.type || DEFAULT_COLUMN_TYPE,
			custom_type: item.custom_type || '',
		} );
		commit( { ...items, [ column.id ]: column } );
	};

	const reorder = list => {
		commit( Object.fromEntries(
			list
				.filter( item => item?.id )
				.map( item => [ item.id, stripSortableMeta( item ) ] )
		) );
	};

	const updateItem = ( id, prop, propValue ) => {
		const nextItem = {
			...( items[ id ] || {} ),
			id,
			[ prop ]: propValue,
		};

		const sqlType = CUSTOM_COLUMN_TYPE === nextItem.type
			? ( nextItem.custom_type || DEFAULT_COLUMN_TYPE )
			: nextItem.type;

		if ( [ 'type', 'custom_type' ].includes( prop ) && ! isIndexableType( sqlType ) ) {
			nextItem.index = false;
		}

		commit( {
			...items,
			[ id ]: nextItem,
		} );
	};

	const rowProps = {
		showFieldContext,
		usedColumnNames,
		existingColumnNames,
		updateItem,
		removeFromSchema,
	};

	const legendItems = showFieldContext
		? [
			FIELD_STATUS.matched,
			readOnly ? FIELD_STATUS[ 'missing-code' ] : FIELD_STATUS.missing,
			FIELD_STATUS[ 'no-field' ],
		]
		: [];

	const tableClassName = [
		'mb-columns-editor__table',
		showFieldContext ? 'mb-columns-editor__table--with-status' : '',
		readOnly ? 'mb-columns-editor__table--read-only' : '',
	].filter( Boolean ).join( ' ' );

	const rows = schemaColumns.map( item => (
		<SchemaRow key={ item.id } item={ item } readOnly={ readOnly } { ...rowProps } />
	) );

	return (
		<DivRow label={ label } className="mb-columns-editor">
			{
				schemaColumns.length > 0 && (
					<table className={ tableClassName }>
						<thead>
							<tr>
								{ ! readOnly && <th className="mb-columns-editor__reorder" aria-hidden="true" /> }
								<th className="mb-columns-editor__name">{ __( 'Name', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__type">{ __( 'Type', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__index">{ __( 'Index', 'meta-box-builder' ) }</th>
								{ showFieldContext && <th className="mb-columns-editor__status">{ __( 'Status', 'meta-box-builder' ) }</th> }
								{ ! readOnly && <th className="mb-columns-editor__action">{ __( 'Action', 'meta-box-builder' ) }</th> }
							</tr>
						</thead>
						{
							readOnly
								? <tbody>{ rows }</tbody>
								: (
									<ReactSortable
										tag="tbody"
										list={ schemaColumns }
										setList={ reorder }
										handle=".mb-columns-editor__handle"
										animation={ 200 }
									>
										{ rows }
									</ReactSortable>
								)
						}
					</table>
				)
			}
			{ ! readOnly && <Button className="mb-columns-editor__add" variant="secondary" onClick={ addColumn } text={ __( '+ Add column', 'meta-box-builder' ) } /> }
			{
				showDbSync && orphanColumns.length > 0 && (
					<div className="mb-columns-editor__db-section">
						<p className="mb-columns-editor__db-heading">
							{ __( 'Columns in database only', 'meta-box-builder' ) }
						</p>
						<p className="mb-columns-editor__db-description">
							{ __( 'These columns exist in the database but are not in the schema. Add them to the schema if you still use them.', 'meta-box-builder' ) }
						</p>
						<table className="mb-columns-editor__table mb-columns-editor__table--db-only">
							<thead>
								<tr>
									<th className="mb-columns-editor__name">{ __( 'Name', 'meta-box-builder' ) }</th>
									<th className="mb-columns-editor__type">{ __( 'Type', 'meta-box-builder' ) }</th>
									<th className="mb-columns-editor__index">{ __( 'Index', 'meta-box-builder' ) }</th>
									<th className="mb-columns-editor__action">{ __( 'Action', 'meta-box-builder' ) }</th>
								</tr>
							</thead>
							<tbody>
								{
									orphanColumns.map( item => (
										<OrphanRow
											key={ item.name }
											item={ item }
											onAdd={ addToSchema }
										/>
									) )
								}
							</tbody>
						</table>
					</div>
				)
			}
			{
				legendItems.length > 0 && (
					<ul className="mb-columns-editor__status-legend">
						{
							legendItems.map( item => (
								<li key={ item.id }>
									<Tooltip text={ item.tooltip } delay={ 0 } placement="top">
										<span className="mb-columns-editor__status-legend-item">
											<StatusIcon type={ item.type } icon={ item.icon } />
											{ item.label }
										</span>
									</Tooltip>
								</li>
							) )
						}
					</ul>
				)
			}
		</DivRow>
	);
};

export default ColumnsEditor;
