import { Suspense, useMemo } from "@wordpress/element";
import { getControlParams } from '/functions';

// Specific settings that have live update.
const settingsWithLiveUpdate = [
	'before',
	'after',
	'name',
	'id',
	'required',
	'clone_settings',
	'label_description',
	'desc',
	'placeholder',
	'size',
	'textarea_size',
	'prepend_append',
	'text_limiter',
	'tooltip',
	'std',
	'options',
	'inline',
	'select_all_none',
	'multiple',
	'format',
	'save_format',
	'placeholder_key',
	'placeholder_value',
	'prefix_suffix',
	'style',
	'on_off',
	'minmax',
	'field_type',
	'add_new',
	'max_file_uploads',
	'max_status',
	'collapsible',
	'group_title',
	'class',
	'icon_type',
	'icon',
	'icon_url',
	'icon_fa',
];

const getControlSettings = control => {
	if ( control.name === 'CloneSettings' ) {
		return [ 'clone', 'sort_clone', 'clone_default', 'clone_empty_start', 'clone_as_multiple', 'min_clone', 'max_clone', 'add_button' ];
	}
	if ( control.name === 'InputAttributes' ) {
		return [ 'disabled', 'readonly' ];
	}
	if ( control.name === 'InputGroup' ) {
		return [ control.props.key1, control.props.key2 ];
	}

	return [ control.setting ];
};

const getWatchedValue = ( field, control ) => {
	const settings = getControlSettings( control );
	return JSON.stringify( settings.map( setting => field[ setting ] ) );
};

const Tab = ( { controls, field, parent = '', updateField } ) => {
	return controls.map( control => {
		const watchValue = getWatchedValue( field, control );

		const memoizedControl = useMemo( () => {
			let [ Control, input, defaultValue ] = getControlParams( control, field, () => {}, true );

			// Safe fallback for specific types.
			if ( control.setting === 'type' ) {
				defaultValue = [ 'datetime-local', 'month', 'tel', 'week' ].includes( defaultValue ) ? 'text' : defaultValue;
			}

			let props = {
				componentName: control.setting,
				componentId: `fields-${ field._id }-${ control.setting }`,
				...control.props,
				name: `fields${ parent }[${ field._id }]${ input }`,
				defaultValue,
				field,
				updateField,
			};

			console.debug( `    Control: ${ control.setting }` );

			return <Control { ...props } />;
		}, [ control, parent, watchValue ] ); // dependencies

		return (
			<Suspense fallback={ null } key={ control.setting }>
				{ memoizedControl }
			</Suspense>
		);
	} );
};

export default Tab;