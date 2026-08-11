import dotProp from 'dot-prop';

const maxKeyLength = object => Math.max.apply( null, Object.keys( object ).map( key => key.length ) );
const spaces = ( settings, key ) => ' '.repeat( Math.max( 0, maxKeyLength( settings ) - key.length ) );
const checkText = ( settings, key ) => {
	let value = ( dotProp.get( settings, key, '' ) || '' ).replace( /\\/g, '\\\\' );
	value = value.replace( /'/g, "\\'" );
	return value;
};
const text = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => '${ checkText( settings, key ) }'`;
const translatableText = ( settings, key ) => `'${ key }'${ spaces( settings, key ) } => __( '${ checkText( settings, key ) }', '${ settings.text_domain || 'your-textdomain' }' )`;
const checkboxList = ( settings, key, defaultValue ) => {
	const values = [ ...new Set( dotProp.get( settings, key, [] ) || [] ) ];

	return `'${ key }'${ spaces( settings, key ) } => ${ values.length ? `['${ values.join( "', '" ) }']` : defaultValue }`;
};
const general = ( settings, key ) => {
	let value = dotProp.get( settings, key );
	if ( [ '', undefined ].includes( value ) ) {
		value = "''";
	}
	return `'${ key }'${ spaces( settings, key ) } => ${ value }`;
};

const labels = settings => {
	const { labels: labelSettings } = settings;
	const keys = Object.keys( labelSettings ).filter( key => labelSettings[ key ] !== '' );
	const tempLabels = { ...labelSettings };
	tempLabels.text_domain = dotProp.get( settings, 'text_domain', 'your-textdomain' );

	return keys.map( key => translatableText( tempLabels, key ) ).join( ",\n\t\t\t" );
};

const showInMenu = settings => {
	let value = settings.show_in_menu;
	if ( [ true, false ].includes( value ) ) {
		return general( settings, 'show_in_menu' );
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

	return `'menu_icon'${ spaces( settings, 'menu_icon' ) } => '${ value.replace( /'/g, "\\'" ) }'`;
};

const table = settings => {
	const name = settings.table || '';
	if ( settings.prefix ) {
		return `'table'${ spaces( settings, 'table' ) } => $wpdb->prefix . '${ name.replace( /'/g, "\\'" ) }'`;
	}
	return text( settings, 'table' );
};

export { checkboxList, general, labels, menuIcon, showInMenu, spaces, table, text, translatableText };
