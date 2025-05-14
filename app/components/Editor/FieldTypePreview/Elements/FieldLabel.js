import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { debounce } from 'lodash';
import { sanitizeId } from "../../../../functions";

// Output field label on the header bar.
const FieldLabel = ( { field, updateField } ) => {
	const [ value, setValue ] = useState( field.name );

	// Live update value with incoming change, which can happen when the field is changed from Name in the field settings panel.
	useEffect( () => {
		setValue( field.name );
	}, [ field.name ] );

	// Use ref to stored latest `_id_changed` value. When this value changes, don't trigger rerender.
	const idChangedRef = useRef( field._id_changed );

	// Keep them updated when field changes
	useEffect( () => {
		idChangedRef.current = field._id_changed;
	}, [ field._id_changed ] );

	// Release when pressing "Enter" or "Escape".
	const maybeFinishEditing = e => {
		if ( ![ 'Enter', 'Escape' ].includes( e.key ) ) {
			return;
		}
		e.preventDefault();
		e.target.blur();

		stopGeneratingId();
	};

	// Live update to the input, and debounce update to the field.
	const handleChange = e => setValue( e.target.textContent );
	const debouncedUpdate = useCallback(
		debounce( val => {
			updateField( 'name', val );
			maybeGenerateId( val );
		}, 300 ),
		[] // empty deps means it runs once
	);
	useEffect( () => {
		debouncedUpdate( value );
	}, [ value, debouncedUpdate ] );

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
		if ( idChangedRef.current ) {
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
			onBlur={ stopGeneratingId }
		>
			{ field.name }
		</span>
	);
};

export default FieldLabel;