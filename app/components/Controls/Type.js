import { FieldsDataContext } from '../../contexts/FieldsDataContext';
import DivRow from './DivRow';

const { useContext } = wp.element;

const Type = ( { fieldId, name, componentId, defaultValue, updateFieldType, ...rest } ) => {
	const fieldsData = useContext( FieldsDataContext );

	const onChange = e => updateFieldType( fieldId, e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<select id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ onChange }>
				{
					Object.entries( fieldsData ).map( ( [ type, field ] ) => <option key={ type } value={ type }>{ field.title }</option> )
				}
			</select>
		</DivRow>
	);
};
export default Type;