import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { objectToArray } from '../../utility/functions';

const ReactSelect = ( { name, options, multiple, defaultValue, ...rest } ) => {
	if ( !Array.isArray( options ) ) {
		options = objectToArray( options );
	}

	if ( defaultValue ) {
		const transformValueToOption = value => options.find( item => item.value === value );
		defaultValue = multiple ? defaultValue.map( transformValueToOption ) : transformValueToOption( defaultValue );
	}

	return <Controller
		name={ name }
		render={ ( { onChange } ) => (
			<Select
				className="react-select"
				classNamePrefix="react-select"
				isMulti={ multiple }
				options={ options }
				onChange={ items => {
					const values = items ? items.map( item => item.value ) : [];
					onChange( values );
					if ( rest.onChange ) {
						rest.onChange( values );
					}
				} }
				defaultValue={ defaultValue }
			/>
		) }
	/>;
};

export default ReactSelect;