import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const Textarea = ( { name, defaultValue, placeholder, ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow { ...rest } htmlFor={ name }>
		<textarea ref={ register } defaultValue={ defaultValue } id={ name } name={ name } rows="2" placeholder={ placeholder }></textarea>
	</DivRow>;
};
export default Textarea;