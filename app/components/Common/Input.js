import { ConditionalLogicContext } from '../../contexts/ConditionalLogicContext';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { useContext, useState, useEffect } = wp.element;

const Input = ( { name, componentName, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => {
	const { updateConditionalLogic } = useContext( ConditionalLogicContext );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	useEffect( () => {
		const idElement = document.getElementById( `fields-${ rest.fieldId }-id` );
		if ( idElement && debounceValue ) {
			updateConditionalLogic( rest.fieldId, { id: debounceValue } );
		}
	}, [ debounceValue ] );

	return <DivRow htmlFor={ componentId } { ...rest }>
		<input onChange={ e => componentName === 'id' && setValue( e.target.value ) } type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>;
};

export default Input;