import { useEffect, useState } from "@wordpress/element";
import { useFieldIdsStore } from "../contexts/FieldIdsContext";
import DivRow from './DivRow';
import { getFieldValue } from '/functions';
import useDebounce from '/hooks/useDebounce';

const Id = ( { name, componentId, defaultValue, ...rest } ) => {
	const updateFieldId = useFieldIdsStore( state => state.update );
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
		<input type="text" id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ onChange } required />
	</DivRow>;
};

export default Id;