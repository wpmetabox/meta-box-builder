import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { objectToArray } from '../../utility/functions';
import DivRow from './DivRow';

const ReactSelect = ( { name, options, multiple, defaultValue, ...rest } ) => {
	const { register } = useFormContext();

	if ( !Array.isArray( options ) ) {
		options = objectToArray( options );
	}

	if ( defaultValue ) {
		const transformValueToOption = value => options.find( item => item.value === value );
		defaultValue = multiple ? defaultValue.map( transformValueToOption ) : transformValueToOption( defaultValue );
	}

	return <DivRow htmlFor={ name } { ...rest }>
		<Select
			className="react-select"
			classNamePrefix="react-select"
			innerRef={ register }
			inputId={ name }
			name={ name }
			isMulti={ multiple }
			options={ options }
			defaultValue={ defaultValue }
			{ ...rest }
		/>
	</DivRow>;
};

export default ReactSelect;