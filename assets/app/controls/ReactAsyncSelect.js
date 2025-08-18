import AsyncSelect from 'react-select/async';
import { ensureArray } from '../functions';

const ReactAsyncSelect = ( { className, defaultValue, ...rest } ) => {
	const labels = ensureArray( defaultValue.label || [] );
	const values = ensureArray( defaultValue.value || [] );
	const transformedDefaultValue = values.length > 0 ? values.map( ( value, index ) => ( { value, label: labels[ index ] } ) ) : null;

	return (
		<AsyncSelect
			className={ `react-select ${ className }` }
			classNamePrefix="react-select"
			isMulti={ true }
			defaultOptions
			defaultValue={ transformedDefaultValue }
			{ ...rest }
		/>
	);
};

export default ReactAsyncSelect;