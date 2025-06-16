import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, defaultValue, type = 'text', updateField, ...rest } ) => {
	const handleChange = e => updateField( name, e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type={ type } id={ componentId } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
		</DivRow>
	);
};

export default Input;