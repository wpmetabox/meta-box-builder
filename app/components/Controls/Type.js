import { FieldsDataContext } from '../../contexts/FieldsDataContext';
import DivRow from './DivRow';

const { useContext } = wp.element;

const Type = ( { fieldId, name, componentId, defaultValue, updateFieldType, ...rest } ) => {
	const { fieldCategories } = useContext( FieldsDataContext );

	const onChange = e => updateFieldType( fieldId, e.target.value );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<select id={ componentId } name={ name } defaultValue={ defaultValue } onChange={ onChange }>
				{ fieldCategories.map( category => <Category key={ category.slug } category={ category } /> ) }
			</select>
		</DivRow>
	);
};

const Category = ( { category } ) => {
	const { fieldsData } = useContext( FieldsDataContext );
	const fields = Object.entries( fieldsData ).filter( ( [ type, field ] ) => field.category === category.slug );

	return (
		<optgroup label={ category.title }>
			{ fields.map( entry => <option key={ entry[ 0 ] } value={ entry[ 0 ] }>{ entry[ 1 ].title }</option> ) }
		</optgroup>
	);
};

export default Type;