import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';

const Input = ( { name, test, defaultValue, type = 'text', ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ name } { ...rest }>
		<input type={ type } id={ name } name={ name } ref={ register } defaultValue={ defaultValue } />
	</DivRow>;
};

export default Input;