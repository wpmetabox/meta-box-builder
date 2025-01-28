import { useRef, useState } from "@wordpress/element";
import DivRow from './DivRow';

const FileSize = ( { defaultValue, componentId, name, ...rest } ) => {
	const [ value, setValue ] = useState( defaultValue );
	const numberRef = useRef();
	const suffixRef = useRef();

	const number = value.replace( /[^0-9]+/, '' ).trim();
	const suffix = value.replace( /[0-9]+/, '' ).trim() || 'kb';

	const sanitizedValue = number && suffix ? value : '';

	const update = () => setValue( `${ numberRef.current.value }${ suffixRef.current.value }` );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input type="hidden" name={ name } defaultValue={ sanitizedValue } />
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					id={ componentId }
					ref={ numberRef }
					defaultValue={ number }
					onChange={ update }
				/>
				<select ref={ suffixRef } defaultValue={ suffix } onChange={ update }>
					<option value="kb">KB</option>
					<option value="mb">MB</option>
					<option value="gb">GB</option>
				</select>
			</div>
		</DivRow>
	);
};

export default FileSize;