import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, controls } ) => {
	const getControlComponent = ( { name, setting, props, defaultValue } ) => {
		const Control = lazy( () => import( `/controls/${ name }` ) );

		// If API specifies input name, then use it. Otherwise use setting.
		const n = dotProp.get( props, 'name', setting );

		// Convert name, name[subfield] to [name], [name][subfield].
		const input = n.replace( /^([^\[]+)/, '[$1]' );

		// Convert name[] to name, name[subfield] to name.subfield to get default value.
		const key = n.replace( '[]', '' ).replace( '[', '.' ).replace( ']', '' );

		return <Control
			componentId={ `relationship-${ id }-${ setting }` }
			{ ...props }
			name={ `settings[${ id }]${ input }` }
			defaultValue={ dotProp.get( MbbApp.settings, key, defaultValue ) }
		/>;
	};

	return (
		<>
			{ controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );