import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow htmlFor={ name } { ...rest }>
		<input type={ type } id={ componentId } name={ name } ref={ register } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>;
};

export default Input;