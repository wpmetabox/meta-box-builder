import { Button, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import { COLUMN_TYPE_GROUPS, CUSTOM_COLUMN_TYPE, DEFAULT_COLUMN_TYPE, isIndexableType, resolveColumnSqlType } from '../constants/columnTypes';
import { maybeArrayToObject, uniqid } from '../functions';
import DivRow from './DivRow';

const stripSortableMeta = item => {
	const { chosen, selected, ...column } = item;
	return column;
};

const STATUS_CONFIG = {
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

const STATUS_LEGEND = Object.values( STATUS_CONFIG );

const getColumnStatus = ( name, fieldIds, existingColumnNames ) => {
	if ( ! name ) {
		return null;
	}

	const fieldSet = new Set( fieldIds );
	const existingSet = new Set( existingColumnNames );

	if ( fieldSet.has( name ) && existingSet.has( name ) ) {
		return STATUS_CONFIG.matched;
	}

	if ( fieldSet.has( name ) && ! existingSet.has( name ) ) {
		return STATUS_CONFIG.missing;
	}

	return STATUS_CONFIG[ 'no-field' ];
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
} ) => {
	const isControlled = value !== undefined;
	const [ localItems, setLocalItems ] = useState( () => maybeArrayToObject( defaultValue, 'id' ) );
	const items = maybeArrayToObject( isControlled ? value : localItems, 'id' );
	const columns = Object.values( items );
	const showStatus = usedColumnNames.length > 0;

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

	const remove = id => {
		const next = { ...items };
		delete next[ id ];
		commit( next );
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

	return (
		<DivRow label={ label } className="mb-columns-editor" description={ description }>
			{
				columns.length > 0 && (
					<table className={ `mb-columns-editor__table${ showStatus ? ' mb-columns-editor__table--with-status' : '' }` }>
						<thead>
							<tr>
								<th className="mb-columns-editor__reorder" aria-hidden="true" />
								<th className="mb-columns-editor__name">{ __( 'Name', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__type">{ __( 'Type', 'meta-box-builder' ) }</th>
								<th className="mb-columns-editor__index">{ __( 'Index', 'meta-box-builder' ) }</th>
								{ showStatus && <th className="mb-columns-editor__status">{ __( 'Status', 'meta-box-builder' ) }</th> }
								<th className="mb-columns-editor__action">{ __( 'Action', 'meta-box-builder' ) }</th>
							</tr>
						</thead>
						<ReactSortable
							tag="tbody"
							list={ columns }
							setList={ reorder }
							handle=".mb-columns-editor__handle"
							animation={ 200 }
						>
							{
								columns.map( item => {
									const id = item.id;
									const sqlType = resolveColumnSqlType( item );
									const canIndex = isIndexableType( sqlType );
									const status = showStatus
										? getColumnStatus( item.name, usedColumnNames, existingColumnNames )
										: null;

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
												showStatus && (
													<td className="mb-columns-editor__status">
														<ColumnStatus status={ status } />
													</td>
												)
											}
											<td className="mb-columns-editor__action">
												<Button
													variant="link"
													isDestructive
													onClick={ () => remove( id ) }
													text={ __( 'Remove', 'meta-box-builder' ) }
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
				showStatus && (
					<ul className="mb-columns-editor__status-legend">
						{
							STATUS_LEGEND.map( item => (
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
