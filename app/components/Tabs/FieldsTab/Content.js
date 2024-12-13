import { Suspense } from "@wordpress/element";
import { getControlParams } from '/functions';

const Content = ( { controls, field, parent = '', updateField } ) => {
	const getControlComponent = control => {
		let [ Control, input, defaultValue ] = getControlParams( control, field, () => {}, true );

		// Safe fallback to 'text' for not-recommended HTML5 field types.
		if ( control.setting === 'type' ) {
			defaultValue = [ 'datetime-local', 'month', 'tel', 'week' ].includes( defaultValue ) ? 'text' : defaultValue;
		}

		return <Control
			componentName={ control.setting }
			componentId={ `fields-${ field._id }-${ control.setting }` }
			{ ...control.props }
			name={ `fields${ parent }[${ field._id }]${ input }` }
			defaultValue={ defaultValue }
			updateField={ updateField }
			field={ field }
		/>;
	};

	return controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> );
};

export default Content;