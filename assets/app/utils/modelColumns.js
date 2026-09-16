import slugify from 'slugify';
import { createColumnItem } from '../constants/columnTypes';

/**
 * Column names from a model schema or database map.
 * Supports parsed `{ name: sqlType }` and editor `{ id: { name } }` shapes.
 */
const getColumnNames = columns => {
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
 * Sanitize a table or column name, matching TableSchema::sanitize_name() in PHP.
 *
 * Transliterate first, because sanitize_key() drops accented characters: typing
 * "giao dịch" would silently become "giaodch". Symbols and "đ" are handled before
 * slugify, which spells symbols out ("50% off" → "50percent_off") and maps "đ" to the
 * Serbian "dj". Non-Latin scripts have no transliteration and give an empty name.
 */
export const sanitizeSqlName = name => slugify(
	String( name || '' )
		.replace( /[^\p{L}\p{N}\s_-]/gu, '' )
		.replace( /đ/gi, 'd' )
		.replace( /[\s\-]/g, '_' ),
	{ lower: true, replacement: '_', strict: true, trim: false }
);

/**
 * Resolve the full database table name from UI settings.
 */
export const resolveTableName = ( table, usePrefix = false, prefix = '' ) => {
	const name = sanitizeSqlName( table );
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
