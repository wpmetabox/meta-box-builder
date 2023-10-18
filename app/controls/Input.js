import DivRow from './DivRow';

const Input = ( { fieldId, name, componentId, placeholder, defaultValue, type = 'text', updateFieldData, ...rest } ) => {
	const handleChange = e => {
		if ( ! fieldId || ( fieldId && ! fieldId.includes( 'tab_' ) ) ) {
			return;
		}
		updateFieldData( name, e.target.value );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
		</DivRow>
	);
};

export default Input;