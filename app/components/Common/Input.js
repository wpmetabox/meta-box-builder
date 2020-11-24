import { useFormContext } from 'react-hook-form';
import { actions as ConditionalActions } from '../../context/ConditionalList/ConditionalContext';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { useState, useEffect } = wp.element;

const Input = ( { name, componentName, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => {
	const { register } = useFormContext();
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	useEffect( () => {
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement ) {
			ConditionalActions.updateConditionalList( { [ rest.fieldId ]: { id: debounceValue } } );
		}
	}, [ debounceValue ] );

	return <DivRow htmlFor={ componentId } { ...rest }>
		<input onChange={ e => componentName === 'id' && setValue( e.target.value ) } type={ type } id={ componentId } name={ name } ref={ register } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>;
};

export default Input;