import { Tooltip } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from "@wordpress/i18n";

// Pattern to match invalid characters (anything not a-z, A-Z, 0-9, dash, underscore)
const invalidCharacters = /[^a-zA-Z0-9_-]/g;

const Id = ( { field, updateField } ) => {
	const spanRef = useRef();
	const preventedKeypressRef = useRef(false);

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

		// Get plain text content (this strips HTML)
		const content = e.target.textContent || '';
		const filteredContent = content.replace( invalidCharacters, '' );

		// Check if the element contains any HTML nodes other than text
		const hasHtmlNodes = Array.from( e.target.childNodes ).some(
			node => node.nodeType !== Node.TEXT_NODE
		);

		if ( content !== filteredContent || hasHtmlNodes ) {
			// Store the current cursor position relative to the text content
			let cursorPosition = 0;
			const selection = window.getSelection();

			if ( selection.rangeCount > 0 ) {
				const range = selection.getRangeAt( 0 );
				// Get text content before the cursor position
				const beforeCursor = range.cloneRange();
				beforeCursor.selectNodeContents( e.target );
				beforeCursor.setEnd( range.endContainer, range.endOffset );
				cursorPosition = beforeCursor.toString().length;
			}

			// Clean the content by setting textContent (removes all HTML)
			spanRef.current.textContent = filteredContent;

			// Calculate new cursor position after filtering
			const textBeforeCursor = content.substring( 0, cursorPosition );
			const filteredTextBeforeCursor = textBeforeCursor.replace( invalidCharacters, '' );
			const newCursorPosition = Math.min( filteredTextBeforeCursor.length, filteredContent.length );

			// Restore cursor position
			if ( spanRef.current.firstChild && newCursorPosition >= 0 ) {
				const range = document.createRange();
				range.setStart( spanRef.current.firstChild, newCursorPosition );
				range.collapse( true );
				selection.removeAllRanges();
				selection.addRange( range );
			}
		}

		updateField( 'id', filteredContent );
		updateField( '_id_changed', true );
	};

	// Only update the content if it's different from the current value
	// Don't use {field.id} because it's directly controlled by React's rendering to avoid cursor jumping to the start.
	useEffect( () => {
		if ( spanRef.current && spanRef.current.textContent !== field.id ) {
			// Ensure the field value also only contains allowed characters
			const cleanedValue = ( field.id || '' ).replace( invalidCharacters, '' );
			spanRef.current.textContent = cleanedValue;

			// Update the field if it was cleaned
			if ( cleanedValue !== field.id ) {
				updateField( 'id', cleanedValue );
			}
		}
	}, [ field.id ] );

	return (
		<span className="mb-field__id">
			{ __( 'ID', 'meta-box-builder' ) }:&nbsp;
			<Tooltip text={ __( 'Click to edit', 'meta-box-builder' ) } delay={ 0 } placement="bottom">
				<span
					ref={ spanRef }
					contentEditable
					suppressContentEditableWarning={ true }
					onKeyDown={ handleKeyDown }
					onInput={ handleChange }
				/>
			</Tooltip>
		</span>
	);
};

export default Id;