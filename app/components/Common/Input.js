import DivRow from './DivRow';

const Input = ( { name, componentName, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>
);

export default Input;