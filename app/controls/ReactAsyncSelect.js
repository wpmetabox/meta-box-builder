import dotProp from 'dot-prop';
import AsyncSelect from 'react-select/async';
import { ensureArray } from '/functions';

const { useState } = wp.element;

const ReactAsyncSelect = ( { baseName, className, defaultValue, ...rest } ) => {
	const [ labels, setLabels ] = useState( ensureArray( dotProp.get( defaultValue, 'label', [] ) ) );

	let values = dotProp.get( defaultValue, 'value', [] );
	values = ensureArray( values );

	let transformedDefaultValue;
	if ( values ) {
		transformedDefaultValue = values.map( ( value, index ) => ( { value, label: labels[ index ] } ) );
	}

	const onChange = items => {
		const newLabels = Array.isArray( items ) ? items.map( item => item.label ) : [];
		setLabels( newLabels );
	};

	return <>
		<AsyncSelect
			name={ `${ baseName }[value][]` }
			className={ `react-select ${ className }` }
			classNamePrefix="react-select"
			isMulti
			defaultOptions
			defaultValue={ transformedDefaultValue }
			onChange={ onChange }
			{ ...rest }
		/>
		{
			labels.map( label => <input key={ label } type="hidden" name={ `${ baseName }[label][]` } defaultValue={ label } /> )
		}
	</>;
};

export default ReactAsyncSelect;