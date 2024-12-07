import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const DateTimeSaveFormat = ( { name, componentId, placeholder, defaultValue, fieldType, required, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<FieldInserter
			id={ componentId }
			name={ name }
			defaultValue={ defaultValue }
			required={ required }
			placeholder={ placeholder }
			items={ Object.entries( rest[ fieldType ] ) }
		/>
	</DivRow>
);

export default DateTimeSaveFormat;