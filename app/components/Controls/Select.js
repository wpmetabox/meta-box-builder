import { useToggle } from '../../hooks/useToggle';
import DivRow from './DivRow';

const Select = ( { componentId, name, options, defaultValue, onChange, placeholder, ...rest } ) => {
	const toggle = useToggle( componentId );

	const update = e => {
		toggle();
		onChange && onChange( e );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<select placeholder={ placeholder } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ update }>
			{ !defaultValue && <option value=""></option> }
			{
				Object.entries( options ).map( ( [ value, label ] ) => <option key={ value } value={ value }>{ label }</option> )
			}
		</select>
	</DivRow>;
};

export default Select;