import { useRef, useState } from "@wordpress/element";
import DivRow from './DivRow';
import FieldInserter from './FieldInserter';


const DateTime = ( { name, componentId, placeholder, defaultValue, fieldType, updateFieldData, ...rest } ) => {
	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-attribute">
				<FieldInserter name={ name } defaultValue={ defaultValue } required={ rest.required } placeholder={ placeholder } items={ Object.entries( rest[fieldType] ) } />
			</div>
		</DivRow>
	);
};

export default DateTime;