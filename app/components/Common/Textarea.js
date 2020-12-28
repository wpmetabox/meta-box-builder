import DivRow from './DivRow';

const Textarea = ( { componentId, name, defaultValue, placeholder, ...rest } ) => (
	<DivRow { ...rest } htmlFor={ componentId }>
		<textarea defaultValue={ defaultValue } id={ componentId } name={ name } rows="4" placeholder={ placeholder }></textarea>
	</DivRow>
);

export default Textarea;