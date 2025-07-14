import { Tooltip } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { sanitizeId } from "../../../../functions";

// Output field label on the header bar.
const FieldLabel = ( { field, updateField } ) => {
	const spanRef = useRef();

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
		const value = e.target.textContent;
		updateField( 'name', value );

		// Only generate ID if it's a new field and hasn't been manually changed
		if ( field._new && !field._id_changed && ![ 'custom_html', 'divider', 'heading' ].includes( field.type ) ) {
			updateField( 'id', sanitizeId( value ) );
		}
	};

	// When done updating "name", don't auto generate ID.
	const stopGeneratingId = () => updateField( '_id_changed', true );

	// Only update the content if it's different from the current value
	// Don't use {field.name} because it's directly controlled by React's rendering to avoid cursor jumping to the start.
	useEffect( () => {
		if ( spanRef.current && spanRef.current.textContent !== field.name ) {
			spanRef.current.textContent = field.name || '';
		}
	}, [ field.name ] );

	return (
		<Tooltip text={ __( 'Click to edit', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
			<span
				ref={ spanRef }
				contentEditable
				suppressContentEditableWarning={ true }
				className="mb-field__label"
				onKeyDown={ maybeFinishEditing }
				onInput={ handleChange }
				onBlur={ stopGeneratingId }
			/>
		</Tooltip>
	);
};

export default FieldLabel;