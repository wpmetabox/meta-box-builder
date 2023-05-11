import { useEffect, useState } from "@wordpress/element";
import useFieldIds from "../hooks/useFieldIds";
import DivRow from './DivRow';
import { getFieldValue } from '/functions';
import useDebounce from '/hooks/useDebounce';

const Id = ( { name, componentId, defaultValue, ...rest } ) => {
	const updateFieldId = useFieldIds( state => state.update );
	const [ value, setValue ] = useState( '' );
	const debounceValue = useDebounce( value );

	// Update conditional logic
	useEffect( () => {
		const key = name.replace( /\[[^\]]+?\]$/, '' );
		let field = getFieldValue( key );

		updateFieldId( rest.fieldId, field );
	}, [ debounceValue ] );

	const onChange = e => {
		setValue( e.target.value );

		// Update item header bar.
		document.getElementById( `og-item__id__${ rest.fieldId }` ).textContent = e.target.value;
	};

	return <DivRow htmlFor={ componentId } { ...rest }>
		<input type="text" id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ onChange } required />
	</DivRow>;
};

export default Id;