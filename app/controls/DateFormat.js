import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const DateFormat = ( { name, componentId, placeholder, defaultValue, fieldType, required, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<FieldInserter name={ name } defaultValue={ defaultValue } required={ required } placeholder={ placeholder } items={ Object.entries( rest.formats ) } />
	</DivRow>
);

export default DateFormat;