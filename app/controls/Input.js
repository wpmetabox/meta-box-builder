import { useCallback } from '@wordpress/element';
import { debounce } from 'lodash';
import DivRow from './DivRow';

const Input = ( { name, componentId, placeholder, defaultValue, type = 'text', updateField, ...rest } ) => {
	const handleChange = useCallback(
		debounce( e => updateField && updateField( name, e.target.value ), 300 ),
		[] // empty deps means it runs once
	);

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
		</DivRow>
	);
};

export default Input;