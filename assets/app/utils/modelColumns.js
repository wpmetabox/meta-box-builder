import { createColumnItem } from '../constants/columnTypes';

/**
 * Column names from a model schema or database map.
 * Supports parsed `{ name: sqlType }` and editor `{ id: { name } }` shapes.
 */
export const getColumnNames = columns => {
	if ( ! columns || typeof columns !== 'object' ) {
		return [];
	}

	const values = Object.values( columns );
	if ( values.length > 0 && values[ 0 ] && typeof values[ 0 ] === 'object' && 'name' in values[ 0 ] ) {
		return values.map( column => column.name ).filter( Boolean );
	}

	return Object.keys( columns );
};

/**
 * Field IDs that are not yet present as table columns.
 * Prefers live DB columns when the table exists.
 */
export const getMissingColumnIds = ( fieldIds, dbColumns, editorColumns ) => {
	const source = Object.keys( dbColumns || {} ).length ? dbColumns : editorColumns;
	const columnNames = getColumnNames( source );

	return ( fieldIds || [] ).filter( id => ! columnNames.includes( id ) );
};

/**
 * Resolve the full database table name from UI settings.
 */
export const resolveTableName = ( table, usePrefix = false, prefix = '' ) => {
	const name = String( table || '' ).trim();
	if ( ! name ) {
		return '';
	}

	return usePrefix ? `${ prefix }${ name }` : name;
};

/**
 * Merge stored editor columns with missing field IDs as TEXT columns.
 */
export const seedEditorColumns = ( editorColumns, fieldIds, createColumn = createColumnItem ) => {
	const existing = editorColumns && typeof editorColumns === 'object' ? { ...editorColumns } : {};
	const existingNames = new Set(
		Object.values( existing )
			.map( column => column?.name )
			.filter( Boolean )
	);

	fieldIds.forEach( id => {
		if ( ! id || existingNames.has( id ) ) {
			return;
		}
		const column = createColumn( {
			name: id,
		} );
		existing[ column.id ] = column;
		existingNames.add( id );
	} );

	return existing;
};
