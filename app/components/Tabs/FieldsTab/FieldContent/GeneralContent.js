import React, { lazy, memo, Suspense } from 'react';
import { getElementControlName } from '../../../../utility/functions';

const GeneralContent = ( { index, data, type, setLabel } ) => {
	const getElement = name => {
		if ( name === 'type' ) {
			return null;
		}

		// Load shared component with dynamic config from the back-end API.
		if ( data[ name ].component ) {
			let Component = lazy( () => import( `../../../Common/${ data[ name ].component }` ) );
			return <Component
				index={ index }
				name={ `fields-${ index }-${ name }` }
				defaultValue={ data[ name ].default }
				{ ...data[ name ].props }
			/>;
		}

		// Load custom component.
		let componentName = getElementControlName( name, type );
		let Element = lazy( () => import( `../../../Common/Elements/${ componentName }` ) );

		return <Element
			name={ `fields-${ index }-${ name }` }
			label={ name }
			setLabel={ setLabel }
			defaultValue={ data[ name ] }
			data={ data }
			index={ index }
			type={ type } />;
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

export default memo( GeneralContent, ( prevProps, nextProps ) => prevProps.index === nextProps.index );