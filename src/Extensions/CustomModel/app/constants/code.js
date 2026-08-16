import dotProp from 'dot-prop';
import { isIndexableType } from '../../../../../assets/app/constants/columnTypes';

const maxKeyLength = object => Math.max.apply( null, Object.keys( object ).map( key => key.length ) );
const spaces = ( settings, key ) => ' '.repeat( Math.max( 0, maxKeyLength( settings ) - key.length ) );
const escapeQuotes = value => String( value || '' ).replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" );
const checkText = ( settings, key ) => escapeQuotes( dotProp.get( settings, key, '' ) );
const text = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => '${ checkText( settings, key ) }'`;
const translatableText = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => __( '${ checkText( settings, key ) }', '${ settings.text_domain || 'your-textdomain' }' )`;
const checkboxList = ( settings, key, defaultValue ) => {
	const values = [ ...new Set( dotProp.get( settings, key, [] ) || [] ) ];

	return `'${ key }'${ spaces( settings, key ) } => ${ values.length ? `['${ values.join( "', '" ) }']` : defaultValue }`;
};

const labels = settings => {
	const { labels: labelSettings } = settings;
	const keys = Object.keys( labelSettings ).filter( key => labelSettings[ key ] !== '' );
	const tempLabels = { ...labelSettings };
	tempLabels.text_domain = dotProp.get( settings, 'text_domain', 'your-textdomain' );

	return keys.map( key => translatableText( tempLabels, key ) ).join( ",\n\t\t\t" );
};

const showInMenu = settings => {
	const value = settings.show_in_menu;
	if ( [ true, false ].includes( value ) ) {
		return `'show_in_menu'${ spaces( settings, 'show_in_menu' ) } => ${ value }`;
	}
	return `'show_in_menu'${ spaces( settings, 'show_in_menu' ) } => true,\n\t\t'parent'${ spaces( settings, 'parent' ) } => '${ value }'`;
};

const menuIcon = settings => {
	const type = settings.icon_type || 'dashicons';
	let value = settings.icon || 'admin-post';

	if ( type === 'dashicons' ) {
		value = `dashicons-${ value.replace( /^dashicons-/, '' ) }`;
	} else if ( type === 'svg' ) {
		value = settings.icon_svg || '';
	} else if ( type === 'custom' ) {
		value = settings.icon_custom || '';
	} else if ( type === 'font_awesome' ) {
		value = settings.font_awesome || '';
	}

	return `'menu_icon'${ spaces( settings, 'menu_icon' ) } => '${ escapeQuotes( value ) }'`;
};

const columnsCode = settings => {
	const columns = settings.columns || {};
	const entries = Object.values( columns ).filter( col => ( col.name || '' ).trim() );

	if ( ! entries.length ) {
		return '[]';
	}

	const lines = entries.map( col => {
		const name = escapeQuotes( ( col.name || '' ).trim() );
		let type = col.type || 'TEXT';
		if ( 'custom' === type ) {
			type = ( col.custom_type || '' ).trim() || 'TEXT';
		}
		return `\t\t'${ name }' => '${ escapeQuotes( type ) }'`;
	} );

	return `[\n${ lines.join( ",\n" ) },\n\t]`;
};

const keysCode = settings => {
	const columns = settings.columns || {};
	const keys = Object.values( columns )
		.filter( col => {
			if ( ! col.index || ! ( col.name || '' ).trim() ) {
				return false;
			}
			const type = 'custom' === col.type ? ( ( col.custom_type || '' ).trim() || 'TEXT' ) : ( col.type || 'TEXT' );
			return isIndexableType( type );
		} )
		.map( col => `'${ escapeQuotes( ( col.name || '' ).trim() ) }'` );

	if ( ! keys.length ) {
		return '[]';
	}

	return `[ ${ keys.join( ', ' ) } ]`;
};

const tableVar = settings => {
	const name = escapeQuotes( settings.table || '' );
	if ( settings.prefix ) {
		return `$wpdb->prefix . '${ name }'`;
	}
	return `'${ name }'`;
};

export { checkboxList, columnsCode, escapeQuotes, keysCode, labels, menuIcon, showInMenu, tableVar, text };
