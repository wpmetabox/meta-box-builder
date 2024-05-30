import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, value, defaultValue, type = 'text', updateFieldData, onChange, ...rest } ) => {
	const handleChange = e => updateFieldData && updateFieldData( name, e.target.value );

	const inputProps = {
		type,
		id: componentId,
		name,
		value,
		defaultValue,
		onChange: onChange || handleChange,
		placeholder,
		required: rest.required
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input {...inputProps} />
		</DivRow>
	);
};

export default Input;