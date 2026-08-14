import { __ } from '@wordpress/i18n';
import { uniqid } from '../functions';

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

export const createColumnItem = ( overrides = {} ) => ( {
	id: uniqid(),
	name: '',
	type: DEFAULT_COLUMN_TYPE,
	custom_type: '',
	index: false,
	...overrides,
} );

export const isIndexableType = type => ! /^(TINY|MEDIUM|LONG)?TEXT$/i.test( String( type || '' ).trim() );

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

export const dbTypeToEditorColumn = ( sqlType = '' ) => {
	const type = String( sqlType ).trim();
	const upper = type.toUpperCase();

	if ( isPresetColumnType( upper ) ) {
		return {
			type: upper,
			custom_type: '',
		};
	}

	if ( upper.startsWith( 'VARCHAR' ) ) {
		return { type: 'VARCHAR(255)', custom_type: '' };
	}

	if ( upper.startsWith( 'TINYINT(1)' ) ) {
		return { type: 'TINYINT(1)', custom_type: '' };
	}

	const base = upper.replace( /\s+UNSIGNED$/, '' ).replace( /\(\d+(,\d+)?\)/, '' );
	if ( isPresetColumnType( base ) ) {
		return { type: base, custom_type: '' };
	}

	return {
		type: CUSTOM_COLUMN_TYPE,
		custom_type: type,
	};
};

export const parsedColumnsToEditor = ( columns = {}, keys = [] ) => {
	const keySet = new Set( keys );

	return Object.fromEntries(
		Object.entries( columns || {} ).map( ( [ name, sqlType ] ) => {
			const id = `col_${ name }`;
			const rawType = String( sqlType || '' ).trim();
			const editorType = dbTypeToEditorColumn( rawType );

			return [ id, {
				id,
				name,
				type: editorType.type,
				custom_type: editorType.custom_type,
				db_type: rawType.toUpperCase(),
				index: keySet.has( name ),
			} ];
		} )
	);
};
