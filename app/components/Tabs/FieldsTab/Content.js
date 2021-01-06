import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, controls, field, parent = '' } ) => {
	// If API specifies control name, then use it. And name, name[subfield] to [name], [name][subfield].
	const getControlName = name => dotProp.get( controls[ name ].props, 'name', name ).replace( /^([^\[]+)/, '[$1]' );

	const getControl = name => {
		const Control = lazy( () => import( `../../Controls/${ controls[ name ].control }` ) );

		return <Control
			fieldId={ id }
			componentName={ name }
			componentId={ `fields-${ id }-${ name }` }
			{ ...controls[ name ].props }
			name={ `fields${ parent }[${ id }]${ getControlName( name ) }` }
			defaultValue={ dotProp.get( field, name, controls[ name ].default ) }
		/>;
	};

	return (
		<div className="og-item__content">
			{ Object.keys( controls ).map( name => <Suspense fallback={ null } key={ id + name }>{ getControl( name ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );