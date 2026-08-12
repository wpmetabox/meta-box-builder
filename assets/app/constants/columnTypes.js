import { __ } from '@wordpress/i18n';

export const COLUMN_TYPE_GROUPS = [
	{
		label: __( 'Numeric', 'meta-box-builder' ),
		options: {
			TINYINT: 'TINYINT',
			SMALLINT: 'SMALLINT',
			MEDIUMINT: 'MEDIUMINT',
			INT: 'INT',
			BIGINT: 'BIGINT',
			'DECIMAL(10,2)': 'DECIMAL(10,2)',
			FLOAT: 'FLOAT',
			DOUBLE: 'DOUBLE',
		},
	},
	{
		label: __( 'Boolean', 'meta-box-builder' ),
		options: {
			'TINYINT(1)': 'BOOLEAN (TINYINT(1))',
		},
	},
	{
		label: __( 'String', 'meta-box-builder' ),
		options: {
			'CHAR(1)': 'CHAR(1)',
			'VARCHAR(255)': 'VARCHAR(255)',
			TINYTEXT: 'TINYTEXT',
			TEXT: 'TEXT',
			MEDIUMTEXT: 'MEDIUMTEXT',
			LONGTEXT: 'LONGTEXT',
		},
	},
	{
		label: __( 'Date and time', 'meta-box-builder' ),
		options: {
			DATE: 'DATE',
			TIME: 'TIME',
			DATETIME: 'DATETIME',
		},
	},
];

export const CUSTOM_COLUMN_TYPE = 'custom';

export const COLUMN_TYPE_PRESETS = COLUMN_TYPE_GROUPS.reduce( ( presets, group ) => ( {
	...presets,
	...group.options,
} ), {} );

export const DEFAULT_COLUMN_TYPE = 'TEXT';

const NON_INDEXABLE = /^(TINY|MEDIUM|LONG)?TEXT$/i;

export const isIndexableType = type => ! NON_INDEXABLE.test( String( type || '' ).trim() );

export const isPresetColumnType = type => Object.prototype.hasOwnProperty.call( COLUMN_TYPE_PRESETS, type );

export const resolveColumnSqlType = column => {
	if ( ! column ) {
		return DEFAULT_COLUMN_TYPE;
	}

	if ( CUSTOM_COLUMN_TYPE === column.type ) {
		return ( column.custom_type || '' ).trim() || DEFAULT_COLUMN_TYPE;
	}

	return column.type || DEFAULT_COLUMN_TYPE;
};

export const columnsObjectToMap = columns => {
	const map = {};
	Object.values( columns || {} ).forEach( column => {
		const name = ( column.name || '' ).trim();
		if ( ! name ) {
			return;
		}
		map[ name ] = resolveColumnSqlType( column );
	} );
	return map;
};

export const parsedColumnsToEditor = ( columns = {}, keys = [] ) => {
	const keySet = new Set( keys );
	const items = {};

	Object.entries( columns || {} ).forEach( ( [ name, sqlType ] ) => {
		const id = `col_${ name }`;
		const isPreset = isPresetColumnType( sqlType );
		items[ id ] = {
			id,
			name,
			type: isPreset ? sqlType : CUSTOM_COLUMN_TYPE,
			custom_type: isPreset ? '' : sqlType,
			index: keySet.has( name ),
		};
	} );

	return items;
};
