import { useToggle } from '../hooks/useToggle';
import DivRow from './DivRow';

const Select = ( { componentId, name, options, defaultValue, onChange, placeholder, updateField, ...rest } ) => {
	const toggle = useToggle( componentId );

	const handleChange = e => {
		toggle();
		onChange && onChange( e );
		updateField( name, e.target.value );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<select placeholder={ placeholder } id={ componentId } defaultValue={ defaultValue } onChange={ handleChange }>
			<option value=""></option>
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;