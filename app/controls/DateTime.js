import { useRef, useState } from "@wordpress/element";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';
import moment from 'moment';

const DateTime = ( { name, componentId, placeholder, defaultValue, fieldType, updateFieldData, ...rest } ) => {
	const ref = useRef();
	const [ detail, setDetail ] = useState( moment().format( defaultValue ) );

	const handleChange = ( inputRef, value ) => {
		inputRef.current.value = value;
		ref.current.value =  moment().format( value );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-attribute">
				<FieldInserter name={ name } defaultValue={ defaultValue } required={ rest.required } placeholder={ placeholder } items={ rest[fieldType] } onChange={ handleChange } onSelect={ handleChange } />
				<input ref={ref} type='text' value={ detail } name={ `${ name }[label]` } disabled />
			</div>
		</DivRow>
	);
};
export default DateTime;