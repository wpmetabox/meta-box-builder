import { __ } from "@wordpress/i18n";
import AutosizeInput from 'react-input-autosize';

// Output field id on the header bar with live input.
const HeaderId = ( { field, updateField, updateActiveField } ) => {
	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();
	};

	const handleChange = e => updateField( 'id', e.target.value );

	return (
		<span className="og-column--id">
			<AutosizeInput
				type="text"
				className="og-item__editable"
				inputStyle={ { fontSize: 13 } }
				title={ __( 'Click to edit', 'meta-box-builder' ) }
				value={ field.id }
				onChange={ handleChange }
				onKeyDown={ maybeFinishEditing }
				onFocus={ updateActiveField }
			/>
			<span className="dashicons dashicons-edit"></span>
		</span>
	);
};

export default HeaderId;