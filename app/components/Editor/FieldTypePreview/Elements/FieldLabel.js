import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import { debounce } from 'lodash';
import { sanitizeId } from "../../../../functions";

// Output field label on the header bar.
const FieldLabel = ( { field, updateField } ) => {
	const [ value, setValue ] = useState( field.name );
	const isFocusedRef = useRef( false );
	const spanRef = useRef();

	// Live update value with incoming change, which can happen when the field is changed from Name in the field settings panel.
	// Avoid syncing from field.name while the user is typing (i.e., while focused).
	// Use ref to manually update its textContent, avoid React touching the inner text directly to avoid cursor jumping to the start.
	useEffect( () => {
		if ( spanRef.current && !isFocusedRef.current ) {
			if ( spanRef.current.textContent !== field.name ) {
				spanRef.current.textContent = field.name;
			}
			setValue( field.name ); // Still keep value in sync internally
		}
	}, [ field.name ] );

	const handleFocus = () => {
		isFocusedRef.current = true;
	};

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

	const handleBlur = () => {
		isFocusedRef.current = false;
		stopGeneratingId();
	};

	return (
		<span
			contentEditable
			suppressContentEditableWarning={ true }
			ref={ spanRef }
			className="mb-field__label"
			onKeyDown={ maybeFinishEditing }
			onInput={ handleChange }
			onBlur={ handleBlur }
			onFocus={ handleFocus }
			data-tooltip={ __( 'Click to edit', 'meta-box-builder' ) }
		/>
	);
};

export default FieldLabel;