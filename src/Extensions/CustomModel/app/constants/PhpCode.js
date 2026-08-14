import { checkboxList, columnsCode, keysCode, labels, menuIcon, showInMenu, tableVar, text } from './code';
import DefaultSettings from './DefaultSettings';

const PhpCode = settings => {
	const slug = ( settings.slug || '' ).replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" );
	const functionName = settings.function_name || DefaultSettings.function_name;
	const position = Number( settings.menu_position );
	const menuPosition = true === settings.show_in_menu && '' !== settings.menu_position && Number.isFinite( position )
		? `\n\t\t'menu_position' => ${ position },`
		: '';
	const supports = settings.supports?.length
		? `\n\t\t${ checkboxList( settings, 'supports', '[]' ) },`
		: '';
	const globalWpdb = settings.prefix ? '\n\tglobal $wpdb;\n' : '\n';
	const tableExpression = tableVar( settings );

	return `<?php
add_action( 'init', '${ functionName }' );
function ${ functionName }() {${ globalWpdb }
	$table = ${ tableExpression };

	mb_register_model( '${ slug }', [
		'table' => $table,
		'labels' => [
			${ labels( settings ) },
		],
		${ showInMenu( settings ) },${ menuPosition }
		${ menuIcon( settings ) },
		${ text( settings, 'capability' ) },${ supports }
	] );

	MetaBox\\CustomTable\\API::create( $table, ${ columnsCode( settings ) }, ${ keysCode( settings ) } );
}`;
};

export default PhpCode;
