import DivRow from './DivRow';

const Textarea = ( {
	componentId,
	name,
	defaultValue,
	placeholder,
	rows = 2,
	textareaClassName = '',
	updateField,
	...rest
} ) => {
	const handleChange = e => updateField && updateField( name, e.target.value );

	return (
		<DivRow { ...rest } htmlFor={ componentId }>
			<textarea
				id={ componentId }
				name={ name }
				rows={ rows }
				placeholder={ placeholder }
				className={ textareaClassName }
				defaultValue={ defaultValue }
				onChange={ handleChange }
			/>
		</DivRow>
	);
};

export default Textarea;