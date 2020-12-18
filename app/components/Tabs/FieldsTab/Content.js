import dotProp from 'dot-prop';
const { lazy, memo, Suspense } = wp.element;

const Content = ( { id, data, field } ) => {
	const getElement = name => {
		if ( 'type' === name ) {
			return null;
		}
		let Component = lazy( () => import( `../../Common/${ data[ name ].component }` ) );

		return <Component
			fieldId={ id }
			componentName={ name }
			componentId={ `fields-${ id }-${ name }` }
			name={ `fields[${ id }][${ name }]` }
			defaultValue={ dotProp.get( field, name, data[ name ].default ) }
			{ ...data[ name ].props }
		/>;
	};

	return (
		<div className="og-item__content">
			{
				Object.keys( data ).map( ( keyName, keyIndex ) =>
					<Suspense fallback={ null } key={ keyName + keyIndex }>
						{ getElement( keyName ) }
					</Suspense>
				)
			}
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id );