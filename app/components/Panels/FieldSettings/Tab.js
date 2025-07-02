import { lazy, Suspense, useMemo } from "@wordpress/element";
import dotProp from 'dot-prop';
import { bracketsToDots } from '../../../functions';

/**
 * Get parameters for a dynamic control.
 *
 * Returns array of:
 * - Lazy loaded control component
 * - Input name in format [name] or [name][subfield]
 * - Default value
 */
const getControlParams = ( control, objectValue, importFallback, checkNewField = false ) => {
	const Control = lazy( () => import( `../../../controls/${ control.name }` ).catch( importFallback ) );

	const name = dotProp.get( control.props, 'name', control.setting );

	// Convert name => [name], name[subfield] => [name][subfield].
	const input = name.replace( /^([^\[]+)/, '[$1]' );

	let defaultFallbackValue = control.defaultValue;
	if ( checkNewField && !dotProp.get( objectValue, '_new', false ) ) {
		defaultFallbackValue = getDefaultControlValue( control.name );
	}

	let key = bracketsToDots( name );
	let defaultValue = dotProp.get( objectValue, key, defaultFallbackValue );

	if ( control.name === 'CloneSettings' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, 'clone_settings', [ 'clone', 'sort_clone', 'clone_default', 'clone_empty_start', 'clone_as_multiple', 'min_clone', 'max_clone', 'add_button' ] );
	}
	if ( control.name === 'InputAttributes' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, 'input_attributes', [ 'disabled', 'readonly' ], false );
	}
	if ( control.name === 'InputGroup' ) {
		defaultValue = getFieldValueForCombinedControl( objectValue, name, control.setting, [ control.props.key1, control.props.key2 ], '' );
	}

	return [ Control, input, defaultValue ];
};

const getFieldValueForCombinedControl = ( objectValue, name, inputName, params, defaultFallbackValue ) => {
	let defaultValue = {};
	params.forEach( param => {
		const key = bracketsToDots( name.replace( inputName, param ) );
		defaultValue[ param ] = dotProp.get( objectValue, key, defaultFallbackValue );
	} );

	return defaultValue;
};

const getDefaultControlValue = name => {
	const defaultValues = {
		Checkbox: false,
		KeyValue: [],
		ReactSelect: [],
		IncludeExclude: [],
		ShowHide: [],
		ConditionalLogic: [],
		CustomTable: [],
		TextLimiter: [],
	};
	return defaultValues.hasOwnProperty( name ) ? defaultValues[ name ] : '';
};

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