import useLists from '../hooks/useLists';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { name, componentId, placeholder, defaultValue, ...rest } ) => {
	const { getPrefix } = useSettings();

	const { getAllFields } = useLists();
	// Select only text and select fields.
	const fields = getAllFields()
		.filter( field => [ 'text', 'select' ].includes( field.type ) )
		.map( field => [ field.id, field.name ] );

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