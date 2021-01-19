import DivRow from '/components/Controls/DivRow';

const Input = ( { name, value, update, ...rest } ) => (
	<DivRow htmlFor={ name } { ...rest }>
		<input type="text" id={ name } name={ name } value={ value } required={ rest.required } onChange={ update } />
	</DivRow>
);

export default Input;