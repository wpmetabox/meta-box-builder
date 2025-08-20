import { RawHTML, useEffect, useRef, useState } from '@wordpress/element';
import { __, sprintf } from "@wordpress/i18n";
import { useFetch } from "../hooks/useFetch";
import DivRow from './DivRow';

// Pattern to match invalid characters (anything not a-z, A-Z, 0-9, dash, underscore)
const invalidCharacters = /[^a-zA-Z0-9_-]/g;

const Id = ( { field, componentId, updateField, ...rest } ) => {
	const { data: ids } = useFetch( { api: 'fields-ids', defaultValue: [] } );
	const [ existingFieldGroup, setExistingFieldGroup ] = useState( {} );
	const [ duplicate, setDuplicate ] = useState( false );
	const inputRef = useRef();
	const preventedKeypressRef = useRef( false );

	// Prevent the default behavior of "Enter" key and restrict character input
	const handleKeyDown = e => {
		preventedKeypressRef.current = false; // Reset flag

		if ( e.key === 'Enter' ) {
			e.preventDefault();
			preventedKeypressRef.current = true;
			return;
		}

		// Allow control keys (backspace, delete, arrow keys, etc.)
		const controlKeys = [
			'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
			'Home', 'End'
		];

		if ( controlKeys.includes( e.key ) ) {
			return;
		}

		// Allow Ctrl/Cmd combinations (copy, paste, select all, etc.)
		if ( e.ctrlKey || e.metaKey ) {
			return;
		}

		// Only allow alphanumeric characters, dashes, and underscores
		if ( invalidCharacters.test( e.key ) ) {
			e.preventDefault();
			preventedKeypressRef.current = true;
		}
	};

	const handleChange = e => {
		// If we just prevented a keypress, don't process the input event
		if ( preventedKeypressRef.current ) {
			preventedKeypressRef.current = false;
			return;
		}

		const input = e.target;
		const content = input.value || '';
		const filteredContent = content.replace( invalidCharacters, '' );

		if ( content !== filteredContent ) {
			// Store the current cursor position
			const cursorPosition = input.selectionStart || 0;

			// Set the filtered value
			input.value = filteredContent;

			// Calculate new cursor position after filtering
			const textBeforeCursor = content.substring( 0, cursorPosition );
			const filteredTextBeforeCursor = textBeforeCursor.replace( invalidCharacters, '' );
			const newCursorPosition = Math.min( filteredTextBeforeCursor.length, filteredContent.length );

			// Restore cursor position
			input.setSelectionRange( newCursorPosition, newCursorPosition );
		}

		updateField( 'id', filteredContent );
		updateField( '_id_changed', true );
		checkDuplicateId( filteredContent );
	};

	const checkDuplicateId = value => {
		// Has a duplicate and not the current field
		if ( ids[ value ] !== undefined && ids[ value ]?._id !== field._id ) {
			setExistingFieldGroup( ids[ value ] );
			setDuplicate( true );
			return;
		}

		setExistingFieldGroup( {} );
		setDuplicate( false );
	};

	// Only update the content if it's different from the current value
	useEffect( () => {
		if ( inputRef.current && inputRef.current.value !== field.id ) {
			// Ensure the field value also only contains allowed characters
			const cleanedValue = ( field.id || '' ).replace( invalidCharacters, '' );
			inputRef.current.value = cleanedValue;

			// Update the field if it was cleaned
			if ( cleanedValue !== field.id ) {
				updateField( 'id', cleanedValue );
			}
		}
	}, [ field.id ] );

	return (
		<DivRow htmlFor={ componentId } { ...rest }>
			<input
				ref={ inputRef }
				type="text"
				id={ componentId }
				defaultValue={ field.id }
				onKeyDown={ handleKeyDown }
				onInput={ handleChange }
				pattern="[A-Za-z0-9\-_]+"
			/>
			{
				duplicate &&
				<RawHTML className="og-description og-error">
					{
						sprintf(
							__( 'This ID already exists in the field group <a href="%s">%s</a>, please change it or edit that field group to avoid duplication.', 'meta-box-builder' ),
							existingFieldGroup.link,
							existingFieldGroup.title
						)
					}
				</RawHTML>
			}
		</DivRow>
	);
};

export default Id;