import { useFormContext } from 'react-hook-form';
import { actions as ConditionalActions } from '../../context/ConditionalList/ConditionalContext';
import DivRow from './DivRow';

const Input = ( { name, componentName, componentId, placeholder, defaultValue, type = 'text', ...rest } ) => {
	const { register } = useFormContext();

	const updateConditionalList = ( e ) => {
		ConditionalActions.updateConditionalList( { [ rest.fieldId ]: { id: e.target.value } } );
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<input onChange={ e => componentName === 'id' && updateConditionalList( e ) } type={ type } id={ componentId } name={ name } ref={ register } defaultValue={ defaultValue } placeholder={ placeholder } />
	</DivRow>;
};

export default Input;