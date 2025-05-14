import { __ } from "@wordpress/i18n";
import { sanitizeId } from "../../../../functions";

// Output field label on the header bar.
const FieldLabel = ( { field, updateField } ) => {
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
		updateField( 'name', e.target.textContent );
		maybeGenerateId( e.target.textContent );
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
		<span
			contentEditable
			suppressContentEditableWarning={ true }
			className="og-item__editable"
			title={ __( 'Click to edit', 'meta-box-builder' ) }
			onKeyDown={ maybeFinishEditing }
			onInput={ handleChange }
		>
			{ field.name }
		</span>
	);
};

export default FieldLabel;