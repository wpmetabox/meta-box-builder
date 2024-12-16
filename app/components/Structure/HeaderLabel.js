import { __ } from "@wordpress/i18n";
import AutosizeInput from 'react-input-autosize';
import { sanitizeId, ucwords } from "../../functions";

const getFieldLabel = field => [ 'hidden', 'divider' ].includes( field.type )
	? ucwords( field.type )
	: field.name || field.group_title || __( '(No label)', 'meta-box-builder' );

// Output field label on the header bar.
const HeaderLabel = ( { field, updateField, updateActiveField } ) => {
	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();

		stopGeneratingId();
	};

	const handleChange = e => {
		updateField( 'name', e.target.value );
		maybeGenerateId( e.target.value );
	};

	const maybeGenerateId = value => {
		// No ID?
		if ( [ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			return;
		}

		// Only do for new fields.
		if ( !field._new ) {
			return;
		}

		// If ID is already manually changed, do nothing.
		if ( field._id_changed ) {
			return;
		}

		updateField( 'id', sanitizeId( value ) );
	};

	// When done updating "name", don't auto generate ID.
	const stopGeneratingId = () => updateField( '_id_changed', true );

	return (
		<>
			<AutosizeInput
				type="text"
				className="og-item__editable"
				inputStyle={ { fontSize: 13, fontWeight: 500 } }
				title={ __( 'Click to edit', 'meta-box-builder' ) }
				value={ getFieldLabel( field ) }
				onChange={ handleChange }
				onKeyDown={ maybeFinishEditing }
				onInput={ handleChange }
				onFocus={ updateActiveField }
			/>
			<span className="dashicons dashicons-edit"></span>
		</>
	);
};

export default HeaderLabel;