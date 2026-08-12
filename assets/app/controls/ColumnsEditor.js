import { Button } from '@wordpress/components';
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

const ColumnsEditor = ( {
	name = 'columns',
	defaultValue,
	value,
	updateField,
	onChange,
	label = __( 'Columns', 'meta-box-builder' ),
	description = '',
	usedColumnNames = [],
} ) => {
	const isControlled = value !== undefined;
	const [ localItems, setLocalItems ] = useState( () => maybeArrayToObject( defaultValue, 'id' ) );
	const items = maybeArrayToObject( isControlled ? value : localItems, 'id' );
	const columns = Object.values( items );
	const usedSet = new Set( usedColumnNames );

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
					<table className="mb-columns-editor__table">
						<thead>
							<tr>
								<th className="mb-columns-editor__handle-col" aria-hidden="true" />
								<th>{ __( 'Name', 'meta-box-builder' ) }</th>
								<th>{ __( 'Type', 'meta-box-builder' ) }</th>
								<th>{ __( 'Index', 'meta-box-builder' ) }</th>
								<th />
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
									const unused = item.name && ! usedSet.has( item.name );

									return (
										<tr key={ id } className={ unused && usedColumnNames.length ? 'mb-columns-editor__row--unused' : '' }>
											<td className="mb-columns-editor__handle-col">
												<span
													className="mb-columns-editor__handle dashicons dashicons-menu"
													title={ __( 'Drag to reorder', 'meta-box-builder' ) }
													aria-label={ __( 'Drag to reorder', 'meta-box-builder' ) }
												/>
											</td>
											<td>
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
											<td>
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
				usedColumnNames.length > 0 && columns.some( item => item.name && ! usedSet.has( item.name ) ) && (
					<p className="og-description">
						{ __( 'Highlighted columns are not used by fields in this field group.', 'meta-box-builder' ) }
					</p>
				)
			}
		</DivRow>
	);
};

export default ColumnsEditor;
