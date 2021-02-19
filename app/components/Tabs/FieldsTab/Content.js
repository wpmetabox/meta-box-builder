import dotProp from 'dot-prop';
import { getControlParams } from '/functions';
const { memo, Suspense } = wp.element;

const Content = ( { id, controls, field, parent = '', updateFieldType } ) => {
	const getControlComponent = control => {
		const [ Control, input, defaultValue ] = getControlParams( control, field, () => {}, true );

		return <Control
			fieldId={ id }
			componentName={ control.setting }
			componentId={ `fields-${ id }-${ control.setting }` }
			{ ...control.props }
			name={ `fields${ parent }[${ id }]${ input }` }
			defaultValue={ defaultValue }

			// For Name: idicate if field is just added, for auto generating ID.
			_new={ dotProp.get( field, '_new', false ) }

			// For Type: allow to change field type.
			updateFieldType={ updateFieldType }
		/>;
	};

	return (
		<div className="og-item__content">
			{ controls.map( control => <Suspense fallback={ null } key={ control.setting }>{ getControlComponent( control ) }</Suspense> ) }
		</div>
	);
};

export default memo( Content, ( prevProps, nextProps ) => prevProps.id === nextProps.id && prevProps.field.type === nextProps.field.type );