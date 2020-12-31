import DivRow from './DivRow';

const AddressField = ( { name, componentId, placeholder, defaultValue, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<input type="text" id={ componentId } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } list="field-ids" />
	</DivRow>
);

export default AddressField;