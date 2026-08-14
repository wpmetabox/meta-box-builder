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
 * Resolve the full database table name from UI settings.
 */
export const resolveTableName = ( table, usePrefix = false, prefix = '' ) => {
	const name = String( table || '' ).trim();
	if ( ! name ) {
		return '';
	}

	return usePrefix ? `${ prefix }${ name }` : name;
};
