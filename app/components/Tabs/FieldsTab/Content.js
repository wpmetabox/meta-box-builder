import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, data, field, parent = '' } ) => {
	const getElement = name => {
		let Control = lazy( () => import( `../../Common/${ data[ name ].control }` ) );

		return <Control
			fieldId={ id }
			componentName={ name }
			componentId={ `fields-${ id }-${ name }` }
			name={ `fields${ parent }[${ id }][${ name }]` }
			defaultValue={ dotProp.get( field, name, data[ name ].default ) }
			{ ...data[ name ].props }
		/>;
	};

	return (
		<div className="og-item__content">
			{ Object.keys( data ).map( name => <Suspense fallback={ null } key={ id + name }>{ getElement( name ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );