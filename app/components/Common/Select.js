import { useFormContext } from 'react-hook-form';
import { useToggle } from '../useToggle';
import DivRow from './DivRow';

const Select = ( { name, options, multiple, defaultValue, onChange, placeholder, style, ...rest } ) => {
	const { register } = useFormContext();
	const toggle = useToggle( name );

	const update = e => {
		toggle();
		onChange && onChange( e );
	};

	return <DivRow htmlFor={ name } { ...rest }>
		<select placeholder={ placeholder } style={ style } ref={ register } id={ name } name={ name } multiple={ multiple } defaultValue={ defaultValue } onChange={ onChange }>
			{ !multiple && !defaultValue && <option value=""></option> }
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;