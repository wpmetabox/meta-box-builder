import { useState } from "@wordpress/element";
import DivRow from './DivRow';

const FileSize = ( { defaultValue, componentId, name, updateField, ...rest } ) => {
	const [ number, setNumber ] = useState( defaultValue.replace( /[^0-9]+/, '' ).trim() );
	const [ suffix, setSuffix ] = useState( defaultValue.replace( /[0-9]+/, '' ).trim() || 'kb' );

	const updateNumber = e => {
		setNumber( e.target.value );
		const value = e.target.value && suffix ? `${ e.target.value }${ suffix }` : '';
		updateField( name, value );
	};
	const updateSuffix = e => {
		setSuffix( e.target.value );
		const value = number && e.target.value ? `${ number }${ e.target.value }` : '';
		updateField( name, value );
	};

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<div className="og-input-group og-input-group--small">
				<input
					type="number"
					min="0"
					id={ componentId }
					value={ number }
					onChange={ updateNumber }
				/>
				<select value={ suffix } onChange={ updateSuffix }>
					<option value="kb">KB</option>
					<option value="mb">MB</option>
					<option value="gb">GB</option>
				</select>
			</div>
		</DivRow>
	);
};

export default FileSize;