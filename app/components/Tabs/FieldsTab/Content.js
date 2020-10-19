const { lazy, memo, Suspense } = wp.element;

const Content = ( { index, data } ) => {
	const getElement = name => {
		if ( 'type' === name ) {
			return null;
		}
		let Component = lazy( () => import( `../../Common/${ data[ name ].component }` ) );
		return <Component
			index={ index }
			name={ `fields-${ index }-${ name }` }
			defaultValue={ data[ name ].default }
			{ ...data[ name ].props }
		/>;
	};

	return (
		<div className="og-item__content">
			{
				Object.keys( data ).map( ( keyName, keyIndex ) =>
					<Suspense fallback={ null } key={ keyName + keyIndex }>
						{ getElement( keyName, keyIndex ) }
					</Suspense>
				)
			}
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.index === nextProps.index );