import Select from 'react-select';
import DivRow from './DivRow';

const ReactSelect = ( {
	// DivRow props.
	label,
	description,
	tooltip,
	className,
	keyValue,
	required,
	dependency,
	name,

	wrapper = true, // Whether to wrap in DivRow.
	isMulti = true,
	options,
	defaultValue,
	updateField,
	...rest
} ) => {
	if ( !Array.isArray( options ) ) {
		options = objectToArray( options );
	}

	let newValue = defaultValue;
	if ( defaultValue ) {
		if ( isMulti ) {
			if ( ! Array.isArray( newValue ) ) {
				newValue = [ newValue ];
			}
			newValue = newValue.map( value => options.find( item => item.value === value ) );
		} else {
			const value = Array.isArray( newValue ) ? newValue[ 0 ] : newValue;
			newValue = options.find( item => item.value === value ) || null;
		}
	}

	const handleChange = items => {
		if ( ! isMulti ) {
			updateField( name, items ? items.value : '' );
			return;
		}
		updateField( name, items ? items.map( item => item.value ) : [] );
	};

	const select = <Select
		className="react-select"
		classNamePrefix="react-select"
		options={ options }
		defaultValue={ newValue }
		onChange={ handleChange }
		{ ...rest }
		isMulti={ isMulti }
	/>;

	return ! wrapper
		? select
		: <DivRow
			label={ label }
			description={ description }
			tooltip={ tooltip }
			className={ className }
			keyValue={ keyValue }
			required={ required }
			dependency={ dependency }
		>
			{ select }
		</DivRow>;
};

const objectToArray = object => Object.entries( object ).map( ( [ value, label ] ) => ( { value, label } ) );

export default ReactSelect;