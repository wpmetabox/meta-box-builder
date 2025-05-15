import useAllFields from '../hooks/useAllFields';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { name, componentId, placeholder, defaultValue, ...rest } ) => {
	const { getPrefix } = useSettings();

	// Select only text and select fields.
	const fields = useAllFields()
		.filter( field => [ 'text', 'select' ].includes( field.type ) )
		.map( field => [ field.id, `${ field.name } (${ field.id })` ] );

	const handleSelectItem = ( inputRef, value ) => {
		const address = !inputRef.current.value ? '' : inputRef.current.value + ',';
		inputRef.current.value = address + `${ getPrefix() || '' }${ value }`;
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<FieldInserter id={ componentId } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } required={ true } items={ fields } onSelect={ handleSelectItem } />
		</DivRow>
	);
};

export default AddressField;