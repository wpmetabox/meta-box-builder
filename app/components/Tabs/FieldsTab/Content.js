import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, data, field, parent = '' } ) => {
	// If API specifies control name, then use it. And name, name[subfield] to [name], [name][subfield].
	const getControlName = name => dotProp.get( data[ name ].props, 'name', name ).replace( /^([^\[]+)/, '[$1]' );

	const getControl = name => {
		const Control = lazy( () => import( `../../Controls/${ data[ name ].control }` ) );

		return <Control
			fieldId={ id }
			componentName={ name }
			componentId={ `fields-${ id }-${ name }` }
			{ ...data[ name ].props }
			name={ `fields${ parent }[${ id }]${ getControlName( name ) }` }
			defaultValue={ dotProp.get( field, name, data[ name ].default ) }
		/>;
	};

	return (
		<div className="og-item__content">
			{ Object.keys( data ).map( name => <Suspense fallback={ null } key={ id + name }>{ getControl( name ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );