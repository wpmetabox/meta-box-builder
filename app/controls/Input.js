import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const Input = ( { name, componentId, placeholder, defaultValue, fieldType, type = 'text', updateFieldData, ...rest } ) => {
	const handleChange = e => updateFieldData && updateFieldData( name, e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			{ [ 'datetime', 'time' ].includes( fieldType )
				? <DateTime  name={ name } defaultValue={ defaultValue } placeholder={ placeholder } required={ rest.required } items={ fieldType === 'time' ? rest.time : rest.datetime } />
				: <input type={ type } id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ handleChange } placeholder={ placeholder } required={ rest.required } />
			}
		</DivRow>
	);
};

const DateTime = ( { name, defaultValue, placeholder, required, items } ) => (
	<FieldInserter required={ required } placeholder={ placeholder } name={ name } defaultValue={ defaultValue } items={ items } />
);

export default Input;