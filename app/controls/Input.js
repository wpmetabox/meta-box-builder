import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, defaultValue, type = 'text', updateFieldId, updateFieldData, ...rest } ) => {
	const handleChange = e => {
		updateFieldId && updateFieldId( name, e.target.value );
		updateFieldData && updateFieldData( name, e.target.value );
	}

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
		</DivRow>
	);
};

export default Input;