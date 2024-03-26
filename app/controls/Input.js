import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const Input = ( { name, componentId, placeholder, defaultValue, fieldType, type = 'text', updateFieldData, ...rest } ) => {
	const handleChange = e => updateFieldData && updateFieldData( name, e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			{ [ 'date', 'time', 'datetime' ].includes( fieldType )
				? <FieldInserter name={ name } defaultValue={ defaultValue } required={ rest.required } placeholder={ placeholder } items={ fieldType === 'date' ? rest.date : fieldType === 'time' ? rest.time : rest.datetime } />
				: <input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
			}
		</DivRow>
	);
};

export default Input;