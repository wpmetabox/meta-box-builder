import Select from 'react-select';

const ReactSelect = ( { name, options, multiple, defaultValue, ...rest } ) => {
	if ( !Array.isArray( options ) ) {
		options = objectToArray( options );
	}

	let transformedDefaultValue = defaultValue;
	if ( defaultValue ) {
		const transformValueToOption = value => options.find( item => item.value === value );
		transformedDefaultValue = multiple ? defaultValue.map( transformValueToOption ) : transformValueToOption( defaultValue );
	}

	return <Select
		name={ multiple ? `${ name }[]` : name }
		className="react-select"
		classNamePrefix="react-select"
		isMulti={ multiple }
		options={ options }
		defaultValue={ transformedDefaultValue }
		{ ...rest }
	/>;
};

const objectToArray = object => Object.entries( object ).map( ( [ value, label ] ) => ( { value, label } ) );

export default ReactSelect;