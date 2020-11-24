import { useFormContext } from 'react-hook-form';
import { useToggle } from '../useToggle';
import DivRow from './DivRow';

const Select = ( { componentId, name, options, multiple, defaultValue, onChange, placeholder, style, ...rest } ) => {
	const { register } = useFormContext();
	const toggle = useToggle( componentId );

	const update = e => {
		toggle();
		onChange && onChange( e );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<select placeholder={ placeholder } style={ style } ref={ register } id={ componentId } name={ name } multiple={ multiple } defaultValue={ defaultValue } onChange={ update }>
			{ !multiple && !defaultValue && <option value=""></option> }
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;