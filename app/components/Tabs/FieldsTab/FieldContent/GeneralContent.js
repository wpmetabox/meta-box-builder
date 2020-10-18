import React, { lazy, memo, Suspense } from 'react';
import { getElementControlName } from '../../../../utility/functions';

const GeneralContent = ( props ) => {
	const getElement = ( name ) => {
		// Load shared component with dynamic config from the back-end API.
		if ( props.data[ name ].component ) {
			let Component = lazy( () => import( `../../../Common/${ props.data[ name ].component }` ) );
			return <Component
				name={ `fields-${ props.index }-${ name }` }
				defaultValue={ props.data[ name ].default }
				{ ...props.data[ name ].props }
			/>;
		}

		// Load custom component.
		let componentName = getElementControlName( name, props.type );
		let Element = lazy( () => import( `../../../Common/Elements/${ componentName }` ) );

		return <Element
			name={ `fields-${ props.index }-${ name }` }
			label={ name }
			setLabel={ props.setLabel }
			defaultValue={ props.data[ name ] }
			data={ props.data }
			index={ props.index }
			type={ props.type } />;
	};

	return (
		<div className="og-item__content">
			{
				Object.keys( props.data ).map( ( keyName, keyIndex ) =>
					<Suspense fallback={ null } key={ keyName + keyIndex }>
						{ getElement( keyName, keyIndex ) }
					</Suspense>
				)
			}
		</div>
	);
};

export default memo( GeneralContent, ( prevProps, nextProps ) => prevProps.index === nextProps.index );