import { useFormContext } from "react-hook-form";
import DivRow from './DivRow';

const Textarea = ( { componentId, name, defaultValue, placeholder, ...rest } ) => {
	const { register } = useFormContext();

	return <DivRow { ...rest } htmlFor={ componentId }>
		<textarea ref={ register } defaultValue={ defaultValue } id={ componentId } name={ name } rows="4" placeholder={ placeholder }></textarea>
	</DivRow>;
};
export default Textarea;