import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, controls, field, parent = '' } ) => {
	const getControlComponent = ( { name, setting, props, defaultValue } ) => {
		const Control = lazy( () => import( `../../Controls/${ name }` ) );

		// If API specifies input name, then use it. Otherwise use setting. Convert name, name[subfield] to [name], [name][subfield].
		const input = dotProp.get( props, 'name', setting ).replace( /^([^\[]+)/, '[$1]' );

		// Convert name[subfield] to name.subfield to get default value.
		const key = dotProp.get( props, 'name', setting ).replace( '[', '.' ).replace( ']', '' );

		return <Control
			fieldId={ id }
			componentName={ setting }
			componentId={ `fields-${ id }-${ setting }` }
			{ ...props }
			name={ `fields${ parent }[${ id }]${ input }` }
			defaultValue={ dotProp.get( field, key, defaultValue ) }
			_new={ dotProp.get( field, '_new', false ) } // Idicate if field is just added, for auto generating ID.
		/>;
	};

	return (
		<div className="og-item__content">
			{ controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );