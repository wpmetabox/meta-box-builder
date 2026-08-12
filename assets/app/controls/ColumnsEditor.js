import { Button, Tooltip } from '@wordpress/components';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import {
	COLUMN_TYPE_GROUPS,
	CUSTOM_COLUMN_TYPE,
	DEFAULT_COLUMN_TYPE,
	dbTypeToEditorColumn,
	isIndexableType,
	resolveColumnSqlType,
} from '../constants/columnTypes';
import { maybeArrayToObject, uniqid } from '../functions';
import { fetcher } from '../hooks/useFetch';
import DivRow from './DivRow';

const stripSortableMeta = item => {
	const { chosen, selected, ...column } = item;
	return column;
};

const FIELD_STATUS = {
	matched: {
		type: 'matched',
		icon: 'yes-alt',
		label: __( 'Field and column match', 'meta-box-builder' ),
		tooltip: __( 'A field in this group uses this name, and the model table schema already includes this column.', 'meta-box-builder' ),
	},
	missing: {
		type: 'missing',
		icon: 'plus-alt2',
		label: __( 'Field exists, column missing', 'meta-box-builder' ),
		tooltip: __( 'A field in this group uses this name, but the column is not in the schema yet. Save schema to add it.', 'meta-box-builder' ),
	},
	'no-field': {
		type: 'no-field',
		icon: 'editor-unlink',
		label: __( 'Column exists, field missing', 'meta-box-builder' ),
		tooltip: __( 'This column is in the model table schema, but this field group has no field with this ID.', 'meta-box-builder' ),
	},
};

const FIELD_STATUS_LEGEND = [
	FIELD_STATUS.matched,
	FIELD_STATUS.missing,
	FIELD_STATUS[ 'no-field' ],
];

