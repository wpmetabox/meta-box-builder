import { useToggle } from '../hooks/useToggle';
import DivRow from './DivRow';

const Select = ( { componentId, name, options, defaultValue, onChange, placeholder, updateField, ...rest } ) => {
	const toggle = useToggle( componentId );

	const handleChange = e => {
		toggle();
		onChange && onChange( e );
		updateField( name, e.target.value );
	};

	// Check if options are grouped (have nested objects)
	const isGrouped = options && typeof options === 'object' &&
		Object.values( options ).some( value => typeof value === 'object' && value !== null );

	const renderOptions = () => {
		if ( !isGrouped ) {
			// Regular flat options
			return Object.entries( options || {} ).map( ( [ value, label ] ) =>
				<option key={ value } value={ value }>{ label }</option>
			);
		}

		// Grouped options
		return Object.entries( options || {} ).map( ( [ groupKey, groupOptions ] ) => {
			if ( typeof groupOptions === 'object' && groupOptions !== null ) {
				return (
					<optgroup key={ groupKey } label={ groupKey }>
						{
							Object.entries( groupOptions ).map( ( [ value, label ] ) =>
								<option key={ value } value={ value }>{ label }</option>
							)
						}
					</optgroup>
				);
			}
			// Fallback for non-grouped items
			return <option key={ groupKey } value={ groupKey }>{ groupOptions }</option>;
		} );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<select id={ componentId } defaultValue={ defaultValue } onChange={ handleChange }>
			<option value="">{ placeholder }</option>
			{ renderOptions() }
		</select>
	</DivRow>;
};

export default Select;