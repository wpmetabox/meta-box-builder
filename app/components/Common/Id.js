import { FieldIdsContext } from '../../contexts/FieldIdsContext';
import { getFieldValue } from '../../functions';
import useDebounce from '../../hooks/useDebounce';
import DivRow from './DivRow';

const { useContext, useState, useEffect } = wp.element;

const Id = ( { name, componentId, defaultValue, ...rest } ) => {
	const { updateFieldId } = useContext( FieldIdsContext );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	// Update conditional logic
	useEffect( () => {
		const key = name.replace( /\[[^\]]+?\]$/, '' );
		let field = getFieldValue( key );

		updateFieldId( rest.fieldId, field );
	}, [ debounceValue ] );

	const onChange = e => setValue( e.target.value );

	return <DivRow htmlFor={ componentId } { ...rest }>
		<input type="text" id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ onChange } />
	</DivRow>;
};

export default Id;