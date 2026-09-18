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

const COLUMN_TYPE_PRESETS = COLUMN_TYPE_GROUPS.reduce( ( presets, group ) => ( {
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

/** Field types that always serialize or store free-form strings. */
const ALWAYS_TEXT_FIELD_TYPES = [
	'autocomplete',
	'background',
	'button_group',
	'checkbox_list',
	'fieldset_text',
	'file',
	'file_advanced',
	'file_upload',
	'group',
	'image',
	'image_advanced',
	'image_select',
	'image_upload',
	'key_value',
	'link',
	'radio',
	'select',
	'select_advanced',
	'taxonomy',
	'text_list',
	'textarea',
	'video',
];

const VARCHAR_FIELD_TYPES = [
	'color',
	'email',
	'file_input',
	'hidden',
	'icon',
	'map',
	'oembed',
	'osm',
	'password',
	'sidebar',
	'text',
	'url',
];

const BIGINT_FIELD_TYPES = [ 'post', 'single_image', 'taxonomy_advanced', 'user' ];

const isIntegerStep = step => {
	if ( ! step ) {
		return true;
	}
	if ( String( step ).toLowerCase() === 'any' ) {
		return false;
	}
	const value = Number( step );
	return Number.isFinite( value ) && Number.isInteger( value );
};

const isMysqlDateFormat = format => ! format || format === 'Y-m-d';

const isMysqlDatetimeFormat = format => ! format || format === 'Y-m-d H:i' || format === 'Y-m-d H:i:s';

/**
 * Suggest a SQL column type from a field's type and settings.
 * Used when seeding columns in the schema editor only — save still defaults missing columns to TEXT.
 *
 * @param {Object} field Field settings from the editor.
 * @return {string} A COLUMN_TYPE_GROUPS preset key.
 */
export const suggestColumnType = ( field = {} ) => {
	if ( field.clone || field.multiple || ALWAYS_TEXT_FIELD_TYPES.includes( field.type ) ) {
		return DEFAULT_COLUMN_TYPE;
	}

	if ( [ 'checkbox', 'switch' ].includes( field.type ) ) {
		return 'TINYINT(1)';
	}

	if ( field.type === 'time' ) {
		return 'TIME';
	}

	if ( field.type === 'date' ) {
		if ( field.timestamp ) {
			return 'BIGINT';
		}
		return isMysqlDateFormat( field.save_format ) ? 'DATE' : 'VARCHAR(255)';
	}

	if ( field.type === 'datetime' ) {
		if ( field.timestamp ) {
			return 'BIGINT';
		}
		return isMysqlDatetimeFormat( field.save_format ) ? 'DATETIME' : 'VARCHAR(255)';
	}

	if ( [ 'wysiwyg', 'block_editor' ].includes( field.type ) ) {
		return 'LONGTEXT';
	}

	if ( VARCHAR_FIELD_TYPES.includes( field.type ) ) {
		return 'VARCHAR(255)';
	}

	if ( [ 'number', 'range', 'slider' ].includes( field.type ) ) {
		return isIntegerStep( field.step ) ? 'INT' : 'FLOAT';
	}

	if ( BIGINT_FIELD_TYPES.includes( field.type ) ) {
		return 'BIGINT';
	}

	return DEFAULT_COLUMN_TYPE;
};

/** Keep in sync with TableSchema::is_indexable() in PHP. */
export const isIndexableType = type => {
	const upper = String( type || '' ).toUpperCase();
	return ! upper.includes( 'TEXT' ) && ! upper.includes( 'BLOB' ) && ! upper.includes( 'JSON' );
};

/** Matches PHP: sanitize_key + hyphen→underscore, then reject name "id". */
export const isReservedColumnName = name => {
	const normalized = String( name || '' )
		.trim()
		.toLowerCase()
		.replace( /-/g, '_' )
		.replace( /[^a-z0-9_]/g, '' );
	return 'id' === normalized;
};

const isPresetColumnType = type => Object.prototype.hasOwnProperty.call( COLUMN_TYPE_PRESETS, type );

export const resolveColumnSqlType = column => {
	if ( ! column ) {
		return DEFAULT_COLUMN_TYPE;
	}

	if ( CUSTOM_COLUMN_TYPE === column.type ) {
		return ( column.custom_type || '' ).trim() || DEFAULT_COLUMN_TYPE;
	}

	return column.type || DEFAULT_COLUMN_TYPE;
};

/** Exact preset match only; variants keep custom_type so import/sync does not rewrite SQL. Keep in sync with MetaBox::sql_type_to_editor_column(). */
export const dbTypeToEditorColumn = ( sqlType = '' ) => {
	const type = String( sqlType ).trim();
	const upper = type.toUpperCase();

	if ( isPresetColumnType( upper ) ) {
		return {
			type: upper,
			custom_type: '',
		};
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
