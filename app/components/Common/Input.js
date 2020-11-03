import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';

const Input = ( { name, placeholder, defaultValue, type = 'text', ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ name } { ...rest }>
		<input type={ type } id={ name } name={ name } ref={ register } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>;
};

export default Input;