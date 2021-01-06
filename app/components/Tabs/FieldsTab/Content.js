import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, controls, field, parent = '' } ) => {
	// If API specifies control name, then use it. Convert name, name[subfield] to [name], [name][subfield].
	const getInputName = name => dotProp.get( controls[ name ].props, 'name', name ).replace( /^([^\[]+)/, '[$1]' );

	// Convert name[subfield] to name.subfield to get default value.
	const bracketsToDots = name => dotProp.get( controls[ name ].props, 'name', name ).replace( '[', '.' ).replace( ']', '' );

	const getControl = name => {
		const Control = lazy( () => import( `../../Controls/${ controls[ name ].control }` ) );

		return <Control
			fieldId={ id }
			componentName={ name }
			componentId={ `fields-${ id }-${ name }` }
			{ ...controls[ name ].props }
			name={ `fields${ parent }[${ id }]${ getInputName( name ) }` }
			defaultValue={ dotProp.get( field, bracketsToDots( name ), controls[ name ].default ) }
		/>;
	};

	return (
		<div className="og-item__content">
			{ Object.keys( controls ).map( name => <Suspense fallback={ null } key={ id + name }>{ getControl( name ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );