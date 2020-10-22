import DivRow from './DivRow';
import { useFormContext } from 'react-hook-form';

const Select = ( { name, options, multiple, defaultValue, ...rest } ) => {
	const { register } = useFormContext();
	return <DivRow htmlFor={ name } { ...rest }>
		<select ref={ register } id={ name } name={ name } multiple={ multiple } defaultValue={ defaultValue }>
			{ ! multiple && <option value=""></option> }
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;