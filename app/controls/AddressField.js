import useAllFields from '../hooks/useAllFields';
import useSettings from '../hooks/useSettings';
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const AddressField = ( { componentId, placeholder, defaultValue, updateField, ...rest } ) => {
	const { getPrefix } = useSettings();

	// Select only text and select fields.
	const fields = useAllFields()
		.filter( field => [ 'text', 'select' ].includes( field.type ) )
		.map( field => [ field.id, `${ field.name } (${ field.id })` ] );

	const handleChange = ( inputRef, value ) => updateField( 'address_field', value );

	const handleSelect = ( inputRef, value ) => {
		const address = !inputRef.current.value ? '' : inputRef.current.value + ',';
		inputRef.current.value = address + `${ getPrefix() || '' }${ value }`;

		updateField( 'address_field', inputRef.current.value );
	};


	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<FieldInserter
				id={ componentId }
				defaultValue={ defaultValue }
				placeholder={ placeholder }
				required={ true }
				items={ fields }
				onChange={ handleChange }
				onSelect={ handleSelect }
			/>
		</DivRow>
	);
};

export default AddressField;