const getFieldStatus = ( name, fieldIds, existingColumnNames ) => {
	if ( ! name ) {
		return null;
	}

	const inFields = fieldIds.includes( name );
	const inSchema = existingColumnNames.includes( name );

	if ( inFields && inSchema ) {
		return FIELD_STATUS.matched;
	}

	if ( inFields ) {
		return FIELD_STATUS.missing;
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

const ColumnStatus = ( { status } ) => {
	if ( ! status ) {
		return null;
	}

	return (
		<Tooltip text={ status.tooltip } delay={ 0 } placement="top">
			<span className="mb-columns-editor__status-indicator" aria-label={ status.label }>
				<StatusIcon type={ status.type } icon={ status.icon } />
			</span>
		</Tooltip>
	);
};

const ACTION_TOOLTIPS = {
	removeFromSchema: __( 'Remove from the schema but keep data in the database.', 'meta-box-builder' ),
	dropColumn: __( 'Permanently drop this column from the database.', 'meta-box-builder' ),
	addToSchema: __( 'Add this column to the schema.', 'meta-box-builder' ),
};

const ActionButton = ( { icon, label, onClick, isDestructive = false, disabled = false, isBusy = false } ) => (
	<Tooltip text={ label } delay={ 0 } placement="top">
		<button
			type="button"
			className={ `mb-columns-editor__action-btn${ isDestructive ? ' mb-columns-editor__action-btn--destructive' : '' }` }
			onClick={ onClick }
			disabled={ disabled || isBusy }
			aria-label={ label }
			aria-busy={ isBusy }
		>
			<span className={ `dashicons dashicons-${ icon }` } aria-hidden="true" />
		</button>
	</Tooltip>
);

const ColumnActions = ( { columnName, inDb, isDropping, onRemove, onDrop } ) => (
	<div className="mb-columns-editor__actions">
		<ActionButton
			icon="remove"
			label={ ACTION_TOOLTIPS.removeFromSchema }
			isDestructive
			onClick={ onRemove }
		/>
		{
			inDb && (
				<ActionButton
					icon="trash"
					label={ ACTION_TOOLTIPS.dropColumn }
					isDestructive
					disabled={ isDropping }
					isBusy={ isDropping }
					onClick={ () => onDrop( columnName ) }
				/>
			)
		}
	</div>
);

const ColumnsEditor = ( {
	name = 'columns',
	defaultValue,
	value,
	updateField,
	onChange,
	label = __( 'Columns', 'meta-box-builder' ),
	description = '',
	usedColumnNames = [],
	existingColumnNames = [],
	postId = 0,
} ) => {
	const isControlled = value !== undefined;
	const [ localItems, setLocalItems ] = useState( () => maybeArrayToObject( defaultValue, 'id' ) );
	const [ dbColumns, setDbColumns ] = useState( {} );
	const [ dropping, setDropping ] = useState( '' );

	const items = maybeArrayToObject( isControlled ? value : localItems, 'id' );
	const showFieldContext = usedColumnNames.length > 0;
	const showDbSync = postId > 0;

	const dbColumnNames = useMemo(
		() => new Set( Object.keys( dbColumns ) ),
		[ dbColumns ]
	);

	const loadDbColumns = useCallback( async () => {
		if ( ! showDbSync ) {
			return;
		}

		try {
			const response = await fetcher( {
				api: 'custom-model/table-columns',
				params: { post_id: postId },
				method: 'GET',
				cache: false,
			} );

			if ( response.success ) {
				setDbColumns( response.columns || {} );
			}
		} catch ( error ) {
			// Table may not exist yet.
		}
	}, [ postId, showDbSync ] );

	useEffect( () => {
		loadDbColumns();
	}, [ loadDbColumns ] );

	const schemaColumns = useMemo( () => Object.values( items ), [ items ] );

	const orphanColumns = useMemo( () => {
		if ( ! showDbSync ) {
			return [];
		}

		const schemaNames = new Set( schemaColumns.map( column => column.name ).filter( Boolean ) );

		return Object.entries( dbColumns )
			.filter( ( [ columnName ] ) => ! schemaNames.has( columnName ) )
			.map( ( [ columnName, sqlType ] ) => {
				const editorType = dbTypeToEditorColumn( sqlType );
				return {
					name: columnName,
					type: editorType.type,
					custom_type: editorType.custom_type,
					db_type: sqlType,
				};
			} );
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

	const add = () => {
		const id = uniqid();
		commit( {
			...items,
			[ id ]: {
				id,
				name: '',
				type: DEFAULT_COLUMN_TYPE,
				custom_type: '',
				index: false,
			},
		} );
	};

	const removeFromSchema = ( id, columnName ) => {
		if ( ! window.confirm(
			sprintf(
				/* translators: %s: column name */
				__( 'Remove "%s" from the schema? The column and its data will remain in the database.', 'meta-box-builder' ),
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
		const id = uniqid();
		commit( {
			...items,
			[ id ]: {
				id,
				name: item.name,
				type: item.type || DEFAULT_COLUMN_TYPE,
				custom_type: item.custom_type || '',
				index: false,
			},
		} );
	};

	const dropColumn = async columnName => {
		if ( ! window.confirm(
			sprintf(
				/* translators: %s: column name */
				__( 'Permanently drop "%s" from the database? All data in this column will be deleted. This cannot be undone.', 'meta-box-builder' ),
				columnName
			)
		) ) {
			return;
		}

		setDropping( columnName );
		try {
			const response = await fetcher( {
				api: 'custom-model/table-columns',
				params: {
					post_id: postId,
					column: columnName,
				},
				method: 'DELETE',
				cache: false,
			} );

			if ( ! response.success ) {
				alert( response.message || __( 'Could not drop the column from the database.', 'meta-box-builder' ) );
				return;
			}

			setDbColumns( response.columns || {} );
		} catch ( error ) {
			alert( error.message || __( 'Could not drop the column from the database.', 'meta-box-builder' ) );
		} finally {
			setDropping( '' );
		}
	};

	const reorder = list => {
		const next = {};
		list.forEach( item => {
			if ( ! item?.id ) {
				return;
			}
			next[ item.id ] = stripSortableMeta( item );
		} );
		commit( next );
	};

	const updateItem = ( id, prop, propValue ) => {
		const current = items[ id ] || {};
		const nextItem = {
			...current,
			id,
			[ prop ]: propValue,
		};

		if ( 'type' === prop && ! isIndexableType( CUSTOM_COLUMN_TYPE === propValue ? ( nextItem.custom_type || DEFAULT_COLUMN_TYPE ) : propValue ) ) {
			nextItem.index = false;
		}

		if ( 'custom_type' === prop && CUSTOM_COLUMN_TYPE === nextItem.type && ! isIndexableType( propValue ) ) {
			nextItem.index = false;
		}

		commit( {
			...items,
			[ id ]: nextItem,
		} );
	};

	const legendItems = showFieldContext ? FIELD_STATUS_LEGEND : [];

	return (
		<DivRow label={ label } className="mb-columns-editor" description={ description }>
			{
				schemaColumns.length > 0 && (
					<table className={ `mb-columns-editor__table${ showFieldContext ? ' mb-columns-editor__table--with-status' : '' }` }>
						<thead>
							<tr>
								<th className="mb-columns-editor__reorder" aria-hidden="true" />
								<th className="mb-columns-editor__name">{ __( 'Name', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__type">{ __( 'Type', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__index">{ __( 'Index', 'meta-box-builder' ) }</th>
								{ showFieldContext && <th className="mb-columns-editor__status">{ __( 'Status', 'meta-box-builder' ) }</th> }
								<th className="mb-columns-editor__action">{ __( 'Action', 'meta-box-builder' ) }</th>
							</tr>
						</thead>
						<ReactSortable
							tag="tbody"
							list={ schemaColumns }
							setList={ reorder }
							handle=".mb-columns-editor__handle"
							animation={ 200 }
						>
							{
								schemaColumns.map( item => {
									const id = item.id;
									const sqlType = resolveColumnSqlType( item );
									const canIndex = isIndexableType( sqlType );
									const inDb = dbColumnNames.has( item.name );
									const status = showFieldContext
										? getFieldStatus( item.name, usedColumnNames, existingColumnNames )
										: null;
									const isDropping = dropping === item.name;

									return (
										<tr key={ id }>
											<td className="mb-columns-editor__reorder">
												<span
													className="mb-columns-editor__handle dashicons dashicons-menu"
													title={ __( 'Drag to reorder', 'meta-box-builder' ) }
													aria-label={ __( 'Drag to reorder', 'meta-box-builder' ) }
												/>
											</td>
											<td className="mb-columns-editor__name">
												<input
													type="text"
													placeholder={ __( 'column_name', 'meta-box-builder' ) }
													value={ item.name || '' }
													onChange={ e => updateItem( id, 'name', e.target.value ) }
												/>
											</td>
											<td className="mb-columns-editor__type">
												<select
													value={ item.type || DEFAULT_COLUMN_TYPE }
													onChange={ e => updateItem( id, 'type', e.target.value ) }
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
															onChange={ e => updateItem( id, 'custom_type', e.target.value ) }
														/>
													)
												}
											</td>
											<td className="mb-columns-editor__index">
												<input
													type="checkbox"
													checked={ !! item.index && canIndex }
													disabled={ ! canIndex }
													onChange={ e => updateItem( id, 'index', e.target.checked ) }
												/>
											</td>
											{
												showFieldContext && (
													<td className="mb-columns-editor__status">
														<ColumnStatus status={ status } />
													</td>
												)
											}
											<td className="mb-columns-editor__action">
												<ColumnActions
													columnName={ item.name }
													inDb={ inDb }
													isDropping={ isDropping }
													onRemove={ () => removeFromSchema( id, item.name ) }
													onDrop={ dropColumn }
												/>
											</td>
										</tr>
									);
								} )
							}
						</ReactSortable>
					</table>
				)
			}
			<Button className="mb-columns-editor__add" variant="secondary" onClick={ add } text={ __( '+ Add column', 'meta-box-builder' ) } />
			{
				showDbSync && orphanColumns.length > 0 && (
					<div className="mb-columns-editor__db-section">
						<p className="mb-columns-editor__db-heading">
							{ __( 'Columns in database only', 'meta-box-builder' ) }
						</p>
						<p className="mb-columns-editor__db-description">
							{ __( 'These columns exist in the database but are not in the schema. Add them to the schema or drop them from the database.', 'meta-box-builder' ) }
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
									orphanColumns.map( item => {
										const isDropping = dropping === item.name;

										return (
											<tr key={ item.name }>
												<td className="mb-columns-editor__name">
													{ item.name }
												</td>
												<td className="mb-columns-editor__type">
													<span className="mb-columns-editor__db-type">{ item.db_type }</span>
												</td>
												<td className="mb-columns-editor__index">
													<input type="checkbox" checked={ false } disabled />
												</td>
												<td className="mb-columns-editor__action">
													<div className="mb-columns-editor__actions">
														<ActionButton
															icon="plus-alt2"
															label={ ACTION_TOOLTIPS.addToSchema }
															onClick={ () => addToSchema( item ) }
														/>
														<ActionButton
															icon="trash"
															label={ ACTION_TOOLTIPS.dropColumn }
															isDestructive
															disabled={ isDropping }
															isBusy={ isDropping }
															onClick={ () => dropColumn( item.name ) }
														/>
													</div>
												</td>
											</tr>
										);
									} )
								}
							</tbody>
						</table>
					</div>
				)
			}
			{
				showFieldContext && legendItems.length > 0 && (
					<ul className="mb-columns-editor__status-legend">
						{
							legendItems.map( item => (
								<li key={ item.type }>
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
