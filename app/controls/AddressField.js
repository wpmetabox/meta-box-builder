import { Button, Dropdown } from "@wordpress/components";
import useFieldIds from '../hooks/useFieldIds';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { name, componentId, nameIdData, placeholder, defaultValue, ...rest } ) => {
	const ids = useFieldIds( state => state.ids );
	const fields = Array.from( new Set( Object.values( ids ) ) );

	const handleSelectItem = ( inputRef, value ) => {
		const address = ! inputRef.current.value ? '' : inputRef.current.value + ',';
		inputRef.current.value = address + value;
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<FieldInserter id={ componentId } name={ name } value={ nameIdData.address_field } placeholder={ placeholder } required={ true } items={ fields } onSelect={ handleSelectItem }  />
		</DivRow>
	)
};

export default AddressField;