import { useFormContext } from 'react-hook-form';
import DivRow from './DivRow';

const Textarea = ( { name, defaultValue, placeholder, ...rest } ) => {
	const { register, control } = useFormContext();
	const methods = useFormContext();

	return <DivRow { ...rest } htmlFor={ name }>
		<textarea ref={ register } control={ control } onChange={ e => methods.setValue( name, e.target.value ) } id={ name } name={ name } rows="2" placeholder={ placeholder }></textarea>
	</DivRow>;
};
export default Textarea;