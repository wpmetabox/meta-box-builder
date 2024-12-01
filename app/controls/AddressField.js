import useFieldIds from '../hooks/useFieldIds';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { name, componentId, placeholder, defaultValue, ...rest } ) => {
	const { getPrefix } = useSettings();

	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );

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