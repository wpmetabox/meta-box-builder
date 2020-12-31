import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } required={ rest.required }/>
	</DivRow>
);

export default Input;