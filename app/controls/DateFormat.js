import DivRow from './DivRow';
import FieldInserter from './FieldInserter';

const DateFormat = ( { name, componentId, placeholder, defaultValue, required, ...rest } ) => (
	<DivRow htmlFor={ componentId } { ...rest }>
		<FieldInserter
			id={ componentId }
			name={ name }
			defaultValue={ defaultValue }
			required={ required }
			placeholder={ placeholder }
			items={ Object.entries( rest.formats ) }
		/>
	</DivRow>
);

export default DateFormat;