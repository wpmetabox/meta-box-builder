import dotProp from 'dot-prop';
import slugify from 'slugify';
import useSettings from '../../../../../assets/app/hooks/useSettings';

const ucfirst = str => ( str.length ? str[ 0 ].toUpperCase() + str.slice( 1 ) : str );

const applyTemplate = ( template, sourceKey, value ) => {
	const placeholder = sourceKey.replace( 'labels.', '' );

	return ucfirst(
		template
			.replace( `%${ placeholder }%`, value )
			.replace( `%${ placeholder }_lowercase%`, value.toLowerCase() )
	);
};

const LABEL_AUTOFILL = [
	{ name: 'labels.add_new_item', template: 'Add New %singular_name%', source: 'labels.singular_name' },
	{ name: 'labels.edit_item', template: 'Edit %singular_name%', source: 'labels.singular_name' },
	{ name: 'labels.search_items', template: 'Search %name%', source: 'labels.name' },
	{ name: 'labels.not_found', template: 'No %name_lowercase% found.', source: 'labels.name' },
	{ name: 'labels.all_items', template: 'All %name%', source: 'labels.name' },
	{ name: 'labels.menu_name', template: '%name%', source: 'labels.name' },
	{ name: 'labels.item_updated', template: '%singular_name% updated.', source: 'labels.singular_name' },
	{ name: 'labels.item_added', template: '%singular_name% added.', source: 'labels.singular_name' },
	{ name: 'labels.item_deleted', template: '%singular_name% deleted.', source: 'labels.singular_name' },
];

const autofillFrom = ( settings, sourceKey, value ) => {
	if ( 'labels.singular_name' === sourceKey ) {
		if ( ! settings._slug_changed ) {
			dotProp.set( settings, 'slug', slugify( value, { lower: true } ) );
		}
	}

	if ( 'labels.name' === sourceKey ) {
		if ( ! settings._table_changed ) {
			dotProp.set( settings, 'table', slugify( value, { lower: true, replacement: '_' } ) );
		}
	}

	LABEL_AUTOFILL.filter( item => item.source === sourceKey ).forEach( item => {
		dotProp.set( settings, item.name, applyTemplate( item.template, item.source, value ) );
	} );
};

const useAutofill = () => {
	const { getSetting, updateSetting } = useSettings();

	const updateWithAutofill = ( key, value ) => {
		const settings = structuredClone( useSettings.getState().settings );

		if ( 'slug' === key ) {
			settings._slug_changed = true;
		}
		if ( 'table' === key ) {
			settings._table_changed = true;
		}
		if ( 'menu_position' === key ) {
			value = parseFloat( value ) || '';
		}

		dotProp.set( settings, key, value );

		if ( [ 'labels.name', 'labels.singular_name' ].includes( key ) ) {
			autofillFrom( settings, key, value );
		}

		useSettings.setState( { settings } );
	};

	return { getSetting, updateSetting, updateWithAutofill };
};

export default useAutofill;
